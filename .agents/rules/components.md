# Componentes

Cómo escribir un componente, sea compartido (`src/components/`) o propio de una feature (`src/features/{dominio}/components/`). Naming y exports en [`code-style.md`](./code-style.md); estilos en [`styling.md`](./styling.md).

## Forma base

```tsx
import { Badge } from "@/components/ui/badge"

type PoseSummaryProps = {
  name: string
  level: string
}

export function PoseSummary({ name, level }: PoseSummaryProps) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-heading text-lg font-semibold">{name}</h3>
      <Badge variant="secondary">{level}</Badge>
    </div>
  )
}
```

- Declaración con `function` y export nombrado.
- Props en un `type {Componente}Props` declarado encima del componente.
- Props desestructuradas en la firma, con valores por defecto ahí mismo.
- Un componente por archivo. Un subcomponente, por pequeño que sea, va en su propio archivo.
- Sin `React.FC`. Sin `memo`, `useMemo` ni `useCallback` salvo un problema de rendimiento medido.

## Servidor y cliente

- Todo componente es Server Component por defecto. No lleva directiva.
- `"use client"` va solo en los componentes que lo necesitan (estado, efectos, eventos, APIs del navegador) y lo más abajo posible del árbol: la hoja interactiva, no la pantalla entera.
- Un Server Component puede pasarle a un Client Component datos serializables, `children` y Server Actions. No puede pasarle funciones normales: por eso la navegación llega como `href` y no como callback.
- Un Client Component no importa de `server.ts` ni de `data/`, y no recibe objetos con datos que el cliente no necesita: se le pasan solo los campos que pinta.
- Los datos que dependen de la sesión se leen en el servidor y se transmiten por streaming dentro de un `<Suspense>`.

## Antes de crear un componente

Busca en este orden y usa lo primero que sirva:

1. `src/components/` y `components/` de la feature: puede que ya exista.
2. `src/components/ui/`: primitivas de shadcn ya instaladas.
3. El registro de shadcn: `npx shadcn@latest add {componente}` ([`shadcn.md`](./shadcn.md)).

Solo si nada de eso alcanza se crea un componente nuevo.

## Compartido o privado

Un componente nace dentro de la feature que lo necesita. Sube a `src/components/` cuando se cumplen las tres condiciones:

1. Lo usan dos o más features.
2. Tiene un rol con nombre propio (`EmptyState`, `PageHeader`, `VideoFrame`).
3. Su API es más pequeña que su implementación.

No se crea un componente compartido "por si acaso".

## Presentacional y contenedor

- `src/components/` es presentacional: datos y callbacks por props. No lee datos, no importa de `@/features` y no conoce tipos de dominio.
- La pantalla es el contenedor: llama a `data/` y pasa resultados a los componentes.
- Los componentes de una feature reciben datos ya resueltos. Pueden usar tipos del contrato de la API en sus props.
- La lógica del cliente vive en hooks. El componente decide qué mostrar según el estado que el hook le entrega.

## Contrato de un componente compartido

Todo componente interactivo de `src/components/` define:

- **`variant`**: intención visual, con `cva`. Se agrega una variante solo cuando una pantalla real la necesita.
- **`size`**: `sm`, `default`, `lg`, como las primitivas de shadcn.
- **Estados**: hover, foco visible, deshabilitado y cargando.
- **`className`**: se combina al final con `cn()` para ajustar layout (márgenes, ancho). No se usa para cambiar colores; si hace falta, falta una variante.
- **Accesibilidad**: elemento semántico correcto, nombre accesible y estado (`aria-invalid`, `aria-busy`, `aria-expanded`).

Cuando las props empiezan a describir contenido (`leftIcon`, `subtitle`, `footerText`), el componente pasa a recibir `children` o se divide en componentes compuestos.

## Elementos y librerías

- Imágenes: `next/image`. Enlaces internos: `next/link`.
- Íconos: `lucide-react`, con `aria-hidden` cuando acompañan texto y `sr-only` cuando están solos.
- Fuentes: `next/font`, declaradas una sola vez en el layout raíz.
- Video: el reproductor se define con la feature `player`; no se agrega una librería de video sin aprobación.

## Accesibilidad

- Un botón es `<button>` o `Button`; un enlace es `<a>` o `Link`. Nunca un `div` con `onClick`.
- Todo control de formulario tiene una etiqueta asociada (`htmlFor` + `id` con `useId()`).
- Los controles inválidos llevan `aria-invalid` y el mensaje de error con `role="alert"`.
- El foco siempre es visible; no se quita `outline` sin un reemplazo.

## Qué no hacer

- No usar `useEffect` para derivar estado que se puede calcular en el render.
- No leer datos con `fetch` o `useEffect` en el cliente.
- No usar `useRouter` dentro de una feature.
- No poner `"use client"` en una pantalla o un layout para resolver un detalle de interactividad: se extrae la hoja.
- No dejar un control visible sin comportamiento: un botón sin acción no se entrega.
