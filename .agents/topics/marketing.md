# Web pública

## Qué hace

Landing de sadhanabyandre.com en español e inglés, estática. Migrada desde el sitio en Astro (`DiegoContrerasA/sadhanabyandre`, commit `f67edde`).

## Pantallas y rutas

| URL | Ruta en `src/app/` | Pantalla |
|---|---|---|
| `/` | `[locale]/(marketing)/page.tsx` | `HomeScreen` |
| `/en` | la misma | `HomeScreen` |
| desconocida | `[locale]/[...rest]` y `[locale]/not-found.tsx` | `NotFoundScreen` |

## Flujo

1. `proxy.ts` (`next-intl`) sirve `/` como el idioma `es` sin prefijo, redirige `/es` a `/` y no detecta el idioma del navegador.
2. `i18n/request.ts` lee el idioma con `next/root-params` y carga `messages/{idioma}.json`.
3. `HomeScreen` pide los textos con `getMessages()` y los pasa por props a cada sección.

## Datos

No hay API. Los textos viven en `messages/`, las fotos en `features/marketing/assets/` y el video en `public/videos/`. `getCurrentYear` usa `use cache` con vida `days` para el año del pie.

## Detalles a tener en cuenta

- Solo la portada tiene animación de entrada (`animate-hero-enter`, desde `md` y desactivada con `motion-reduce`). No hay animaciones de aparición al hacer scroll.
- Interactivos en cliente: menú móvil (`Sheet`), video, galería y preguntas frecuentes (`Accordion`). El visor `yet-another-react-lightbox` se carga al abrir la primera foto.
- SEO: metadata en `utils/home-metadata.ts`, JSON-LD en `utils/structured-data.ts`, y `app/sitemap.ts`, `app/robots.ts` y `app/manifest.ts`. `/sitemap-index.xml` (URL del sitio anterior) se reescribe a `/sitemap.xml`.
- `<html lang>` y `jobTitle` salen de `meta` en `messages/`. Las palabras clave están en español en ambos idiomas, como en el sitio original.
- Las alternativas de idioma (`es`, `en`, `x-default`) deben coincidir entre la metadata y el sitemap.
- El menú fijo es transparente sobre la portada y, tras 100px de scroll, toma el color `primary` (el mismo del menú móvil). Lo controlan `NavBar` y `useIsScrolled`.
- La sesión de Kobido dura 120 min; el dato aparece en `kobido.ctaSub` y en `faq` de cada idioma.
- El video es H.264 540×960 (el original era HEVC de 43 MB). No tiene subtítulos.

- El `h1` es la línea visible bajo el logo (`hero.headline`).
- `public/googlef40c3f58b44f2e02.html` verifica el sitio en Google Search Console; no se borra. El mismo archivo está publicado desde el repo del sitio en Astro.
- Al publicar este sitio se envía `/sitemap.xml` en Search Console.

## Archivos clave

`features/marketing/`, `i18n/`, `proxy.ts`, `app/[locale]/`, `constants/site.ts`.

## Pruebas

Cubierto: paridad de claves entre idiomas, metadata, esquema de preguntas, escape del JSON-LD, URL de WhatsApp, selector de idioma, menú móvil, barra al hacer scroll, video y sitemap. Falta: galería, y flujos E2E de la pantalla.
