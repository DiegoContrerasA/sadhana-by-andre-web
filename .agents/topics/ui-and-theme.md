# UI y tema

## Qué hace

Define la base visual de la web: primitivas de shadcn sobre Base UI, tokens de color y radio en CSS, fuente del sistema y campos de formulario conectados a `react-hook-form`.

## Piezas

| Pieza | Archivo | Rol |
|---|---|---|
| Configuración de shadcn | `components.json` (raíz) | Estilo `base-nova`, Base UI, color base `neutral`, íconos `lucide`, alias `@/components`, `@/lib`, `@/hooks` |
| Tokens | `app/globals.css` | `:root` y `.dark` con los colores de marca en `oklch` y `--radius`; `@theme inline` los expone a Tailwind. Incluye el token `--highlight` (acento decorativo) |
| Fuentes | `app/globals.css` | Pila de fuentes del sistema (`ui-sans-serif, system-ui`), igual que sadhanabyandre.com: no se descarga ninguna fuente. `--font-heading` apunta a `--font-sans`. Los `h1` a `h4` salen en `font-light` por defecto |
| Marca | `public/brand/`, `public/og.png`, `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` | Logo blanco, imagen Open Graph e íconos tomados del sitio `sadhanabyandre` |
| `cn` | `lib/utils.ts` | Combina clases (reexporta el paquete `cn`) |
| Google | `components/google-button.tsx` | `GoogleButton`: botón de acceso con Google, con estado cargando. Solo presenta; la acción llega por `onClick` |
| Enlaces | `components/link-button.tsx` | `LinkButton`: enlace con las variantes de `Button` |
| Primitivas | `components/ui/` | `accordion`, `badge`, `sheet`, `alert`, `alert-dialog`, `button`, `checkbox`, `dialog`, `field`, `input`, `input-group`, `label`, `separator`, `textarea` |
| Campos de formulario | `components/form/` | `TextField` (con `icon` opcional), `PasswordField` (mostrar/ocultar), `CheckboxField`, más `SubmitButton` (estado cargando) y `FormError` |
| Catálogo | `app/dev/components` | Página solo de desarrollo (404 en producción) con todos los componentes base (botones, campos, mensajes y modales) y sus estados, armada en `features/dev` |

## Detalles a tener en cuenta

- **Estilo tipográfico del sitio**: títulos livianos, grandes y con interlineado cerrado (`text-5xl leading-none`); etiquetas pequeñas en mayúsculas con mucho espaciado (`text-[0.65rem] tracking-[0.35em] uppercase`); botones en mayúsculas con `tracking-[0.2em]` y `text-xs`. La sección "Tipografía" de `/dev/components` muestra la escala.
- **Alturas**: `Input` e `InputGroup` miden `h-12` (48px); el `Button` por defecto `h-10`, `lg` `h-13` (52px) y `sm` `h-8`. El `Checkbox` mide `size-5` (20px). Es un ajuste de marca hecho en el `cva` de las primitivas de `components/ui/`; si el CLI las regenera, hay que repetirlo. `--radius` es 0.375rem (6px): esquinas suaves, cercanas a las rectas del sitio y cómodas para móvil.
- **Modales**: `Dialog` y `AlertDialog` usan `p-6` (`sm:p-8`), `gap-6`, ancho `sm:max-w-md`, título `text-3xl font-light`, footer sin fondo ni borde y sin iconos decorativos. Como en las alturas, si el CLI regenera las primitivas hay que repetirlo.
- **Paleta de marca**: primary ciruela `#9C4684`, secondary crema `#F8F3E8`, accent rosa grisáceo `#DFC8CE` (aclarado), highlight orquídea `#C969B7`. El fondo es blanco. `--input` es más oscuro que `--border` para que el borde de los campos cumpla 3:1.
- **`--highlight` no es para texto pequeño sobre blanco**: el blanco sobre orquídea da 3.4:1. Su par de texto es `--highlight-foreground` (casi negro).
- **Falta el logo para fondos claros**: solo existe la versión blanca (`public/brand/logo-white.png`).
- El procedimiento de marca está en [`styling.md`](../rules/styling.md#tema-y-marca) y el uso de las primitivas en [`shadcn.md`](../rules/shadcn.md).
- El modo oscuro tiene tokens (`.dark`), pero no hay selector de tema; hoy la app siempre se ve en claro.
- Las primitivas de `components/ui/` las genera el CLI e importan `cn` del paquete `cn`. Biome desactiva para esa carpeta `noLabelWithoutControl` (`Label` es un wrapper; la asociación se hace donde se usa), `useKeyWithClickEvents` (el addon de `InputGroup` enfoca el input al hacer clic) y `noDoubleEquals` (código del CLI).
- Los formularios llevan `noValidate` para que los errores los muestre el schema de `zod` y no el navegador.
- Ajustes de marca en primitivas (hay que repetirlos si el CLI las regenera): `Button` suma las variantes `outline-primary`, `inverse`, `outline-inverse`, `ghost-inverse` y el tamaño `pill`; `Badge` suma `soft`, `outline-inverse` y los tamaños `lg` y `label`; `Accordion` usa ícono de más y menos y la tipografía de la marca; `Sheet` suma `side="full"`.
- Los tokens `--overlay` (negro) y `--overlay-foreground` (blanco) son para texto sobre fotos y para el pie oscuro.
- La página de inicio es la landing: ver [`marketing.md`](./marketing.md).

## Archivos clave

`app/globals.css`, `app/layout.tsx`, `components/ui/`, `components/form/`, `lib/utils.ts`.

## Pruebas

- `components/form/*.test.tsx`: asociación de etiquetas, error visible con `aria-invalid`, mostrar/ocultar contraseña, checkbox, estado cargando de `SubmitButton` y `FormError`. Helper: `test/render-with-form.tsx`.
