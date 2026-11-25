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
| Primitivas | `components/ui/` | `alert`, `alert-dialog`, `button`, `checkbox`, `dialog`, `field`, `input`, `input-group`, `label`, `separator`, `textarea` |
| Campos de formulario | `components/form/` | `TextField` (con `icon` opcional), `PasswordField` (mostrar/ocultar), `CheckboxField`, más `SubmitButton` (estado cargando) y `FormError` |

## Detalles a tener en cuenta

- **Botones**: en mayúsculas con `tracking-[0.2em]` y `text-xs`.
- **Alturas**: `Input` e `InputGroup` miden `h-12` (48px); el `Button` por defecto `h-10`, `lg` `h-13` (52px) y `sm` `h-8`. El `Checkbox` mide `size-5` (20px). Es un ajuste de marca hecho en el `cva` de las primitivas de `components/ui/`; si el CLI las regenera, hay que repetirlo.
- **Modales**: `Dialog` y `AlertDialog` usan `p-6` (`sm:p-8`), `gap-6`, ancho `sm:max-w-md`, título `text-3xl font-light`, footer sin fondo ni borde y sin iconos decorativos. Como en las alturas, si el CLI regenera las primitivas hay que repetirlo.
- **Paleta de marca**: primary ciruela `#9C4684`, secondary crema `#F8F3E8`, accent rosa grisáceo `#DFC8CE` (aclarado), highlight orquídea `#C969B7`. El fondo es blanco. `--input` es más oscuro que `--border` para que el borde de los campos cumpla 3:1.
- **`--highlight` no es para texto pequeño sobre blanco**: el blanco sobre orquídea da 3.4:1. Su par de texto es `--highlight-foreground` (casi negro).
- **Falta el logo para fondos claros**: solo existe la versión blanca (`public/brand/logo-white.png`).
- El procedimiento de marca está en [`styling.md`](../rules/styling.md#tema-y-marca) y el uso de las primitivas en [`shadcn.md`](../rules/shadcn.md).
- El modo oscuro tiene tokens (`.dark`), pero no hay selector de tema; hoy la app siempre se ve en claro.
- Las primitivas de `components/ui/` las genera el CLI e importan `cn` del paquete `cn`. Biome desactiva para esa carpeta `noLabelWithoutControl` (`Label` es un wrapper; la asociación se hace donde se usa), `useKeyWithClickEvents` (el addon de `InputGroup` enfoca el input al hacer clic) y `noDoubleEquals` (código del CLI).
- Los formularios llevan `noValidate` para que los errores los muestre el schema de `zod` y no el navegador.
- La página de inicio (`app/page.tsx`) es provisional: solo pinta un `Button` de shadcn ("Empezar") centrado, todavía sin destino.

## Archivos clave

`app/globals.css`, `app/layout.tsx`, `components/ui/`, `components/form/`, `lib/utils.ts`.

## Pruebas

- `components/form/*.test.tsx`: asociación de etiquetas, error visible con `aria-invalid`, mostrar/ocultar contraseña, checkbox, estado cargando de `SubmitButton` y `FormError`. Helper: `test/render-with-form.tsx`.
- `app/page.test.tsx`: la página pinta un único botón, "Empezar".
