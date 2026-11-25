# UI y tema

## Qué hace

Define la base visual de la web: primitivas de shadcn sobre Base UI, tokens de color y radio en CSS, fuentes con `next/font` y campos de formulario conectados a `react-hook-form`.

## Piezas

| Pieza | Archivo | Rol |
|---|---|---|
| Configuración de shadcn | `components.json` (raíz) | Estilo `base-nova`, Base UI, color base `neutral`, íconos `lucide`, alias `@/components`, `@/lib`, `@/hooks` |
| Tokens | `app/globals.css` | `:root` y `.dark` con los colores de marca en `oklch` y `--radius`; `@theme inline` los expone a Tailwind. Incluye el token `--highlight` (acento decorativo) |
| Fuentes | `app/layout.tsx` | Geist como `--font-sans`, Cormorant Garamond (500, 600, 700) como `--font-heading` y Geist Mono como `--font-geist-mono` |
| Marca | `public/brand/`, `public/og.png`, `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` | Logo blanco, imagen Open Graph e íconos tomados del sitio `sadhanabyandre` |
| `cn` | `lib/utils.ts` | Combina clases (reexporta el paquete `cn`) |
| Primitivas | `components/ui/` | `button`, `field`, `input`, `label`, `separator` |
| Campos de formulario | `components/form/text-field.tsx` | `TextField`: etiqueta asociada, input, descripción opcional y error de `react-hook-form` |

## Detalles a tener en cuenta

- **Paleta de marca**: primary ciruela `#9C4684`, secondary crema `#F8F3E8`, accent rosa grisáceo `#DFC8CE` (aclarado), highlight orquídea `#C969B7`. El fondo es blanco. `--input` es más oscuro que `--border` para que el borde de los campos cumpla 3:1.
- **`--highlight` no es para texto pequeño sobre blanco**: el blanco sobre orquídea da 3.4:1. Su par de texto es `--highlight-foreground` (casi negro).
- **Falta el logo para fondos claros**: solo existe la versión blanca (`public/brand/logo-white.png`).
- El procedimiento de marca está en [`styling.md`](../rules/styling.md#tema-y-marca) y el uso de las primitivas en [`shadcn.md`](../rules/shadcn.md).
- El modo oscuro tiene tokens (`.dark`), pero no hay selector de tema; hoy la app siempre se ve en claro.
- Las primitivas de `components/ui/` las genera el CLI e importan `cn` del paquete `cn`. Biome desactiva para esa carpeta `noLabelWithoutControl` (`Label` es un wrapper; la asociación se hace donde se usa) y `noDoubleEquals` (código del CLI).
- Los formularios llevan `noValidate` para que los errores los muestre el schema de `zod` y no el navegador.
- La página de inicio (`app/page.tsx`) es provisional: solo pinta un `Button` de shadcn ("Empezar") centrado, todavía sin destino.

## Archivos clave

`app/globals.css`, `app/layout.tsx`, `components/ui/`, `components/form/`, `lib/utils.ts`.

## Pruebas

- `components/form/text-field.test.tsx`: asociación de etiqueta, error del schema sin envío, envío con el valor escrito.
- `app/page.test.tsx`: la página pinta un único botón, "Empezar".
