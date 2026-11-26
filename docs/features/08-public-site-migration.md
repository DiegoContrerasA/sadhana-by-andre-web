# 08 · Web pública: migración desde Astro

Estado: 🟨 · Implementado, en revisión

## Objetivo

Pasar a este repo la landing actual de `sadhanabyandre.com` (Astro, estática) con el mismo contenido y diseño, sin perder SEO, y cambiar las animaciones de scroll. La sección de la app en `/` y la página `/app` son una etapa posterior con su propia ficha.

## Origen

Repo `DiegoContrerasA/sadhanabyandre`, commit `f67edde`.

## Rutas

| URL actual | URL nueva |
|---|---|
| `/` | `/` (español) |
| `/en/` | `/en` (inglés) |
| 404 | `not-found` |

Van en el grupo `(marketing)` y se prerenderizan. El código vive en `src/features/marketing/`. Se conservan las anclas `#sobre-mi`, `#servicios`, `#kobido`, `#horarios` y `#faq`.

## Secciones, en orden

| # | Componente de origen | Interactividad |
|---|---|---|
| 1 | `Hero` (menú, idioma, estadísticas) | Menú móvil |
| 2 | `AboutMe` | — |
| 3 | `Positions` | — |
| 4 | `Schedule` | Enlaces a WhatsApp |
| 5 | `Services` | Imagen fija en escritorio |
| 6 | `CTAWhatsApp` | Enlace a WhatsApp |
| 7 | `YogaFacial` | Video con reproducir y pausar |
| 8 | `Kobido` | Calendly y WhatsApp |
| 9 | `Events` | — |
| 10 | `GallerySection` (29 fotos) | Visor ampliado (PhotoSwipe) |
| 11 | `FAQ` | Acordeón |
| 12 | `Footer` | Redes sociales |

## SEO que se debe conservar

- Título, descripción y palabras clave por idioma.
- `canonical`, `hreflang` (`es`, `en`, `x-default`), Open Graph y Twitter Card.
- JSON-LD: `LocalBusiness`, `Person`, `WebSite` y `FAQPage`.
- Sitemap y `robots.txt`. El sitemap actual es `/sitemap-index.xml`; el de Next será `/sitemap.xml`, así que `robots.txt` y Search Console deben apuntar al nuevo.
- Favicons y `site.webmanifest`.

## Animaciones

Hoy cada título, párrafo y beneficio aparece por separado, con retrasos de hasta 600 ms o más. La opacidad dura 0,5 s y el desplazamiento 0,3 s. El contenido queda invisible si no corre el JavaScript. Eventos, galería, llamada a la acción y pie no se animan.

Propuesta: **no portar ese sistema**. La migración se entrega sin animaciones de scroll. Después, viendo la página, se decide si se agrega una sola aparición suave por sección, sin escalonado, con el contenido visible sin JavaScript y con `motion-reduce:`. Se mantienen las transiciones de hover, menú y acordeón.

## Archivos pesados

| Archivo | Peso o tamaño | Acción propuesta |
|---|---|---|
| `facial.mp4` | 43 MB | Comprimir y agregar póster |
| `og.png` | 3,5 MB, 2868×1462 (declarado 1200×630) | Exportar a 1200×630 |
| `kobido.png` | 1,8 MB | Servir con `next/image` |

Las fotos usan `next/image`.

## Adaptaciones a las reglas del repo

- Los colores sueltos (`text-white`, `bg-black`, `zinc-*`) pasan a tokens semánticos; hacen falta tokens para texto sobre foto y para el pie oscuro.
- El acordeón y el menú móvil usan primitivas accesibles en lugar de scripts sobre el DOM.
- Los componentes de más de 150 líneas se dividen.
- La página `/` actual (botón "Empezar") y su prueba se reemplazan.

## Decisiones

| Tema | Decisión |
|---|---|
| Idiomas | `next-intl` con `es` y `en` |
| Visor de galería | `yet-another-react-lightbox` (hecho para React, con zoom) en lugar de `photoswipe` |
| Animaciones | Sin animaciones de scroll; se conserva la entrada de la portada |
| Textos | Se copian del sitio anterior, salvo las correcciones confirmadas: Kobido dura 120 min |

## Diferencias con el sitio anterior

- Las URLs desconocidas responden 404 con una página propia (antes redirigían a `/`).
- Eventos, pie y textos pequeños usan colores con más contraste.
- La portada suma un título visible como `h1`: “Yoga en Envigado con Andre” (y su versión en inglés).
- La descripción para buscadores es más corta y ya no menciona “+500 alumnas”.
- Conserva el archivo de verificación de Google Search Console en `public/`.

## Tareas

- [x] Resolver las decisiones abiertas
- [x] Copiar y optimizar imágenes, video e íconos
- [x] Textos en `es` y `en`, y rutas
- [x] Secciones 1 a 12
- [x] Metadata, JSON-LD, sitemap y robots
- [x] Pruebas y tópico actualizado
- [ ] Comparar con el sitio actual en celular y escritorio
- [ ] Revisión del usuario

## Criterios de aceptación

- `/` y `/en` muestran las mismas secciones y textos que el sitio actual (salvo correcciones confirmadas).
- Todos los enlaces de WhatsApp, Calendly y redes funcionan.
- El contenido se ve sin depender de animaciones.
- Pasan `biome:check`, `typecheck`, `lint`, `test:run` y `build`.
- El dominio no se cambia hasta que el usuario apruebe la comparación.
