# Fichas técnicas de features

Cada ficha describe qué se construye, cómo y con qué criterios se da por terminado. Se escribe **antes** del código y se marca al terminar.

## Estados

| Marca | Significado |
|---|---|
| ⬜ | Pendiente |
| 🟨 | En progreso |
| ✅ | Completo (código + pruebas + tópico actualizado + revisado por el usuario) |

Las tareas dentro de cada ficha son checklists (`- [ ]` / `- [x]`). Una ficha pasa a ✅ solo cuando todas sus tareas están marcadas.

## Flujo de trabajo

1. Claude escribe o ajusta la ficha y se revisa.
2. Claude implementa la ficha y entrega el código.
3. El usuario revisa y prueba; se itera.
4. Con la aprobación del usuario se marcan las tareas y la ficha, y se actualiza el tablero de abajo.

## Tablero

| # | Ficha | Fase | Estado |
|---|---|---|---|
| 00 | [Referencias y decisiones](./00-references-and-decisions.md) | — | ✅ |
| 01 | [Marca y tema](./01-brand-and-theme.md) | 1 | 🟨 |
| 02 | [Componentes base](./02-ui-components.md) | 1 | 🟨 |
| 03 | [Auth: base (Better Auth + mock)](./03-auth-foundation.md) | 2 | ⬜ |
| 04 | [Auth: iniciar sesión](./04-auth-login.md) | 2 | 🟨 |
| 05 | [Auth: crear cuenta](./05-auth-register.md) | 3 | ⬜ |
| 06 | [Auth: recuperar contraseña](./06-auth-password-recovery.md) | 4 | ⬜ |
| 07 | [Calidad: commits, hooks, lint y pruebas](./07-quality-tooling.md) | transversal | 🟨 |
| 08 | [Web pública: migración desde Astro](./08-public-site-migration.md) | web pública | 🟨 |

## Fases

| Fase | Objetivo | Fichas | Salida revisable |
|---|---|---|---|
| 1 | Marca + librería de componentes reutilizables | 01, 02 | Página `/dev/components` con todos los componentes y estados |
| 2 | Base de auth y login con datos mock | 03, 04 | Login funcional con usuarios del JSON y sesión por cookie |
| 3 | Crear cuenta | 05 | Registro que persiste en el mock y abre sesión |
| 4 | Recuperar contraseña | 06 | Flujo solicitar enlace → restablecer, con "bandeja" mock |

Fuera de alcance por ahora: catálogo, reproductor de video, pagos, panel de admin, i18n, modo oscuro, app Expo. Ver [00](./00-references-and-decisions.md#fuera-de-alcance).
