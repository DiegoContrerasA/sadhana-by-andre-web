# 02 · Componentes base

Estado: 🟨 · Fase 1

## Objetivo

Tener la librería de piezas reutilizables antes de armar pantallas. Se revisa todo en una página de catálogo `/dev/components` (solo en desarrollo).

## Reglas

Aplican `components.md`, `shadcn.md`, `forms.md` y `styling.md`: primitivas con el CLI en `src/components/ui/` sin editarlas, composición con `render` (no `asChild`), campos conectados a RHF en `src/components/form/`, solo tokens semánticos, sin comentarios, un componente por archivo.

Cada componente interactivo define `variant`, `size`, estados (hover, foco visible, deshabilitado, cargando) y accesibilidad.

## Estado actual

Instaladas: `alert`, `alert-dialog`, `button`, `checkbox`, `dialog`, `field`, `input`, `input-group`, `label`, `separator`, `textarea`. Existen `TextField`, `PasswordField`, `CheckboxField`, `FormError`, `SubmitButton` y la página `/dev/components`. Faltan `Logo` y `AuthCard`.

## Primitivas a agregar (CLI de shadcn)

| Primitiva | Para qué |
|---|---|
| `card` | Contenedor de las pantallas de auth |
| `checkbox` | "Recordarme", aceptar términos |
| `alert` | Error general del formulario y mensajes de éxito |
| `input-group` | Input con botón (ojo de contraseña) |
| `sonner` (toast) | Avisos efímeros |
| `spinner` / `skeleton` | Estados de carga |

Se agregan solo las que usa alguna ficha; si el CLI no tiene alguna, se compone.

## Componentes propios

### `src/components/form/`

| Componente | Props clave | Notas |
|---|---|---|
| `TextField` (existe) | `control`, `name`, `label`, `description` | Revisar que use `size` |
| `PasswordField` | igual que `TextField` | Botón mostrar/ocultar con `aria-label` y `aria-pressed`; `autoComplete` configurable (`current-password` / `new-password`) |
| `CheckboxField` | `control`, `name`, `label` | Para "Recordarme" y términos; el label puede llevar enlaces (children) |
| `FormError` | `message` | Alert con `role="alert"` para errores del servidor |
| `SubmitButton` | `isPending`, `pendingLabel` | `Button` tipo `submit`, deshabilitado y con `aria-busy` mientras carga |

### `src/components/`

| Componente | Props clave | Notas |
|---|---|---|
| `Logo` | `variant` (`light` / `dark`), `size` | Usa `next/image` o SVG |
| `AuthCard` | `title`, `description`, `children`, `footer` | Layout visual de las pantallas de auth: logo, título, formulario y enlace alterno |
| `PasswordStrength` (opcional) | `value` | Solo si se decide en la ficha 05 |

`Button` ya cubre `variant`, `size` y enlaces con `render={<Link />}`; se añade el estado cargando en `SubmitButton`, no en la primitiva.

## Página de catálogo

`src/app/dev/components/page.tsx` (≤ 40 líneas) renderiza una pantalla de `src/features/dev/` con cada componente en todos sus estados: normal, foco, error, deshabilitado, cargando. Solo accesible con `NODE_ENV !== "production"`.

## Pruebas

Junto a cada componente (`*.test.tsx`): etiqueta asociada, error visible con `aria-invalid`, mostrar/ocultar contraseña, envío bloqueado mientras `isPending`, checkbox con teclado.

## Tareas

- [ ] Agregar primitivas con `npx shadcn@latest add`
- [x] `PasswordField`
- [x] `CheckboxField`
- [x] `FormError`
- [x] `SubmitButton`
- [ ] `Logo`
- [ ] `AuthCard`
- [x] Página `/dev/components` con todos los estados
- [ ] Pruebas de cada componente
- [ ] Actualizar `.agents/topics/ui-and-theme.md` (primitivas y campos disponibles) y la lista en `forms.md` / `shadcn.md`
- [ ] Biome, lint, typecheck y tests en verde
- [ ] Revisión del usuario

## Criterios de aceptación

- Cada componente se ve y se usa bien con teclado y lector de pantalla.
- Ninguna pantalla de auth arma `Field` + `Input` a mano.
- Cambiar la marca (ficha 01) no requiere tocar componentes.
