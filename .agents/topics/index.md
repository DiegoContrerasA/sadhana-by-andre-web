# Tópicos

Documentación viva de cómo funciona cada flujo y cada capa de la app. Sirve de contexto para quien llegue al código (persona o agente) antes de tocarlo. Las **reglas** de cómo escribir código viven en [`../rules/`](../rules/orquestador.md); acá se explica **qué hace la app y por qué**.

## Flujos

Se agregan a medida que se construyen.

| Tópico | Qué cubre |
|---|---|
| [`app-shell.md`](./app-shell.md) | Layout de la zona de cursos |
| [`catalog.md`](./catalog.md) | Filtros en la URL, lista de cursos, scroll infinito y clases de cada curso |
| [`auth.md`](./auth.md) | Inicio de sesión simulado y layout compartido de auth |
| [`marketing.md`](./marketing.md) | Web pública: landing en es y en, idiomas y SEO |

## Capas

| Tópico | Qué cubre |
|---|---|
| [`ui-and-theme.md`](./ui-and-theme.md) | shadcn, tema, fuentes, campos de formulario y estado de la marca |
| [`tooling.md`](./tooling.md) | Biome, ESLint, Vitest, husky y commitlint: qué corre y cuándo |

## Cómo se escribe un tópico

Cada tópico usa estas secciones, en este orden, y omite las que no aplican:

1. **Qué hace**: una o dos frases.
2. **Pantallas y rutas**: qué pantalla se ve y en qué ruta de `src/app/`.
3. **Flujo**: pasos en el orden en que ocurren, incluidos los casos de error.
4. **Datos**: lecturas de `data/`, actions, cache tags y qué se invalida.
5. **Detalles a tener en cuenta**: decisiones no obvias, límites y casos borde.
6. **Archivos clave**: rutas relativas a `src/`.
7. **Pruebas**: qué está cubierto y qué falta, según [`testing.md`](../rules/testing.md).

Se describe el comportamiento real del código, no el deseado. Si algo es provisional, se dice.

## Cuándo se actualizan

Antes de cada commit, si el cambio altera cómo funciona un flujo o una capa, se actualiza su tópico en el mismo commit. Si el cambio crea un flujo nuevo, se crea el tópico y se agrega a las tablas de arriba. La regla completa está en [`commits.md`](../rules/commits.md#antes-de-commitear).
