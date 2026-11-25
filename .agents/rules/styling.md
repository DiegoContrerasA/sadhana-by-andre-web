# Estilos con Tailwind

El proyecto usa **Tailwind CSS v4** en modo CSS-first. El tema vive en `src/app/globals.css`; no hay `tailwind.config`. Las primitivas de UI vienen de shadcn ([`shadcn.md`](./shadcn.md)). No hay, y no se agrega, otro sistema de estilos.

## Reglas base

- Toda clase va en `className` con utilidades de Tailwind. Nada de CSS Modules, styled-components, Sass, `<style>` embebido ni archivos `.css` por componente.
- `style={{ ... }}` solo para un valor calculado en runtime que no se puede expresar como clase (el progreso de un video, una posición de arrastre).
- `@apply` solo en la capa `@layer base` de `globals.css`. En componentes, las clases van en el JSX o en un `cva()`.
- Las clases se combinan y condicionan con `cn()` de `@/lib/utils`, nunca concatenando strings ni con template literals.

```tsx
<div className={cn("rounded-lg border p-4", isActive && "border-primary")} />
```

## Tokens, no valores sueltos

- **Color**: solo tokens semánticos (`bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `ring-ring`, `text-destructive`). Nunca colores de la paleta de Tailwind (`zinc-500`, `bg-black`, `text-white`) ni hex, rgb u oklch en el JSX.
- **Opacidad** sobre un token con el modificador: `bg-primary/10`, `border-border/60`.
- **Radio**: `rounded-sm` a `rounded-4xl`, que salen de `--radius`. No `rounded-[7px]`.
- **Tipografía**: `font-sans` (texto) y `font-heading` (títulos). Tamaños de la escala de Tailwind (`text-sm` a `text-5xl`).
- **Espaciado**: la escala de Tailwind (`p-4`, `gap-6`). Un valor arbitrario (`max-w-[42rem]`) solo cuando la escala no tiene uno que sirva, y nunca para colores ni radios.

## Layout

- `flex` y `grid` con `gap-*` para separar hijos. No se separan elementos hermanos con márgenes (`mt-4` en cada hijo); el contenedor define el espacio.
- `size-*` cuando ancho y alto son iguales (`size-8` en lugar de `h-8 w-8`).
- Mobile-first: las clases sin prefijo son el estilo de celular y se agregan `sm:`, `md:`, `lg:` hacia arriba. No se escribe primero el escritorio para después deshacerlo.
- Anchos de lectura con `max-w-*` y centrado con `mx-auto`.
- Los contenedores de página usan un ancho máximo y un padding lateral consistentes; cuando se repitan en varias rutas, se extraen a un componente de layout.

## Estados e interacción

- Estados con variantes de Tailwind: `hover:`, `focus-visible:`, `active:`, `disabled:`, `aria-invalid:`, `data-[state=open]:`.
- El foco se marca con `focus-visible:`, no con `focus:`, y nunca se quita sin reemplazo.
- Variantes de grupo (`group-hover:`, `group-data-[...]`) y de padre (`has-[...]`) antes que estado en JavaScript para resolver estilos.

## Variantes → `cva`

Cuando un componente tiene más de un estado visual (variante, tamaño), las clases van en un `cva()` declarado en el mismo archivo, encima del componente, igual que las primitivas de `src/components/ui/`.

```tsx
const statusBadge = cva("inline-flex items-center rounded-full px-2 text-xs font-medium", {
  variants: {
    status: {
      locked: "bg-muted text-muted-foreground",
      unlocked: "bg-primary/10 text-primary",
    },
  },
})
```

- No se arma el equivalente con ternarios anidados en el JSX.
- Una combinación de clases que se repite en 3 o más componentes se extrae a un `cva()` o a un componente.

## Longitud de `className`

- Si un `className` no entra en una línea legible, es señal de que el elemento hace demasiado: se extrae un componente o un `cva()`.
- Se agrupan las clases en este orden aproximado: layout y posición, tamaño, espaciado, tipografía, color, borde, efectos, estados, responsive. Biome no lo ordena solo todavía; se respeta a mano.

## Tema y marca

Los tokens viven en `src/app/globals.css`:

- `:root` y `.dark` definen los valores (colores en `oklch`, `--radius`).
- `@theme inline` los expone como utilidades (`--color-primary` → `bg-primary`).
- Las fuentes son la pila del sistema, definida en `@theme inline` como `--font-sans` y `--font-heading`; no se cargan archivos de fuentes.

**Estado actual:** paleta de marca (ciruela, crema, rosa grisáceo y orquídea) aplicada en los tokens, fuente del sistema para texto y títulos (como el sitio), con títulos en peso ligero. Falta el logo para fondos claros.

Para cambiar la marca:

1. Los colores de marca se traducen a los tokens semánticos existentes (`--primary`, `--secondary`, `--accent`, `--ring`, `--chart-*`...) en `:root` y `.dark`. No se crean clases por color de marca si un token cubre el rol.
2. Si la marca necesita un rol que shadcn no tiene, se agrega un token en `:root`, `.dark` y `@theme inline` con nombre de rol (`--highlight`), no de color (`--purple`).
3. Las tipografías se cambian en `globals.css` manteniendo los nombres `--font-sans` y `--font-heading` (o se cargan con `next/font` en `layout.tsx`).
4. Cada par de texto y fondo cumple contraste WCAG AA (4.5:1 para texto normal, 3:1 para texto grande y elementos de interfaz).

Como los componentes solo usan tokens semánticos, cambiar la marca no requiere tocar componentes.

## Modo oscuro

Los tokens `.dark` existen y la variante `dark:` está configurada. Falta el selector de tema. No se agregan estilos `dark:` puntuales: los tokens ya resuelven el modo oscuro. Si un caso lo necesita, es señal de que falta un token.

## Animación

- Transiciones con utilidades de Tailwind (`transition-colors`, `duration-200`) y `tw-animate-css` para entradas y salidas.
- Toda animación tiene su versión reducida con `motion-reduce:`.
- Se animan `transform` y `opacity`, no `width`, `height` ni `top`.

## Qué no hacer

- No agregar librerías de estilos.
- No hardcodear colores, radios ni fuentes que ya tienen token.
- No usar `!important` (`!p-4`) para ganarle a una primitiva: se usa su variante o se compone.
- No usar `z-[999]`: las capas se resuelven con los componentes de shadcn (diálogos, popovers) que ya manejan el apilamiento.
