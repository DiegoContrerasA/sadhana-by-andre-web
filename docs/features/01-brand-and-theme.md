# 01 · Marca y tema

Estado: 🟨 (implementado, en revisión) · Fase 1

## Objetivo

Que la app se vea como el sitio actual de Sadhana by Andre pero construida con shadcn: cambiar los tokens de `globals.css` y las fuentes, sin tocar componentes (regla de `styling.md#tema-y-marca`).

## Qué se extrajo del repo `sadhanabyandre`

| Rol en el sitio | Valor | Uso |
|---|---|---|
| `primary` | `#9C4684` (ciruela) | Texto de marca, botones, bordes (`border-primary/15`, `bg-primary/25`) |
| `secondary` | `#C969B7` (orquídea) | Acentos, detalles |
| `neutral` | `#DFC8CE` (rosa grisáceo) | Superficies suaves, bordes |
| `primary-light` | `#F8F3E8` (crema) | Fondos claros |
| Logo | `logo.png` 1220×204, wordmark "SADHANA" **blanco** sobre transparente | Se usa sobre fotos oscuras |
| Estilo | Texto en mayúsculas con mucho espaciado (`tracking-[0.22em]`), mucho aire, fotos grandes, animaciones suaves de entrada | |

No se encontró una fuente de marca definida (el sitio usa la tipografía por defecto de Tailwind). Favicons y `site.webmanifest` existen en `public/`.

## Mapeo a tokens shadcn

Se convierten a `oklch` al implementar. Propuesta de roles:

| Token shadcn | Color de marca |
|---|---|
| `--background` | `#FFFFFF` o crema `#F8F3E8` (decidir al ver la pantalla) |
| `--foreground` | Casi negro cálido (el sitio usa `#17191E`) |
| `--primary` / `--ring` | `#9C4684` |
| `--primary-foreground` | `#FFFFFF` |
| `--secondary` | `#F8F3E8` con `--secondary-foreground` ciruela oscuro |
| `--accent` | `#DFC8CE` |
| `--muted` | Derivado de crema/neutral |
| `--border` / `--input` | `#DFC8CE` atenuado |
| `--destructive` | Rojo vino acorde a la marca (`oklch(0.49 0.14 18)`) |
| Token nuevo `--highlight` | `#C969B7` (rol: acento decorativo; no para texto) |

### Contraste (WCAG AA, cálculo propio)

- `#FFFFFF` sobre `#9C4684`: ≈ 5.8:1 ✅ (botón primario)
- `#9C4684` sobre `#F8F3E8`: ≈ 5.2:1 ✅ (texto de marca sobre crema)
- `#FFFFFF` sobre `#C969B7`: ≈ 3.4:1 ⚠️ solo texto grande o decoración; **no** usarlo como fondo de botón con texto pequeño

Se verifican con una herramienta al implementar.

## Tipografía

Pila de fuentes del sistema para texto y títulos (`--font-sans`; `--font-heading` apunta a ella), con los títulos en peso ligero. No se cargan archivos de fuentes.

## Logo

- Reusar `logo.png` blanco para fondos oscuros o imágenes.
- Falta versión oscura/ciruela para fondos claros (pantallas de auth). Dos caminos: el usuario la entrega, o se genera un SVG del wordmark en `currentColor`. **Decisión pendiente.**
- Componente `Logo` en `src/components/` (ficha 02).

## Tareas

- [x] Confirmar fondo y tipografías (fondo blanco; fuente del sistema en texto y títulos; fácil de cambiar)
- [ ] Logo para fondo claro (solo se copió la versión blanca a `public/brand/logo-white.png`; pendiente de la ficha 02)
- [x] Traducir paleta a `oklch` en `:root` en `globals.css`
- [x] Agregar token `--highlight` en `:root` y `@theme inline`
- [x] Definir las fuentes en `globals.css` (`--font-sans`, `--font-heading`)
- [x] `--radius` en 0.375rem
- [x] Metadata, favicon y manifest en `app/`
- [x] Verificar contraste de pares texto/fondo
- [x] Actualizar `.agents/topics/ui-and-theme.md` y `styling.md` (quitar "marca pendiente")
- [ ] Revisión del usuario

## Criterios de aceptación

- Ningún componente usa colores fuera de tokens semánticos.
- Todos los pares texto/fondo cumplen AA.
- El botón primario se ve ciruela con texto blanco.
