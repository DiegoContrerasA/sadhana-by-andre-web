# Layout de la app

## Qué hace

Estructura de la zona de cursos: menú superior en escritorio y barra inferior en celular. Las secciones están vacías, salvo `/courses`, que tiene filtros (ver [`catalog.md`](./catalog.md)).

## Pantallas y rutas

`/courses`, `/my-courses`, `/favorites` y `/profile` (con `/en`), dentro de `app/[locale]/(app)/`. `/courses` usa `CoursesScreen`; las demás, `SectionScreen`.

## Detalles a tener en cuenta

- El crema (`bg-secondary`) es el fondo base y se define una sola vez en `app/[locale]/(app)/layout.tsx`. Las páginas y pantallas no definen su fondo; las tarjetas usan `bg-background` (blanco).
- Sigue la línea gráfica de la landing: cabecera `primary` con el logo blanco, menú en mayúsculas espaciadas, `SectionHeading` en dos tonos sobre fondo crema y tarjetas blancas. Es más compacto que la landing y no tiene animaciones.
- Cada enlace del menú es un `NavLink`, que se marca solo con `aria-current="page"` en su ruta y en sus subrutas. Los estilos usan esa marca. Los `href` van sin idioma: el `Link` de `next-intl` agrega `/en`.
- No hay sesión ni protección de rutas. Llevan `noindex`.

## Archivos clave

`features/app-shell/`, `app/[locale]/(app)/`. Textos en `messages/*.json` bajo `app`.

## Pruebas

Cubierto: `NavLink` (ruta actual, subrutas e idioma). Falta: E2E.
