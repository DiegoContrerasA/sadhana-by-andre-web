# Catálogo

## Qué hace

Filtros y lista de cursos de `/courses`, y las clases de cada curso. Un curso es una postura: tiene una clase que la explica y otras con un enfoque cada una. Los datos y el video son de ejemplo (`src/lib/catalog/mock-courses.json`, `public/videos/sample-lesson.*`).

## Flujo

1. La ruta pasa `searchParams` y la dirección base con idioma a `CoursesScreen`.
2. `UrlCourseCatalog`, dentro de `<Suspense>`, los valida con `courseFiltersSchema`. Un valor inválido, repetido o demasiado largo se ignora.
3. Cada opción es un enlace que conserva los demás filtros. El buscador es un `<Form>` de Next (GET) que envía los filtros activos como campos ocultos.
4. "Limpiar filtros" vuelve a la dirección sin parámetros.
5. `getCourses(locale)` devuelve el catálogo en el idioma pedido (cacheado, tags en `src/constants/cache-tags.ts`) y `filterCourses` aplica búsqueda y nivel.
6. `CourseResults` muestra el contador o el estado vacío. `CourseGrid`, componente cliente, recibe los cursos, pinta cada `CourseCard`, muestra 9 y suma 9 cuando el final se acerca (`useInfiniteReveal`) o al usar el botón. Al cambiar los filtros vuelve a 9.

## Clases de un curso

1. `/courses/[slug]` muestra la primera clase. Las demás están en `/courses/[slug]/[lesson]`. La dirección con el slug de la primera clase no existe, para no duplicar la página.
2. Las dos rutas pasan `params` sin esperarlo a `CourseLessonScreen`. `UrlCourseLesson`, dentro de `<Suspense>` con `CourseLessonSkeleton`, lo lee y pide `getLesson` (curso, clase, anterior y siguiente) y `getLessonVideo`.
3. En orden: ruta de navegación, video, anterior y siguiente, y datos de la clase. La lista de clases va a la derecha desde `lg` (fija al bajar). Debajo de la clase va la descripción general de la postura (`CourseOverview`), igual en todas las clases del curso; en pantallas menores la lista queda antes de esa descripción.
4. El video es el reproductor nativo, sin reproducción automática. Como Next oculta la pantalla anterior en vez de desmontarla, `usePauseOnHide` lo pausa al salir. Al volver con el botón del navegador queda en el mismo segundo.
5. Un curso o una clase que no existe responde `notFound()`. La respuesta puede llegar con estado 200 porque la ruta se transmite por partes; las páginas llevan `noindex`.

## Detalles a tener en cuenta

- Leer `params` o `searchParams` fuera de `<Suspense>` no rompe el build, pero `next dev` lo marca porque la navegación deja de ser inmediata. Después de crear una ruta, hay que revisarla también en desarrollo.
- No hay estado de filtros en el cliente: la URL es la fuente.
- Los valores de la URL van en inglés en ambos idiomas.
- Solo hay búsqueda y nivel. El contenido son clases de posturas, algunas con nivel; las categorías por tipo se agregarán cuando el usuario las defina. Una clase sin nivel aparece solo en "Todos los niveles".
- Todas las tarjetas filtradas viajan en la respuesta aunque solo se muestren 9. Sirve hasta unos 100 cursos; con muchos más habría que paginar en el servidor.
- El DTO de la lista lleva solo lo que pinta la tarjeta. Nunca debe incluir direcciones de video.
- Las portadas están en `public/courses/` (4:5, 800×1000). Un curso sin `imageUrl` muestra un marcador. El texto va sobre el tercio inferior de la foto. A las de árbol y antebrazos se les reflejó el fondo a los lados para llegar a 4:5.
- La tarjeta tiene un único enlace que la cubre (`aria-labelledby` con el nombre). "Ir al curso" es decorativo. El detalle se revela con `group-hover` y `group-focus-within`; con `pointer-coarse` se muestra solo lo esencial.
- La descripción general es un único texto de ejemplo para todos los cursos (`src/lib/catalog/mock-course-overview.json`).
- La duración de un curso es la suma de sus clases (`toCourse`). La lista no lleva las clases.
- `getLessonVideo` está separado de los datos del curso y no usa caché. Hoy devuelve el mismo video para todas las clases; con videos reales de pago debe validar el acceso en el servidor.
- Al volver desde un curso con el botón del navegador, `/courses` conserva las tarjetas cargadas y el scroll. "Explorar", en la ruta de navegación, va a `/courses` sin filtros y desde arriba.

## Archivos clave

`features/catalog/`, `app/[locale]/(app)/courses/` (lista, `[slug]/` y `[slug]/[lesson]/`). Textos en `messages/*.json` bajo `catalog`.

## Pruebas

Cubierto: schema, enlaces, campos ocultos, limpiar, lectura de la lista, de un curso y de una clase, filtrado, duración, tarjeta, carga por tandas, lista de clases, anterior y siguiente, y la pausa del video al ocultarse. Falta: E2E de la búsqueda, el scroll y la navegación entre clases.
