# Catálogo

## Qué hace

Filtros y lista de cursos de `/courses`. Los datos son de ejemplo (`src/lib/catalog/mock-courses.json`).

## Flujo

1. La ruta pasa `searchParams` y la dirección base con idioma a `CoursesScreen`.
2. `UrlCourseCatalog`, dentro de `<Suspense>`, los valida con `courseFiltersSchema`. Un valor inválido, repetido o demasiado largo se ignora.
3. Cada opción es un enlace que conserva los demás filtros. El buscador es un `<Form>` de Next (GET) que envía los filtros activos como campos ocultos.
4. "Limpiar filtros" vuelve a la dirección sin parámetros.
5. `getCourses(locale)` devuelve el catálogo en el idioma pedido (cacheado, tags en `src/constants/cache-tags.ts`) y `filterCourses` aplica búsqueda y nivel.
6. `CourseResults` muestra el contador o el estado vacío. `CourseGrid`, componente cliente, recibe los cursos, pinta cada `CourseCard`, muestra 9 y suma 9 cuando el final se acerca (`useInfiniteReveal`) o al usar el botón. Al cambiar los filtros vuelve a 9.

## Detalles a tener en cuenta

- No hay estado de filtros en el cliente: la URL es la fuente.
- Los valores de la URL van en inglés en ambos idiomas.
- Solo hay búsqueda y nivel. El contenido son clases de posturas, algunas con nivel; las categorías por tipo se agregarán cuando el usuario las defina. Una clase sin nivel aparece solo en "Todos los niveles".
- Todas las tarjetas filtradas viajan en la respuesta aunque solo se muestren 9. Sirve hasta unos 100 cursos; con muchos más habría que paginar en el servidor.
- El DTO de la lista lleva solo lo que pinta la tarjeta. Nunca debe incluir direcciones de video.
- Las portadas están en `public/courses/` (4:5, 800×1000). Un curso sin `imageUrl` muestra un marcador. El texto va sobre el tercio inferior de la foto. A las de árbol y antebrazos se les reflejó el fondo a los lados para llegar a 4:5.
- La tarjeta tiene un único enlace que la cubre (`aria-labelledby` con el nombre). "Ir al curso" es decorativo. El detalle se revela con `group-hover` y `group-focus-within`; con `pointer-coarse` se muestra solo lo esencial.
- `/courses/[slug]` usa `getCourse`, que responde `notFound()` si el slug no existe. La respuesta llega con estado 200 porque la ruta se transmite por partes; las páginas llevan `noindex`.
- Al volver con el botón del navegador se conservan las tarjetas cargadas y el scroll. "Volver a explorar" va a `/courses` sin filtros y desde arriba.

## Archivos clave

`features/catalog/`, `app/[locale]/(app)/courses/` (lista y `[slug]/`). Textos en `messages/*.json` bajo `catalog`.

## Pruebas

Cubierto: schema, enlaces, campos ocultos, limpiar, lectura de la lista y de un curso, filtrado, duración, tarjeta y carga por tandas. Falta: E2E de la búsqueda, el scroll y la ida al detalle.
