# TypeScript

Cómo se tipa el código. Aplica a todo `.ts` y `.tsx` salvo `src/components/ui/` (lo genera shadcn).

## Configuración

`tsconfig.json` tiene `strict` y además:

| Opción | Efecto |
|---|---|
| `noUncheckedIndexedAccess` | `lista[0]` y `registro[clave]` son `T \| undefined`: hay que comprobarlos antes de usarlos. |
| `noImplicitOverride` | Un método que sobrescribe otro lleva `override`. |
| `noFallthroughCasesInSwitch` | Un `case` no puede caer en el siguiente sin `break` o `return`. |

No se relajan estas opciones para que algo compile: se arregla el tipo.

## `type` o `interface`

- `type` para todo: props, argumentos, resultados, uniones y formas locales.
- `interface` solo cuando una librería exige extender por declaración (augmentación de módulos).
- Los tipos de dominio (posturas, rutas, lecciones, usuario, suscripción, requests y responses) vienen del contrato de la API. No se redeclaran ni se copian; si hace falta una variante, se deriva (`Pick`, `Omit`).

## Prohibido

| No | En su lugar |
|---|---|
| `any` | `unknown` con narrowing explícito |
| `enum` | Unión de literales (`"free" \| "trial" \| "premium"`) u objeto `as const` |
| `as Tipo` para callar al compilador | Narrowing, un type guard o corregir el tipo de origen |
| `!` (non-null assertion) | Comprobar el valor (`if (!pose) notFound()`) |
| `// @ts-ignore` | `// @ts-expect-error` con el motivo en la misma línea, solo para un bug de tipos de una librería |
| `Function`, `Object`, `{}` como tipo | La firma concreta, `Record<string, unknown>` o `unknown` |

Se permiten `as const` y `satisfies`.

## Inferencia y anotaciones

- Se deja inferir lo local: variables, retornos de funciones internas, callbacks.
- Se anota lo que forma un contrato: props de componentes, parámetros de funciones exportadas y el resultado de una Server Action.
- `satisfies` para comprobar un objeto contra un tipo sin perder los literales:

```ts
export const cacheTags = {
  catalog: {
    all: "catalog",
    pose: (slug: string) => `catalog:pose:${slug}`,
  },
} satisfies Record<string, Record<string, string | ((id: string) => string)>>
```

## Uniones discriminadas

Los estados con variantes se modelan como unión discriminada, no con banderas opcionales sueltas.

```ts
type ActionResult<TError extends string = string> =
  | { ok: true }
  | { ok: false; error: TError }
```

```ts
const result = await unlockTrialPose({ poseId })
if (!result.ok) return showError(result.error)
```

Un `switch` sobre el discriminante cubre todos los casos; el `default` comprueba que no quede ninguno con `const unreachable: never = value`.

## Validación en los bordes

Todo dato que entra desde afuera es `unknown` hasta que se valida con `zod`: argumentos de una Server Action, `searchParams`, cuerpos de webhooks, variables de entorno.

- El tipo se deriva del schema con `z.infer`, nunca se escribe a mano por separado.
- Dentro del código ya validado no se vuelve a validar.

```ts
export const trialUnlockSchema = z.object({
  poseId: z.uuid(),
})

export type TrialUnlockValues = z.infer<typeof trialUnlockSchema>
```

## Genéricos

- Un genérico existe solo si conecta dos tipos (el valor que entra con el que sale). Si aparece una sola vez en la firma, sobra.
- Nombres descriptivos con prefijo `T` cuando importan para quien lee la firma (`TFieldValues extends FieldValues`). Una sola letra solo en utilidades triviales.
- Se restringen con `extends` lo más posible.

## Funciones

- Hasta 3 parámetros posicionales. Con más, o con booleanos que cambian el comportamiento, un objeto con nombre: `getLessons({ programId, includeLocked })`.
- Los parámetros opcionales van al final y tienen valor por defecto en la desestructuración.
- Una función async que puede no encontrar algo devuelve `T | null` o llama a `notFound()`; no devuelve `undefined` sin querer.
- Se usa `readonly` en arrays de parámetros que la función no debe mutar (`readonly string[]`).

## Imports de tipos

- Los imports que solo traen tipos usan `import type` o `type` en línea (`import { type Control, useController }`).
- Un tipo que usan dos archivos de la misma feature vive en el archivo dueño (el schema, la función de `data/`) y se importa de ahí; no hay archivos `types.ts` genéricos.

## Next.js

- Las props de rutas usan los helpers globales que genera Next: `PageProps<"/poses/[slug]">`, `LayoutProps<"/">`. `npm run typecheck` los regenera con `next typegen`.
- `params` y `searchParams` son promesas: se esperan con `await`.
- Los `searchParams` se validan con `zod` antes de usarlos.
