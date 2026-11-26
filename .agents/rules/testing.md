# Pruebas

Pruebas unitarias con **Vitest** (entorno `jsdom`) y **Testing Library** (`@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`). Se corren con `npm test` (modo watch) o `npm run test:run`, y también en el pre-commit ([`commits.md`](./commits.md#hooks)), que bloquea el commit si alguna falla.

## Dónde viven

- El test va junto al archivo que prueba, con el mismo nombre y sufijo `.test.ts` o `.test.tsx`: `format-duration.ts` → `format-duration.test.ts`.
- Dentro de `src/app/` también se pueden colocar tests: Next solo toma como rutas los archivos especiales (`page`, `route`, `layout`...).
- Los helpers compartidos (mocks, wrappers, factories) viven en `src/test/`.
- `src/test/setup.ts` registra los matchers de `jest-dom` y limpia el DOM después de cada test.
- Un archivo de test por archivo probado. Aplican las reglas de [`code-style.md`](./code-style.md): sin comentarios, sin `any`, kebab-case.

## Cómo se escribe

- `describe` por unidad, `it` por comportamiento, con el nombre en inglés describiendo el resultado: `it("shows the schema error and does not submit when invalid")`.
- Se importan `describe`, `it`, `expect` y `vi` de `vitest` (no hay globales).
- Se prueba comportamiento observable, no implementación. En componentes se consulta como lo haría el usuario: `getByRole`, `getByLabelText`, `getByText`.
- Las interacciones se hacen con `userEvent`, no con `fireEvent`.
- Los datos de prueba salen de factories en `src/test/factories/`, tipadas con el contrato de la API.
- La fecha actual se fija con `vi.useFakeTimers().setSystemTime(...)`; un test nunca depende de la hora real. El huso horario de las pruebas es UTC (`vitest.config.mts`).
- Solo se mockea la frontera: `@/lib/api-client`, `next/cache`, `next/navigation`, `next/headers`, las Server Actions vistas desde un componente cliente (en la app real son una llamada al servidor) y las imágenes importadas, que en Vitest no traen tamaño. La lógica propia no se mockea. La action se prueba aparte, sin mockearla.
- Un test que falla no se borra ni se salta (`it.skip`) para poder commitear. Un comportamiento que se sabe incorrecto se deja como `it.fails(...)` y se anota en el tópico del flujo.
- Un test no puede dejar `console.error` en la salida: se arregla la causa.

## Qué se prueba según la pieza

| Pieza | Cómo |
|---|---|
| `utils/`, `lib/` | Función pura: entradas y salidas, casos borde. |
| `schema/` | Casos válidos, inválidos y el mensaje de cada error. |
| `data/` | Con `@/lib/api-client` y `next/cache` mockeados: el argumento que llega al cliente, las tags y la vida de caché que registra, el recorte del DTO y `notFound()` cuando no existe. |
| `actions/` | Con el cliente, `next/cache` y la sesión mockeados: que falla sin sesión sin llamar a la API, que rechaza entrada inválida, el body enviado, las tags que invalida y que no invalida si la API falla. |
| `hooks/` | `renderHook`: envío válido e inválido, estado pendiente, error de la action. |
| Client Components y componentes síncronos | `render`: estados, props, eventos y accesibilidad (etiquetas, `aria-invalid`, roles). |
| Server Components async (pantallas que leen datos) | **No se prueban con Vitest**: no los soporta. Se prueban sus piezas (`data/`, componentes) y el flujo completo con E2E (Playwright, pendiente). |
| Formularios | Que no llama a la action si es inválido, el envío con lo escrito, el callback de éxito, el error mostrado y que no se cierra si falla. |

## Fases

Se avanza en orden. Cada fase termina con los cuatro comandos en verde y se commitea por separado.

| Fase | Qué se prueba | Prioridad |
|---|---|---|
| 0. Infraestructura | `src/test/`: setup, mocks de frontera, factories | Primero |
| 1. Utils y lib | `src/utils/`, `utils/` de cada feature, `src/lib/` | Alta |
| 2. Schemas | `schema/` de cada feature | Alta |
| 3. Datos y acciones | `data/` y `actions/` | Alta |
| 4. Hooks | `hooks/` de las features y `src/hooks/` | Media |
| 5. Componentes | `src/components/` y `components/` de features | Media |
| 6. Flujos E2E | Pantallas y rutas completas con Playwright | Media |

## Qué no hacer

- No probar librerías de terceros ni las primitivas de shadcn (`src/components/ui/` está fuera de la cobertura).
- No usar snapshots como única verificación.
- No probar clases de Tailwind ni valores del tema.
- No subir un umbral de cobertura global antes de terminar la fase 3.
