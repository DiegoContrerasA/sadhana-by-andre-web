# 07 · Calidad: commits, hooks, lint y pruebas

Estado: 🟨 · Transversal (se usa desde la fase 1)

## Hallazgo

El repo ya trae esta base, copiada del setup de `truffa-v1-beta` (misma estructura de hooks y reglas de commitlint). Esta ficha la documenta, cierra los huecos y deja claro cómo se valida.

## Qué existe hoy

| Pieza | Archivo | Qué hace |
|---|---|---|
| Husky | `.husky/pre-commit`, `.husky/commit-msg` | Corre las validaciones y bloquea el commit si alguna falla |
| Pre-commit | `.husky/pre-commit` | Biome sobre los archivos del commit (`lint-staged`) → `npm run typecheck` → `npm run lint` → `npm run test:run` |
| Commit-msg | `.husky/commit-msg` + `commitlint.config.mjs` | Valida el formato del mensaje |
| Biome | `biome.json` | Formato, imports, lint y fronteras de arquitectura |
| ESLint | `eslint.config.mjs` | Reglas de Next.js |
| Vitest | `vitest.config.mts` | Pruebas unitarias en `jsdom`, tests junto al código |
| Testing Library | `src/test/setup.ts` | Matchers de `jest-dom` y limpieza del DOM |

## Formato de commit

```
<type>(<scope>): <descripción>
```

- Tipos permitidos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `revert`.
- `scope` opcional, en kebab-case: `theme`, `login`, `sign-in`.
- Descripción en minúscula, en imperativo, sin punto final, encabezado de máximo 72 caracteres.
- **Sin `Co-Authored-By` ni firmas de agentes.**
- **Sin cuerpo por defecto**: commit directo. Cuerpo solo si el encabezado no explica el porqué (máximo tres viñetas).

Ejemplos:

```
chore(theme): apply brand palette and fonts
feat(login): add sign in form
fix(login): keep typed email after failed attempt
docs(features): add feature specs
```

> El tipo es `feat`, no `feature`: el estándar de commitlint (`config-conventional`) no acepta `feature`. Las **ramas** sí pueden llamarse `feature/<slug>`.

## Huecos a cerrar

- [ ] Probar el hook de mensaje: un mensaje inválido (`feature(login): x`) debe fallar y uno válido debe pasar
- [ ] Probar el pre-commit completo con un commit real
- [ ] Verificar que los hooks se instalan con `npm install` (script `prepare`)
- [ ] Decidir si se agrega un job de CI con los mismos cuatro comandos (`biome:check`, `typecheck`, `lint`, `test:run`)
- [ ] Decidir si se agrega un umbral de cobertura (las reglas dicen no hacerlo antes de terminar la fase 3 de pruebas)
- [ ] Playwright para E2E de las pantallas async (pendiente en `orquestador.md`)

## Pruebas unitarias: política

Definida en `.agents/rules/testing.md`: el test vive junto al archivo, se prueba comportamiento observable y solo se mockea la frontera. Cada ficha de feature incluye su lista de pruebas.

Línea base actual: 2 archivos de test, 4 pruebas en verde.

## Tareas

- [x] Revisar la configuración existente y compararla con truffa
- [x] Quitar la atribución de agentes de las reglas de commit (`commits.md`)
- [ ] Probar `commit-msg` y `pre-commit` (se hace con el primer commit, que es el de marca)
- [ ] Decidir CI y cobertura
- [ ] Revisión del usuario

## Criterios de aceptación

- Un commit con mensaje inválido o con cualquier validación fallida se bloquea.
- Un commit válido pasa con los cuatro pasos en verde.
- Ningún commit lleva líneas de co-autor.
