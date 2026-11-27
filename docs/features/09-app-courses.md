# 09 · App de cursos

Estado: 🟨 · Se construye por fases; cada una se revisa y se cierra antes de seguir.

La organización sigue la referencia del usuario (menú superior, título, filtros y tarjetas en cuadrícula) y la identidad visual es la de la landing.

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Layout: menú superior, barra inferior en celular y secciones vacías | ✅ |
| 2 | Filtros y búsqueda | ✅ |
| 3 | Tarjetas y lista de cursos | ✅ |
| 4 | Curso y sus clases | ✅ |
| 5 | Inscripción y Mis cursos | ✅ |
| 6 | Favoritos | ✅ |
| 7 | Perfil | ✅ |
| Por definir | Pago y suscripción | ⬜ |

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
- Toda la tarjeta es un solo enlace a `/courses/[slug]`; el corazón de favorito va aparte, en la esquina.
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

## Fase 5 · Inscripción y Mis cursos

- Sin inscribirse se ve completa solo la primera clase, marcada "Gratis". Las demás muestran título, descripción, duración y candado, y en lugar del video está "Inscríbete para ver esta clase".
- Al inscribirse se abren todas las clases en la misma pantalla.
- En la pantalla del curso, encima de "Contenido": botón "Inscribirme". Ya inscrito muestra "Ver mis cursos" y "Cancelar inscripción".
- "Mis cursos" muestra las mismas tarjetas del catálogo, la inscripción más reciente primero. Sin cursos, invita a explorar.
- Mientras no haya cuentas, la lista se guarda en una cookie del navegador: no se comparte entre dispositivos. Con cuentas reales se guardará en la API.
- Por ahora inscribirse no cuesta ni pide cuenta. Falta decidir si el acceso será gratis con cuenta o pagado.
- El bloqueo es de prueba: antes de cobrar se necesitan cuentas y un servicio de video que controle el acceso.
- Queda para después: continuar en la última clase vista y ver el avance.

## Fase 6 · Favoritos

- Corazón en las tarjetas de Explorar, Mis cursos y Favoritos, y en la pantalla de la clase. Se puede marcar sin abrir el curso y sin inscribirse.
- "Favoritos" muestra los cursos guardados, el más reciente primero. Sin favoritos, invita a explorar.
- Favorito significa "guardado para después"; inscribirse es lo que abre las clases.
- La lista se guarda en el navegador hasta que haya cuentas.

## Fase 7 · Perfil

- Resumen con iniciales, nombre, correo y accesos con el número de cursos y favoritos.
- Datos personales editables: nombre, apellido y teléfono. El correo se muestra sin editar.
- Idioma (español o inglés), cambiar contraseña y ayuda por WhatsApp.
- La persona es de ejemplo y los cambios se guardan en el navegador.
- Con cuentas reales se agregan: cerrar sesión, eliminar la cuenta y cambiar el correo con verificación. Suscripción, medio de pago e historial de pagos quedan pendientes por decisión del usuario.

## Ideas sin decidir

Progreso y racha, "continuar viendo", clases en vivo con calendario, certificados, notificaciones, plan y pagos (dentro de Perfil) y ayuda.
