# 09 · App de cursos

Estado: 🟨 · Se construye por fases; cada una se revisa y se cierra antes de seguir.

La organización sigue la referencia del usuario (menú superior, título, filtros y tarjetas en cuadrícula) y la identidad visual es la de la landing.

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Layout: menú superior, barra inferior en celular y secciones vacías | ✅ |
| 2 | Filtros y búsqueda | ✅ |
| 3 | Tarjetas y lista de cursos | 🟨 En revisión |
| 4 | Curso y sus clases | 🟨 En revisión |
| Por definir | Clase de muestra y pago, Mis cursos, Favoritos, Perfil | ⬜ |

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
- Quedan sin decidir los filtros por acceso y duración.

## Fase 3 · Tarjetas y lista

- Tarjeta: la foto (4:5) ocupa todo. En reposo muestra nivel (si lo tiene) y nombre.
- Al pasar el cursor o enfocar con teclado aparecen sánscrito, resumen (si la tarjeta es ancha), duración e "Ir al curso".
- En pantallas táctiles no hay hover: se ven nivel, nombre y duración, y al tocar se abre el curso.
- Cuadrícula de 2 columnas en celular y 3 desde `md`.
- Scroll infinito de 9 en 9 (3 filas de 3 en escritorio), con el botón "Ver más posturas" como alternativa. Se esperan máximo 100 cursos: la lista filtrada llega completa del servidor y el navegador la va mostrando, sin más peticiones.
- La búsqueda ignora tildes y mayúsculas, y mira el nombre y el sánscrito.
- Toda la tarjeta es un solo enlace a `/courses/[slug]`. No hay botón de favorito todavía.
- Datos de ejemplo: 27 posturas, 8 con foto y 19 con un marcador. Nombres, textos, niveles y duraciones deben ser revisados por Andre.

## Fase 4 · Curso y clases

- Cada curso es una postura: la primera clase la explica y las demás tienen un enfoque propio, con título, duración y descripción.
- Al entrar a un curso se abre la primera clase. Cada una de las demás tiene su dirección: `/courses/tree/foundation`.
- Escritorio: video a la izquierda y lista "Contenido" a la derecha, con la clase actual resaltada. En pantallas menores la lista va después de la clase y antes de la descripción general.
- Ruta de navegación (`Explorar / Árbol / La postura`), "Anterior" y "Siguiente clase" bajo el video, y la descripción de la clase.
- Descripción general de la postura debajo de la clase: texto y listas (qué se trabaja, qué se necesita y qué tener en cuenta). Por ahora es el mismo texto de ejemplo en todos los cursos, para evaluar cómo se ve con mucha información.
- Sin reproducción automática. El video se pausa al cambiar de pantalla.
- La referencia fue la pantalla de clase de midu.dev. Quedan para después: video flotante al bajar, clases vistas y progreso, candados y precio.
- Todo el contenido es de ejemplo: los nombres de las clases ("La base", "Alineación", "Profundizar"), sus descripciones, la cantidad de clases y un mismo video corto sin sonido.
- Falta decidir dónde se alojan los videos reales. Si son de pago, el servicio debe controlar quién puede verlos.
- Los videos reales necesitan sus propios subtítulos.

## Ideas sin decidir

Progreso y racha, "continuar viendo", clases en vivo con calendario, certificados, notificaciones, plan y pagos (dentro de Perfil) y ayuda.
