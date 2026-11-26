# Estilo de código

Aplica a todo archivo `.ts` o `.tsx` que se escriba o edite, en cualquier carpeta salvo `src/components/ui/` (lo genera shadcn).

## Formato

Biome formatea, ordena los imports y aplica el lint (`biome.json`). El formato no se discute a mano: comillas dobles, sin punto y coma al final de línea, indentación de 2 espacios.

- `npm run biome:check` corrige formato, imports y reglas seguras.
- El pre-commit corre Biome solo sobre los archivos del commit (`lint-staged`), así que un archivo viejo se reformatea cuando se toca.
- Biome cubre formato, correctitud y las fronteras de la arquitectura; ESLint (`npm run lint`) cubre las reglas propias de Next.js (`eslint-config-next`). Ambos deben pasar.
- `noUnusedImports`, `noUnusedVariables`, `useExhaustiveDependencies` y `useHookAtTopLevel` son error, no warning.
- Si Biome falla por `noRestrictedImports`, algo está en la carpeta equivocada: se mueve, no se silencia la regla.

## Sin comentarios

No escribas comentarios. El código se explica con nombres claros de variables, funciones, tipos y componentes.

Esto incluye comentarios que describen qué hace una línea o una función, bloques `/** ... */` sobre props o funciones, comentarios que narran un cambio, separadores de sección y `// TODO`.

Si sientes que hace falta un comentario, cambia el nombre o extrae una función con un nombre que lo diga.

Únicas excepciones:

- Directivas de herramientas: `// biome-ignore ...`, `// @ts-expect-error ...`, `// eslint-disable-next-line ...`.
- Una sola línea cuando el comportamiento es contraintuitivo y alguien lo "arreglaría" mal sin la aclaración.

La explicación de un cambio va en la respuesta al usuario o en el mensaje del commit, nunca en el código.

## Tamaño de archivos

| Tipo de archivo | Máximo de líneas |
|---|---|
| `page.tsx`, `loading.tsx`, `error.tsx` | 40 |
| `layout.tsx`, `route.ts` | 80 |
| Componente | 150 |
| Pantalla (`*-screen.tsx`) | 150 |
| Hook | 80 |
| Función de `data/` o action de `actions/` | 80 |
| Schema de validación | 80 |
| Archivo de `utils/` o `lib/` | 120 |
| Test (`*.test.ts(x)`) | 200 |
| `index.ts` o `server.ts` de una feature | 40 |
| Cualquier otro | 200 |

El límite incluye imports y tipos. No aplica a `src/app/globals.css` ni a `src/components/ui/`.

Además:

- Una función o componente no supera las 40 líneas de cuerpo.
- Un componente no recibe más de 8 props. Si necesita más, se resuelve con composición (`children`, componentes compuestos), no con más props.
- El JSX no supera 5 niveles de anidación. Si los supera, extrae un componente.

Cuando un archivo se acerca al límite, se divide por responsabilidad: un subcomponente a su propio archivo, la lógica a un hook, una transformación a `utils/`. No se comprime el código para entrar en el límite.

## Longitud y verbosidad

El código es corto porque cada pieza hace una sola cosa, no porque esté comprimido.

- **Una responsabilidad por función.** Si para describir lo que hace una función hace falta un "y", son dos funciones.
- **Retorno temprano.** Los casos de error o vacíos se resuelven arriba con `return`; el camino feliz queda sin anidar. No hay `else` después de un `return`.
- **Sin ternarios anidados.** Un ternario es para dos valores; con más casos, un `if` temprano, un objeto de búsqueda o un `switch`.
- **En JSX**, una condición se escribe con ternario (`isLocked ? <Lock /> : null`), no con `&&`, para no pintar un `0` sin querer.
- **`const` por defecto.** `let` solo cuando el valor se reasigna; nunca `var`.
- **Sin abstracción prematura.** No se crea un helper, un hook o un componente genérico hasta que haya dos usos reales. Tres líneas repetidas dos veces son preferibles a una abstracción equivocada.
- **Sin código muerto.** Nada comentado, nada sin usar, ninguna rama que no se puede alcanzar. Biome falla con imports y variables sin uso.
- **Sin ruido defensivo.** No se comprueba lo que el tipo ya garantiza ni se atrapan errores que no se van a manejar.
- **Una idea por línea.** No se encadenan más de tres llamadas en una expresión sin nombrar el resultado intermedio.
- **Números y strings con significado** se nombran como constante (`const trialPoseLimit = 2`), salvo los obvios (`0`, `1`, `""`).

### Nombres

- Nombres completos y en inglés: `lesson`, no `lsn`; `isTrialExpired`, no `expired`. Las abreviaturas comunes se permiten (`id`, `url`, `href`, `props`).
- El largo del nombre es proporcional a su alcance: `i` en un bucle de tres líneas, `trialUnlockedPoseIds` en un valor que cruza archivos.
- Sin redundancia: dentro de `features/catalog`, `getPose`, no `getCatalogPoseData`; una prop `pose`, no `poseObject`. Sin sufijos vacíos como `Data`, `Info`, `Item` o `Manager` si no agregan significado.
- Manejadores de eventos dentro de un componente: `handle{Evento}` (`handleSubmit`); props de callback: `on{Evento}` (`onSubmit`).
- El texto visible para el usuario va en `messages/` (`es` y `en`); el código (nombres, tests, commits) en inglés.

## TypeScript

Las reglas de tipado (configuración estricta, `type` vs `interface`, lo prohibido, uniones discriminadas, validación en los bordes, genéricos) viven en [`typescript.md`](./typescript.md).

## Naming

- Archivos y carpetas en kebab-case: `pose-card.tsx`, `get-pose.ts`, `format-duration.ts`.
- Hooks con prefijo `use-`: `use-trial-unlock-form.ts` exporta `useTrialUnlockForm`.
- Lecturas con verbo `get`: `data/get-pose.ts` exporta `getPose`.
- Actions con verbo de la mutación: `actions/unlock-trial-pose.ts` exporta `unlockTrialPose`.
- Sufijo descriptivo para lo que no es componente, hook, lectura ni action: `sign-in.schema.ts`, `to-checkout-body.ts`.
- Pantallas con sufijo `-screen`: `pose-detail-screen.tsx` exporta `PoseDetailScreen`.
- Props de callback con prefijo `on`: `onSelectPose`. Props de navegación con sufijo `Href`: `signUpHref`.
- Booleanos con prefijo `is`, `has` o `should`.

## Exports

- Todo usa export nombrado: `export function PoseCard`, `export async function getPose`.
- La única excepción son los archivos especiales de `src/app/` (`page`, `layout`, `loading`, `error`, `not-found`, `template`, `default`), que requieren `export default`.
- Una feature se consume solo por su `index.ts` o `server.ts`. Son los únicos archivos que reexportan; no hay otros barrels y nunca `export *`.

## Imports

- Entre carpetas de `src/`, siempre con el alias `@/`: `@/components/ui/button`, `@/features/catalog`.
- Dentro de una misma feature, imports relativos: `../components/pose-card`. Una feature nunca se importa a sí misma por su `index.ts`.
- Biome ordena los imports; no se pelea el orden a mano.
- Las librerías con muchos exports (íconos, utilidades) se agregan a `experimental.optimizePackageImports` en `next.config.ts` si no vienen optimizadas por defecto.

## Dependencias

- No se agrega una dependencia nueva sin que el usuario lo pida o lo apruebe.
- Antes de agregar una librería, revisa si Next.js, React o una primitiva de shadcn ya lo resuelven.
- Las versiones se instalan con `npm install`; el lockfile se commitea.

## Manejo de errores

- Las funciones de `data/` dejan que el error se propague; no lo atrapan para devolver un valor por defecto. `error.tsx` lo muestra.
- Las Server Actions devuelven un resultado tipado para los errores esperados (validación, regla de negocio) y dejan propagar los inesperados.
- Toda pantalla que carga datos resuelve cuatro estados: cargando (`loading.tsx` o `<Suspense>`), error (`error.tsx`), vacío y contenido.
- Ningún `console.log` queda en el código que se entrega.
