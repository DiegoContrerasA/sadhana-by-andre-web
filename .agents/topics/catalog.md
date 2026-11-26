# Catálogo

## Qué hace

Filtros de `/courses`. Todavía no hay lista de cursos.

## Flujo

1. La ruta pasa `searchParams` y la dirección base con idioma a `CoursesScreen`.
2. `UrlCourseFilters`, dentro de `<Suspense>`, los valida con `courseFiltersSchema`. Un valor inválido, repetido o demasiado largo se ignora.
3. Cada opción es un enlace que conserva los demás filtros. El buscador es un `<Form>` de Next (GET) que envía los filtros activos como campos ocultos.
4. "Limpiar filtros" vuelve a la dirección sin parámetros.

## Detalles a tener en cuenta

- No hay estado de filtros en el cliente: la URL es la fuente.
- Los valores de la URL van en inglés en ambos idiomas.
- Solo hay búsqueda y nivel. El contenido son clases de posturas, algunas con nivel; las categorías por tipo se agregarán cuando el usuario las defina. Una clase sin nivel deberá aparecer solo en "Todos los niveles".

## Archivos clave

`features/catalog/`, `app/[locale]/(app)/courses/`. Textos en `messages/*.json` bajo `catalog`.

## Pruebas

Cubierto: schema, enlaces, campos ocultos y limpiar. Falta: E2E de la búsqueda.
