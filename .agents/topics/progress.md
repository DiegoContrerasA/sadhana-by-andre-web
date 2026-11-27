# Mis cursos

## Qué hace

Permite inscribirse en un curso para abrir todas sus clases y tenerlo en `/my-courses`. Sin inscribirse solo se ve la primera. Todavía no hay cuentas: la lista se guarda en el navegador.

## Flujo

1. Las rutas de curso y clase pasan `access={createCourseAccess(…)}` a `CourseLessonScreen`. Así `catalog` no depende de `progress`.
2. `CourseEnrollment` lee la lista dentro de su propio `<Suspense>`. `EnrollmentPanel` muestra "Inscribirme" (`EnrollButton`) o, si ya está, "Ver mis cursos" y "Cancelar inscripción" (`EnrolledActions`). Una clase bloqueada repite el botón sobre el video (`UnlockCourseButton`).
3. `enrollCourse` y `unenrollCourse` validan el slug, y al inscribir que el curso exista. Escriben la cookie y Next vuelve a pintar la página actual: el video y la lista cambian ahí mismo, también al volver atrás.
4. `/my-courses` usa `MyCoursesScreen`. `getEnrolledCourses` cruza la cookie con el catálogo y `CourseCollection` (compartida con Favoritos) muestra las tarjetas, la inscripción más reciente primero. Sin cursos, invita a explorar.

## Detalles a tener en cuenta

- La cookie `sadhana_my_courses` guarda slugs separados por coma: `httpOnly`, `sameSite=lax`, un año. No se marca `secure` y no guarda datos personales.
- El usuario puede editar la cookie: `parseSlugList` (`src/utils/`) descarta lo inválido y repetido y lee máximo 100. Un slug que ya no existe no se muestra.
- La lista es por navegador: no pasa a otro dispositivo y se pierde al borrar las cookies. No depende de iniciar sesión.
- Las actions no autentican porque no hay sesión. Con cuentas reales deben exigirla y guardar en la API.
- El bloqueo se decide en el servidor, pero no protege contenido: la cookie se puede editar y el video de prueba es un archivo público. No sirve como control de pago.
- Cancelar la inscripción vuelve a bloquear las clases.
- La lectura no usa caché. No se guarda en qué clase quedó la persona ni qué clases vio.
- La cancelación se hace desde la pantalla del curso y no pide confirmación.

## Archivos clave

`features/progress/`, `app/[locale]/(app)/my-courses/`. Textos en `messages/*.json` bajo `myCourses`.

## Pruebas

Cubierto: lectura de la cookie, las dos actions con el orden de la lista, y el panel (inscribir, cancelar y error). Falta: E2E del recorrido hasta "Mis cursos".
