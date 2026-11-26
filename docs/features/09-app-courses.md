# 09 · App de cursos

Estado: 🟨 · Se construye por fases; cada una se revisa y se cierra antes de seguir.

La organización sigue la referencia del usuario (menú superior, título, filtros y tarjetas en cuadrícula) y la identidad visual es la de la landing.

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Layout: menú superior, barra inferior en celular y secciones vacías | 🟨 En revisión |
| 2 | Filtros y búsqueda | ⬜ |
| 3 | Tarjetas y lista de cursos | ⬜ |
| Por definir | Detalle del curso, clase de muestra, Mis cursos, Favoritos, Perfil | ⬜ |

## Fase 1 · Layout

| Sección | Ruta |
|---|---|
| Explorar | `/courses` |
| Mis cursos | `/my-courses` |
| Favoritos | `/favorites` |
| Perfil | `/profile` |

- Escritorio (desde `md`): menú superior fijo con la marca, tres secciones y el acceso a Perfil.
- Celular: cabecera con la marca y barra inferior con las cuatro secciones.
- Todavía no hay sesión: las rutas son públicas, llevan `noindex` y la landing no las enlaza.

## Ideas sin decidir

Progreso y racha, "continuar viendo", clases en vivo con calendario, certificados, notificaciones, plan y pagos (dentro de Perfil) y ayuda.
