# Sadhana by Andre — web

App web de Sadhana by Andre (Next.js 16 App Router, server-first). Prioriza Server Components, caché explícita y el menor JavaScript posible en el cliente.

## Reglas del repo

Antes de escribir o editar código, lee **[`.agents/rules/orquestador.md`](./.agents/rules/orquestador.md)**. Es el índice de todas las reglas del proyecto (flujo de trabajo, arquitectura, estilo de código, componentes, estilos, datos, formularios, pruebas, commits y templates) e indica cuál leer y qué skill cargar según lo que vayas a hacer.

Cinco reglas aplican siempre:

- No dejes comentarios en el código: ni para explicar qué hace, ni para narrar qué cambiaste.
- Respeta el tamaño máximo de cada tipo de archivo definido en [`.agents/rules/code-style.md`](./.agents/rules/code-style.md).
- Completa todo cambio o funcionalidad que te pidan, en todas sus capas, sin dejarlo a medias ([`orquestador.md`](./.agents/rules/orquestador.md#completa-lo-que-te-piden)).
- Antes de tocar un flujo o una capa, lee su tópico en [`.agents/topics/`](./.agents/topics/index.md): explica cómo funciona hoy.
- Antes de commitear, actualiza los tópicos que el cambio afecte y sugiere actualizar la documentación y las pruebas unitarias; espera la respuesta del usuario sobre estas dos ([`commits.md`](./.agents/rules/commits.md#antes-de-commitear)).

## Comandos

```bash
npm run dev            # servidor de desarrollo
npm run biome:check    # formato, imports, lint y fronteras de la arquitectura (Biome, con --write)
npm run lint           # reglas de Next.js (ESLint)
npm run typecheck      # next typegen + tsc --noEmit
npm run test:run       # pruebas unitarias (Vitest)
npm test               # pruebas en modo watch
npx shadcn@latest add <componente>   # agregar una primitiva de UI
```

Corre Biome, lint, typecheck y pruebas antes de dar una tarea por terminada. El pre-commit corre las mismas validaciones y bloquea el commit si alguna falla; nunca lo saltes con `--no-verify`.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
