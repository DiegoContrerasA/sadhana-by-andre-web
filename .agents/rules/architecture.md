# Arquitectura

El código se agrupa por dominio en `src/features/`. Lo que comparten varios dominios vive en carpetas transversales. `src/app` contiene solo rutas, layouts y route handlers, como exige el App Router de Next.js.

Es la misma estructura que usa la app móvil (Expo Router), adaptada a un web server-first: las lecturas ocurren en el servidor y las mutaciones son Server Actions.

```
src/
├── app/                 Rutas del App Router. Solo rutas, layouts y route handlers.
├── features/            Un dominio por carpeta.
│   └── {dominio}/
│       ├── screens/     Pantallas (Server Components por defecto).
│       ├── components/  UI propia del dominio.
│       ├── data/        Lecturas de la API (server-only).
│       ├── actions/     Server Actions (mutaciones).
│       ├── hooks/       Lógica de UI en el cliente.
│       ├── schema/      Schemas de zod.
│       ├── utils/       Funciones puras del dominio.
│       ├── index.ts     API pública segura para el cliente.
│       └── server.ts    API pública solo para el servidor.
├── components/          UI compartida y presentacional.
│   ├── ui/              Primitivas de shadcn (generadas por el CLI).
│   └── form/            Campos conectados a react-hook-form.
├── hooks/               Hooks compartidos sin dominio.
├── i18n/                Configuración de next-intl (los textos viven en messages/).
├── lib/                 Infraestructura: cliente de la API, auth, utils de bajo nivel.
├── constants/           Cache tags y constantes globales.
├── utils/               Funciones puras.
└── test/                Setup y helpers de pruebas.
```

Fuera de `src/` quedan la configuración (`next.config.ts`, `biome.json`, `vitest.config.mts`, `components.json`) y `public/`.

## Features

Una feature es un dominio del producto, no una pantalla. `auth` contiene inicio de sesión, registro, verificación y recuperación; no existen features `login` y `register` por separado.

Los dominios siguen los módulos de la API: `auth`, `catalog` (posturas, rutas, lecciones, búsqueda), `player` (reproducción y tokens de video), `progress`, `billing` (trial, paywall, checkout), `account` y `admin-content`. Una pantalla que combina varios dominios (por ejemplo, el inicio) vive en su propia feature y compone a las demás.

Una feature se divide cuando reúne más de un dominio.

### Carpetas de una feature

| Carpeta | Contiene | No contiene |
|---|---|---|
| `screens/` | Un archivo por pantalla (`{nombre}-screen.tsx`). Compone componentes, llama a `data/` y pone los límites de `<Suspense>`. | Navegación imperativa, llamadas directas al cliente de la API. |
| `components/` | UI del dominio: Server Components o Client Components hoja. | Pantallas completas, lectura de datos. |
| `data/` | Funciones de lectura, una por integración, con `import "server-only"`. | UI, mutaciones, navegación. |
| `actions/` | Server Actions (`"use server"`), una por archivo. | Lecturas para pintar una pantalla, UI. |
| `hooks/` | Lógica de UI en el cliente: formularios, filtros, pasos de un flujo. | Llamadas al cliente de la API. |
| `schema/` | Schemas de `zod` y sus tipos inferidos. Los comparten el formulario y la action. | Lógica de red o de UI. |
| `utils/` | Funciones puras del dominio, con su test al lado. | Efectos secundarios. |

Cada carpeta se crea cuando hace falta. Una feature pequeña puede tener solo `screens/` y `server.ts`.

### API pública: `index.ts` y `server.ts`

Una feature tiene dos entradas porque un barrel que mezcla código de servidor con Client Components rompe el build cuando un Client Component lo importa.

| Archivo | Exporta | Quién lo importa |
|---|---|---|
| `index.ts` | Client Components y componentes de dominio sin datos, Server Actions, tipos y schemas, utils. Todo lo que es seguro en el cliente. | Otras features, `src/app/`. |
| `server.ts` | Pantallas y funciones de `data/`. Empieza con `import "server-only"`. | `src/app/` y el código de servidor de otras features. |

Todo lo demás es privado. Nadie importa un archivo interno de otra feature; Biome lo bloquea.

## Carpetas compartidas

### `src/app/`

Cada `page.tsx` lee `params` y `searchParams`, renderiza una pantalla de una feature y decide la navegación: le pasa `href` o la acción que corresponda. No contiene estilos, lógica de negocio ni llamadas a la API.

Los `layout.tsx` montan providers y la estructura visual de un grupo de rutas. Los route groups separan zonas con layouts distintos: `(marketing)`, `(app)` y `(admin)`. Los route handlers (`route.ts`) reciben webhooks, por ejemplo la revalidación que pide la API al publicar contenido.

### `src/components/`

UI que usan dos o más features. Es presentacional: recibe datos y callbacks por props, no consume la API y no conoce ningún dominio. `ui/` lo genera shadcn y no se edita a mano salvo para ajustar la marca.

### `src/lib/`

Infraestructura configurada una sola vez: `api-client.ts` (server-only), auth y `utils.ts` (`cn`). No conoce ninguna feature.

### `src/hooks/`, `src/utils/`, `src/constants/`

Código transversal sin dominio. `constants/cache-tags.ts` concentra las tags de caché, como `query-keys.ts` en la app móvil.

## Qué puede importar de qué

| Carpeta | Puede importar de |
|---|---|
| `app/` | `features/` (por `index.ts` o `server.ts`), `components/`, `hooks/`, `lib/`, `utils/`, `constants/` |
| `features/` | Otras features por su `index.ts` o `server.ts`, `components/`, `hooks/`, `lib/`, `utils/`, `constants/` |
| `components/` | `hooks/`, `lib/`, `utils/`, `constants/` |
| `hooks/` | `lib/`, `utils/`, `constants/` |
| `lib/` | `utils/`, `constants/` |
| `utils/`, `constants/` | Nada de las carpetas anteriores |
| `test/` | Cualquier carpeta de `src/`. Solo la importan archivos de test |

Reglas sin excepción (las que dicen **Biome** fallan en el lint):

- Nadie importa de `src/app/`. **Biome**
- Las carpetas compartidas nunca importan de `features/`. **Biome**
- Una feature importa de otra solo por `@/features/{dominio}` o `@/features/{dominio}/server`. **Biome**
- `useRouter`, `usePathname` y `useSearchParams` se usan solo en `src/app/`; las features reciben `href` o callbacks. La única excepción es `NavLink` (`src/components/nav-link.tsx`), que usa el `usePathname` de `@/i18n/navigation` para marcar el enlace actual: un menú usa `NavLink` y no calcula la sección activa. **Biome**. Una Server Action puede llamar a `redirect()` cuando el flujo lo exige (por ejemplo, tras iniciar sesión o abrir el checkout). `notFound()` se permite en `data/` y en pantallas.
- El cliente de la API se importa solo en `data/` y `actions/`.
- Un Client Component nunca importa de `server.ts` ni de `data/`.

## Dependencias entre features

- De otra feature se importan componentes de dominio, acciones, tipos y funciones de `data/`. Nunca pantallas.
- No hay dependencias circulares. Si `home` importa de `catalog`, `catalog` no importa de `home`.
- `auth` (sesión) y `billing` (acceso y tier) son la base: cualquier feature puede importarlas y ellas no importan de ninguna otra.
- Lo que usan tres o más features y no pertenece a un dominio sube a las carpetas compartidas.

## Dónde va algo nuevo

| Si es... | Va en |
|---|---|
| Una URL nueva | `src/app/.../page.tsx` |
| Un webhook o endpoint HTTP propio de la web | `src/app/.../route.ts` |
| Una pantalla | `src/features/{dominio}/screens/` |
| Una pieza de UI de un solo dominio | `src/features/{dominio}/components/` |
| Una pieza de UI que usan dos o más features | `src/components/` |
| Una primitiva de UI genérica | `src/components/ui/` con `npx shadcn@latest add` |
| Una lectura de la API | `src/features/{dominio}/data/` |
| Una mutación | `src/features/{dominio}/actions/` |
| La lógica de un formulario o de un flujo en el cliente | `src/features/{dominio}/hooks/` |
| Una validación | `src/features/{dominio}/schema/` |
| Una cache tag | `src/constants/cache-tags.ts` |
| Una función pura reutilizable | `src/utils/` |
| Un color, radio o fuente | `src/app/globals.css` |
| Un test | Junto al archivo que prueba (`*.test.ts(x)`) |
| Un helper, mock o factory de pruebas | `src/test/` |

Un componente sube de una feature a `src/components/` cuando una segunda feature lo necesita, no antes. Excepción: un control genérico sin lógica de dominio que el usuario decidió compartir, como `GoogleButton`.
