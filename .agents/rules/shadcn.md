# shadcn

Cómo se usan las primitivas de UI. El proyecto usa shadcn con el estilo `base-nova`, construido sobre **Base UI** (no sobre Radix). La configuración está en `components.json`.

## Agregar una primitiva

```bash
npx shadcn@latest add dialog
```

- Toda primitiva genérica (botón, input, diálogo, menú, tabs) sale del registro de shadcn. No se escribe a mano ni se instala otra librería de componentes.
- El CLI la deja en `src/components/ui/` e instala sus dependencias. Se commitea tal como la genera.
- Antes de agregar una, revisa `src/components/ui/`: puede que ya esté.
- Instaladas: `accordion`, `badge`, `sheet`, `alert`, `alert-dialog`, `button`, `checkbox`, `dialog`, `field`, `input`, `input-group`, `label`, `separator`, `textarea`.

## No editar `src/components/ui/`

Esa carpeta es código generado: el CLI puede volver a escribirla. No sigue las reglas de estilo del proyecto (Biome solo la formatea).

- La única edición permitida es ajustar la marca en todo el producto (tamaños, espaciado, tipografía o una variante que el manual exige). Se hace en las clases de la primitiva (su `cva` si lo tiene) y se anota en [`../topics/ui-and-theme.md`](../topics/ui-and-theme.md).
- Para un comportamiento distinto, se compone un componente nuevo en `src/components/` o en la feature que envuelve a la primitiva.
- Los colores no se cambian en la primitiva: se cambian los tokens en `globals.css` ([`styling.md`](./styling.md#tema-y-marca)).

## Usar una primitiva

- Se importa por nombre desde su archivo: `import { Button } from "@/components/ui/button"`.
- Se elige la variante y el tamaño existentes (`variant="outline"`, `size="sm"`) antes que sobrescribir clases.
- `className` se usa para layout (márgenes, ancho, posición), no para cambiar colores, bordes o tipografía de la primitiva. Si hace falta otro aspecto en varios lugares, falta una variante.

```tsx
<Button variant="outline" size="sm" className="w-full">
  Ver lecciones
</Button>
```

## Composición con Base UI: `render`, no `asChild`

Base UI no tiene `asChild`. Para que una primitiva se pinte como otro elemento (por ejemplo, un botón que es un enlace), se usa la prop `render`:

```tsx
import { Button } from "@/components/ui/button"

<SheetClose render={<Button variant="ghost" size="icon" />}>
  <XIcon aria-hidden="true" />
</SheetClose>
```

- Un enlace con aspecto de botón es `LinkButton` de `@/components/link-button` (usa `buttonVariants` con `cn()`; `isExternal` abre en otra pestaña). `buttonVariants` sin `cn()` no resuelve clases en conflicto. No se usa `<Button nativeButton={false} render={<a />}>` para navegar, porque Base UI le pone `role="button"` al enlace.
- Los ejemplos de internet que usan `asChild` son de la versión sobre Radix: no aplican acá.
- La documentación de cada primitiva está en [base-ui.com](https://base-ui.com/react/components) y en el registro de shadcn.

## Formularios

Los controles de formulario se arman con `Field`, `FieldLabel`, `FieldDescription` y `FieldError` de `src/components/ui/field`, envueltos en los campos de `src/components/form/` que se conectan a `react-hook-form` ([`forms.md`](./forms.md)). Una pantalla no arma `Field` + `Input` a mano para cada campo.

## Servidor y cliente

Las primitivas interactivas de Base UI necesitan el cliente. Se pueden usar desde un Server Component cuando solo reciben props serializables (texto, `variant`). Si se les pasan funciones (`onClick`), el componente que las usa tiene que ser un Client Component ([`components.md`](./components.md#servidor-y-cliente)).

## Íconos

Los íconos salen de `lucide-react` (configurado en `components.json`). Dentro de un `Button`, el ícono va antes o después del texto con `data-icon="inline-start"` o `data-icon="inline-end"` para que la primitiva ajuste el espaciado.
