# Orquestador de reglas

Punto de entrada de las reglas de este repo para cualquier agente de código. `AGENTS.md` (y `CLAUDE.md`, que lo importa) apuntan acá.

Cada regla vive en un solo archivo. Si algo cambia, se edita ahí y no se repite en otro lado.

## Leer siempre

| Archivo | Qué cubre |
|---|---|
| [`architecture.md`](./architecture.md) | Features por dominio, carpetas compartidas, `index.ts` y `server.ts`, qué puede importar de qué y dónde va algo nuevo. |
| [`code-style.md`](./code-style.md) | Sin comentarios, tamaños máximos de archivo, longitud y verbosidad, naming, exports, imports y manejo de errores. |
| [`typescript.md`](./typescript.md) | Configuración estricta, `type` vs `interface`, lo prohibido (`any`, `enum`, `as`, `!`), uniones discriminadas, validación con zod y genéricos. |

## Según lo que vayas a tocar

| Vas a... | Lee | Carga la skill |
|---|---|---|
| Crear una feature o agregarle algo | [`templates/feature.md`](./templates/feature.md) | — |
| Crear una ruta, layout o pantalla | [`templates/route.md`](./templates/route.md) | `next-cache-components-adoption` |
| Crear o editar un componente | [`components.md`](./components.md) | `composition-patterns`, `react-best-practices`, `accessibility` |
| Escribir estilos con Tailwind o tocar el tema | [`styling.md`](./styling.md) | `tailwind-css-patterns`, `frontend-design` |
| Usar o agregar una primitiva de shadcn | [`shadcn.md`](./shadcn.md) | — |
| Leer datos de la API, mutar o tocar la caché | [`data.md`](./data.md) | `next-cache-components-adoption`, `react-best-practices` |
| Crear un formulario | [`forms.md`](./forms.md) | — |
| Páginas públicas (posturas, marketing) | [`data.md`](./data.md#caché) | `seo` |
| Tipos complejos o genéricos | [`typescript.md`](./typescript.md) | `typescript-advanced-types` |
| Entender cómo funciona un flujo o una capa | [`../topics/index.md`](../topics/index.md) | — |
| Escribir o correr pruebas | [`testing.md`](./testing.md) | — |
| Hacer un commit | [`commits.md`](./commits.md) | — |

Antes de usar cualquier API de Next.js, sigue lo que dice `AGENTS.md`: esta versión (16.4) cambia APIs y convenciones. Lee la guía correspondiente en `node_modules/next/dist/docs/` en vez de confiar en lo que recuerdas.

## Completa lo que te piden

Todo cambio o funcionalidad que el usuario pida se entrega completo, no a medias.

- Cubre cada capa que el cambio toca: datos, validación, acción, componentes, pantalla, ruta, estados de carga y error, y la invalidación de caché que corresponda ([receta](#receta-para-una-funcionalidad-nueva)).
- Si el cambio deja código sin uso (un componente, un export, una cache tag), se elimina en el mismo cambio.
- No dejes `TODO`, pantallas sin conectar ni botones sin acción para después.
- Si algo del pedido no se puede resolver o es ambiguo, se pregunta antes de implementar, no se entrega una versión parcial sin avisar.
- El cambio termina cuando pasan `npm run biome:check`, `npm run typecheck`, `npm run lint` y `npm run test:run`.
- Antes de tocar un flujo existente, lee su tópico en [`../topics/`](../topics/index.md).
- Antes de proponer un commit, aplica el paso de [`commits.md`](./commits.md#antes-de-commitear).

## Receta para una funcionalidad nueva

1. **Feature.** Identifica el dominio. Si la feature no existe, créala en `src/features/{dominio}/` ([`architecture.md`](./architecture.md)).
2. **Datos.** Crea en `data/` una función de lectura por cada endpoint que aún no tenga una ([`data.md`](./data.md)).
3. **Validación.** Si hay formulario o entrada del usuario, crea el schema en `schema/` ([`forms.md`](./forms.md)).
4. **Mutación.** Crea la Server Action en `actions/`, con autenticación, validación e invalidación ([`data.md`](./data.md#mutaciones)).
5. **Componentes.** Lo que solo usa este dominio va en `components/` de la feature; lo que usan dos o más features, en `src/components/` ([`components.md`](./components.md)).
6. **Pantalla.** Crea `screens/{nombre}-screen.tsx` y expórtala en `server.ts` ([`templates/route.md`](./templates/route.md)).
7. **Ruta.** Crea el `page.tsx` en `src/app/`, con su `loading.tsx` o `<Suspense>` y su `error.tsx` si aplica.
8. **Verificación.** Corre los cuatro comandos de arriba y revisa que ningún archivo supere su tamaño máximo.

## Resumen de una línea por regla

- **Flujo**: todo pedido se entrega completo; se lee el tópico del flujo que se toca y, antes de commitear, se actualizan los tópicos y se sugiere actualizar la documentación y las pruebas.
- **`architecture.md`**: un dominio por feature; `index.ts` para lo que es seguro en el cliente y `server.ts` para pantallas y datos; `src/app` solo tiene rutas y es el único lugar que navega.
- **`code-style.md`**: Biome formatea (comillas dobles, sin `;`), cero comentarios, límites de líneas, retorno temprano, sin ternarios anidados ni abstracción prematura, nombres completos sin redundancia, kebab-case, export nombrado salvo en los archivos especiales de Next.
- **`typescript.md`**: `strict` + `noUncheckedIndexedAccess`; `type` para todo; sin `any`, `enum`, `as` ni `!`; uniones discriminadas; todo lo que entra se valida con zod.
- **`components.md`**: Server Component por defecto, `"use client"` solo en las hojas interactivas, un componente por archivo, `src/components` es presentacional.
- **`styling.md`**: solo Tailwind, tokens semánticos de `globals.css`, `gap` en lugar de márgenes, mobile-first, `cn()` y `cva()`.
- **`shadcn.md`**: primitivas con el CLI en `src/components/ui/` (no se editan), variantes antes que clases, composición con `render` (Base UI, sin `asChild`).
- **`data.md`**: server-first; lecturas en `data/` con `server-only` y `use cache`; mutaciones como Server Actions que se autentican solas; sin React Query.
- **`forms.md`**: `react-hook-form` con schema de `zod`, el mismo schema valida en la action, campos de `src/components/form/`.
- **`testing.md`**: Vitest + Testing Library; el test vive junto al archivo; se mockea solo la frontera; los Server Components async se cubren con E2E.
- **`commits.md`**: conventional commits validados por commitlint, hooks de husky que bloquean si algo falla, y solo cuando el usuario lo pide.

## Decisiones pendientes

Hasta que se resuelvan, no se implementan por iniciativa propia:

- **Marca**: falta el logo para fondos claros y confirmar las tipografías ([`styling.md`](./styling.md#tema-y-marca)).
- **Cliente de la API**: el paquete `@yoga/sdk` todavía no existe; `src/lib/api-client.ts` se crea cuando exista ([`data.md`](./data.md)).
- **Autenticación**: Better Auth contra la API.
- **i18n**: `next-intl` está activo con `es` y `en` (textos en `messages/`). Falta decidir `pt`.
- **Modo oscuro**: los tokens `.dark` existen, falta el selector de tema.
- **React Compiler**: no está activado.
- **E2E**: Playwright para pantallas async y flujos completos.

## Si una regla contradice código existente

Las reglas valen para código nuevo. Si un archivo existente no las sigue, no lo reescribas sin que te lo pidan, pero el código nuevo sí las sigue aunque el archivo vecino no lo haga. El código de `src/components/ui/` lo genera shadcn y no sigue estas reglas.
