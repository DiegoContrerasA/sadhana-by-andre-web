# Sadhana by Andre — web

App web de Sadhana by Andre construida con [Next.js](https://nextjs.org) 16 (App Router, Cache Components), React 19, Tailwind CSS 4 y shadcn (Base UI).

## Empezar

```bash
npm install
npm run dev
```

`npm install` también instala los hooks de git (Husky). La app queda en [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Build de producción y servidor |
| `npm run biome:check` | Formato, imports, lint y fronteras de la arquitectura (Biome, con `--write`) |
| `npm run lint` | Reglas de Next.js (ESLint) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |
| `npm test` | Pruebas unitarias en modo watch (Vitest) |
| `npm run test:run` | Pruebas unitarias una vez |
| `npm run test:coverage` | Pruebas con cobertura |

## Estructura

```
src/
├── app/         Rutas, layouts y route handlers del App Router
├── features/    Un dominio por carpeta (screens, components, data, actions, hooks, schema)
├── components/  UI compartida (ui/ = shadcn, form/ = campos de react-hook-form)
├── hooks/       Hooks sin dominio
├── i18n/        Configuración de idiomas (textos en messages/)
├── lib/         Cliente de la API, auth, utils de bajo nivel
├── constants/   Cache tags y constantes globales
├── utils/       Funciones puras
└── test/        Setup y helpers de pruebas
```

## Calidad antes de cada commit

Husky bloquea el commit si algo falla:

1. Biome sobre los archivos del commit.
2. `npm run typecheck`.
3. `npm run lint`.
4. `npm run test:run`.

El mensaje se valida con commitlint (conventional commits, por ejemplo `feat(catalog): add pose detail page`).

## Reglas del proyecto

Las reglas de arquitectura, estilo, componentes, estilos, datos, formularios, pruebas y commits viven en [`.agents/rules/`](./.agents/rules/orquestador.md). Cómo funciona cada flujo y cada capa está en [`.agents/topics/`](./.agents/topics/index.md). [`AGENTS.md`](./AGENTS.md) es el punto de entrada para los agentes de código.
