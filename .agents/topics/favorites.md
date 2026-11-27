# Favoritos

## Qué hace

Permite marcar cursos con un corazón y verlos en `/favorites`. Es independiente de la inscripción: no da acceso a las clases. La lista se guarda en el navegador.

## Flujo

1. El corazón (`FavoriteButton`) está en las tarjetas de Explorar, Mis cursos y Favoritos, y junto al nombre del curso en la pantalla de clase (`SavedFavoriteButton`, dentro de `<Suspense>`).
2. En la tarjeta va por fuera del enlace, encima de él (`action` de `CourseCard`): tocarlo no abre el curso.
3. `useFavorite` cambia el corazón de inmediato (`useOptimistic`) y llama a `addFavorite` o `removeFavorite`. Si falla, vuelve atrás y muestra "No se guardó".
4. La action valida el slug y escribe la cookie. Next vuelve a pintar la página sin perder los cursos cargados ni el scroll.
5. `/favorites` usa `FavoritesScreen`, de `progress`, con el favorito más reciente primero. Quitar el corazón saca la tarjeta al instante, sin deshacer.

## Detalles a tener en cuenta

- La cookie `sadhana_favorites` sigue las mismas reglas que la de inscripción (ver [`progress.md`](./progress.md)): `parseSlugList`, máximo 100 y opciones en `constants/preference-cookie.ts`.
- `favorites` no depende de `catalog` para no crear un ciclo: las actions validan el formato del slug, no que el curso exista. Un slug inexistente no se muestra.
- No hay sesión: las actions no autentican y la lista no pasa a otro dispositivo.
- El nombre accesible es "Favorito: {curso}" y el estado va en `aria-pressed`.
- `/courses` lee la cookie junto con los filtros, dentro de su `<Suspense>`. La lectura del catálogo sigue en caché.

## Archivos clave

`features/favorites/`, `features/progress/` (colecciones), `app/[locale]/(app)/favorites/`. Textos en `messages/*.json` bajo `favorites`.

## Pruebas

Cubierto: botón (cambio inmediato, quitar y error), las dos actions, la lista de slugs, el orden de la colección y los favoritos marcados en la cuadrícula. Falta: E2E del recorrido hasta "Favoritos".
