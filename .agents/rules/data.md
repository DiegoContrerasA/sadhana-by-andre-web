# Datos, caché y mutaciones

Cómo se consume la API. Reglas de carpetas en [`architecture.md`](./architecture.md); ejemplo completo en [`templates/feature.md`](./templates/feature.md).

La web es **server-first**: los datos se leen en el servidor (Server Components) y se mutan con Server Actions. No se usa React Query ni SWR. Si algún día una pantalla lo justifica (polling o tablas muy interactivas en `/admin`), se decide con el usuario y queda limitado a esa zona.

Next.js no es el backend: la base de datos la toca solo la API (`yoga-api`). La web actúa como intermediario y le reenvía la sesión a la API.

## El cliente

La API se consume con el cliente que publica `@yoga/sdk` (contrato oRPC). Igual que en la app móvil, el cliente es el servicio: no hay archivos de servicios propios.

- `src/lib/api-client.ts` crea la única instancia, empieza con `import "server-only"` y es el único archivo que configura el cliente HTTP.
- Reenvía la cookie de sesión de Better Auth leyendo `cookies()` en cada petición.
- La URL base se lee de `process.env.API_URL` (sin `NEXT_PUBLIC_`: la API se llama desde el servidor).
- Solo el cliente de la API y la configuración de auth leen `process.env`.
- No se usa `fetch` directo contra la API en ningún otro lugar. Si falta un endpoint, se agrega al contrato en `yoga-api`.

> **Pendiente:** `@yoga/sdk` todavía no existe. Hasta entonces no se crea `api-client.ts` ni se escriben llamadas manuales.

## Tipos

Los tipos de requests, responses y modelos vienen de `@yoga/sdk/contracts`. No se redeclaran. Los schemas de `zod` del contrato se reutilizan para validar formularios cuando coinciden con lo que escribe el usuario.

## Lecturas: `data/`

Cada archivo de `data/` exporta una sola función que envuelve una sola operación del cliente.

```ts
import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { cacheTags } from "@/constants/cache-tags"
import { apiClient } from "@/lib/api-client"

export async function getPose(slug: string) {
  "use cache"
  cacheTag(cacheTags.catalog.all, cacheTags.catalog.pose(slug))
  cacheLife("days")

  return apiClient.catalog.getPose({ slug })
}
```

- Nombre `get-{dato}.ts`, función `get{Dato}`.
- Una operación nueva es un archivo nuevo, no una función más en un archivo existente.
- La función devuelve solo lo que la UI necesita (un DTO); si la respuesta trae más, se recorta acá.
- Si el recurso no existe, llama a `notFound()`.
- Lecturas independientes de una pantalla se lanzan en paralelo (`Promise.all` o promesas pasadas a componentes dentro de `<Suspense>`), nunca en cascada.

### Caché

Con `cacheComponents` activado, nada se cachea si no se pide.

| Tipo de dato | Cómo se lee |
|---|---|
| Público e igual para todos (catálogo, posturas, rutas) | `"use cache"` + `cacheTag` + `cacheLife` |
| Depende de la sesión (tier, progreso, candados, perfil) | Sin `"use cache"` público. Se lee en un componente dentro de `<Suspense>`. Si conviene cachearlo en el navegador, `"use cache: private"` |
| Mezcla de ambos (una ruta con candados por usuario) | La parte pública cacheada y la parte del usuario transmitida por streaming dentro de `<Suspense>` |

- Las tags viven en `src/constants/cache-tags.ts`, agrupadas por dominio como funciones que devuelven strings. Ninguna función escribe una tag como string suelto.
- Toda lectura cacheada lleva la tag `all` de su dominio y la tag de su recurso.
- La sesión nunca entra en un `"use cache"` público. Para cachear algo derivado del usuario en el servidor, se extrae el `userId` y se pasa como argumento.

## Mutaciones: `actions/`

Cada archivo de `actions/` exporta una sola Server Action.

```ts
"use server"

import { updateTag } from "next/cache"

import { cacheTags } from "@/constants/cache-tags"
import { requireSession } from "@/features/auth/server"
import { apiClient } from "@/lib/api-client"

import { trialUnlockSchema } from "../schema/trial-unlock.schema"

export async function unlockTrialPose(input: unknown) {
  const session = await requireSession()
  const parsed = trialUnlockSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "INVALID_INPUT" } as const

  await apiClient.me.createTrialUnlock(parsed.data)
  updateTag(cacheTags.me.profile(session.userId))

  return { ok: true } as const
}
```

Una Server Action es un endpoint público. Cada una, sin excepción:

1. **Autentica** dentro de la propia action (`requireSession()` o equivalente). No basta con que la página o el layout lo hagan.
2. **Valida** la entrada con el schema de `zod` de la feature, aunque el formulario ya la haya validado en el cliente.
3. **Autoriza** cuando aplica: la API es la que decide el acceso, pero la action no expone operaciones que el usuario no puede hacer.
4. **Llama al cliente** de la API.
5. **Invalida** lo que cambió: `updateTag(tag)` para que el usuario vea su cambio de inmediato; `refresh()` cuando solo hay que volver a pintar datos sin caché.
6. **Devuelve** un resultado tipado y mínimo (`{ ok: true }` o `{ ok: false, error }`). Nunca devuelve objetos completos de la API si el cliente no los necesita.

- Nombre con el verbo de la mutación: `actions/unlock-trial-pose.ts` → `unlockTrialPose`.
- `redirect()` solo cuando el flujo lo exige (tras iniciar sesión, al abrir el checkout).
- Lo que no bloquea la respuesta (analítica, logs) va en `after()`.
- El componente que la usa maneja el estado pendiente con `useActionState` o `useTransition`, y decide qué mostrar con el resultado.

## Revalidación desde la API

Cuando el admin publica o edita contenido en la API, la API llama a un route handler de la web (`src/app/api/revalidate/route.ts`) con un secreto compartido, y este llama a `revalidateTag(tag, "max")`.

## Sesión

- La sesión pertenece a la feature `auth`, que expone en `server.ts` `getSession()` (con `React.cache`, puede devolver `null`) y `requireSession()` (redirige o falla si no hay sesión).
- La sesión se lee en el servidor. No hay un provider global de sesión en el cliente; si un Client Component necesita un dato del usuario, lo recibe por props.
- La sesión no guarda datos de otros dominios. El tier, el trial y el progreso se leen de la API con la función de `data/` de su feature.
- Un token o una cookie nunca se escribe en un log, en una cache tag ni en un parámetro de ruta.

## Qué no hacer

- No importar el cliente de la API fuera de `data/`, `actions/` y `src/lib/`.
- No leer datos en el cliente con `useEffect` + `fetch`.
- No copiar datos del servidor a `useState` o a un contexto para "tenerlos a mano".
- No atrapar un error en `data/` para devolver un valor por defecto.
- No poner `"use cache"` en una función que lee `cookies()` o `headers()`.
