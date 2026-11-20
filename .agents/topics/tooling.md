# Herramientas de calidad

## Qué hace

Formato, lint, tipos, pruebas y validación de commits. Todo corre en local con los mismos comandos que usa el pre-commit.

## Piezas

| Herramienta | Archivo | Qué hace |
|---|---|---|
| Biome 2 | `biome.json` | Formato (comillas dobles, sin `;`), orden de imports, lint recomendado y fronteras de la arquitectura con `noRestrictedImports` |
| ESLint | `eslint.config.mjs` | Reglas de Next.js (`eslint-config-next`: core web vitals y TypeScript) |
| TypeScript | `tsconfig.json` | `strict` + `noUncheckedIndexedAccess`, `noImplicitOverride` y `noFallthroughCasesInSwitch`; alias `@/*` → `src/*`. `npm run typecheck` corre `next typegen` antes de `tsc` para generar `PageProps` y `LayoutProps` |
| Vitest 5 | `vitest.config.mts` | `jsdom`, alias del tsconfig (`resolve.tsconfigPaths`), `src/test/setup.ts`, huso horario UTC |
| Husky | `.husky/pre-commit`, `.husky/commit-msg` | Validaciones antes de cada commit |
| lint-staged | `package.json` | Biome solo sobre los archivos del commit |
| commitlint | `commitlint.config.mjs` | Conventional commits: tipos permitidos, scope en kebab-case, subject en minúscula sin punto, encabezado de hasta 72 caracteres |

## Flujo del pre-commit

1. `npx lint-staged` → `biome check --write` sobre los archivos del commit.
2. `npm run typecheck`.
3. `npm run lint`.
4. `npm run test:run`.

Si un paso falla, el commit se cancela y el hook muestra el comando para reproducirlo. Después, `commit-msg` valida el mensaje con commitlint.

## Fronteras que aplica Biome

| En | Bloquea |
|---|---|
| `components/`, `hooks/`, `lib/`, `utils/`, `constants/` | Imports de `@/features/**` y `@/app/**`; `useRouter`, `usePathname`, `useSearchParams`, `redirect` y `permanentRedirect` de `next/navigation` |
| `features/` | Imports internos de otra feature (`@/features/x/...`, salvo `@/features/x/server`), imports de `@/app/**`; `useRouter`, `usePathname` y `useSearchParams` |

## Detalles a tener en cuenta

- No se usa `@vitejs/plugin-react`: su cadena de dependencias opcionales pedía una RC de Babel 8 que choca con la de shadcn. Vite 8 transforma TSX solo, con `jsx: react-jsx` del tsconfig. Si hiciera falta (por ejemplo, para el React Compiler en pruebas), se agrega cuando se resuelva el conflicto.
- `@types/node` está en `^22` porque Vitest 5 lo exige; coincide con el runtime (Node 22).
- `.agents/skills` y `.claude/skills` vienen del registro de skills (`skills-lock.json`); Biome no los revisa porque solo incluye `src/` y los archivos de configuración de la raíz.

## Archivos clave

`biome.json`, `eslint.config.mjs`, `vitest.config.mts`, `commitlint.config.mjs`, `.husky/`, `src/test/setup.ts`.
