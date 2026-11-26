# 09 · App de cursos

Estado: 🟨 · Se construye por fases; cada una se revisa y se cierra antes de seguir.

La organización sigue la referencia del usuario (menú superior, título, filtros y tarjetas en cuadrícula) y la identidad visual es la de la landing.

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Layout: menú superior, barra inferior en celular y secciones vacías | ✅ |
| 2 | Filtros y búsqueda | 🟨 En revisión |
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

## Fase 2 · Filtros

- La idea de `/courses` es aprender y perfeccionar posturas: el título es "Perfecciona tu postura". La ruta y el menú ("Explorar", "Mis cursos") no cambian por ahora.
- Buscador y nivel (`beginner`, `intermediate`, `advanced`). El contenido son clases de posturas y no todas tendrán nivel. No hay filtro por tipo hasta definir categorías de posturas.
- Los filtros viven en la URL (`/courses?level=beginner&q=cadera`).
- La búsqueda se aplica al enviar, no mientras se escribe.
- Todavía no filtran nada: la lista llega en la fase 3. Quedan sin decidir los filtros por acceso y duración.

## Ideas sin decidir

Progreso y racha, "continuar viendo", clases en vivo con calendario, certificados, notificaciones, plan y pagos (dentro de Perfil) y ayuda.
