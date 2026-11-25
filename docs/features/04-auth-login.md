# 04 · Auth: iniciar sesión

Estado: ⬜ · Fase 2 · Depende de 02 y 03

## Ruta y pantalla

- Ruta: `/iniciar-sesion` → `LoginScreen` en `features/auth/screens/login-screen.tsx`.
- Contenido: `AuthCard` con título "Bienvenida de nuevo" (texto final por revisar), formulario, enlace "¿Olvidaste tu contraseña?" y enlace "Crear cuenta".

## Campos

| Campo | Componente | `type` | `autoComplete` | Obligatorio |
|---|---|---|---|---|
| `email` | `TextField` | `email` (`inputMode="email"`) | `email` | Sí |
| `password` | `PasswordField` | `password` | `current-password` | Sí |
| `remember` | `CheckboxField` | — | — | No (por defecto `false`) |

## Validaciones (`sign-in.schema.ts`)

| Campo | Regla | Mensaje |
|---|---|---|
| `email` | Requerido | "Ingresa tu correo" |
| `email` | Formato válido, sin espacios (se recorta y pasa a minúsculas) | "Ingresa un correo válido" |
| `password` | Requerida | "Ingresa tu contraseña" |
| `remember` | Booleano | — |

En login **no** se validan reglas de complejidad de la contraseña (solo que no esté vacía) para no revelar la política ni bloquear cuentas antiguas.

## Métodos y flujo

1. Cliente valida con `zod` y bloquea el botón (`isPending`).
2. Llama a la action `signIn` (Server Action), que vuelve a validar y usa Better Auth (`signIn` con correo y contraseña; `remember` controla si la sesión persiste).
3. `{ ok: true }` → redirección a `redirectTo` o `/`.
4. `{ ok: false }` → error general en `FormError`, el formulario conserva lo escrito y el foco va al primer campo con error o al alert.

## Estados y errores

| Caso | Mensaje | Dónde |
|---|---|---|
| Credenciales incorrectas / usuario inexistente | "Correo o contraseña incorrectos" | Error general |
| Correo sin verificar (si se activa) | "Verifica tu correo para continuar" | Error general |
| Demasiados intentos | "Demasiados intentos. Intenta de nuevo en un minuto" | Error general |
| Error inesperado | "Algo salió mal. Intenta de nuevo" | Error general |
| Cargando | Botón "Iniciando sesión…" deshabilitado, `aria-busy` | Botón |

## Pruebas

- Schema: correo vacío, correo inválido, contraseña vacía, normalización del correo.
- Formulario: muestra errores sin enviar, envía valores correctos, bloquea mientras carga, muestra error del servidor y conserva los campos.
- Action (con mock): éxito con usuario semilla, fallo con contraseña incorrecta, `redirectTo` externo ignorado.

## Tareas

- [ ] `sign-in.schema.ts`
- [ ] Action `sign-in`
- [ ] Hook `use-sign-in-form`
- [ ] Componente `SignInForm`
- [ ] `LoginScreen` y ruta `/iniciar-sesion`
- [ ] `loading.tsx` / `error.tsx` si aplica
- [ ] Botón de cerrar sesión (action `sign-out`) para poder probar el ciclo
- [ ] Pruebas
- [ ] Actualizar tópico `auth.md`
- [ ] Biome, lint, typecheck y tests en verde
- [ ] Revisión del usuario

## Criterios de aceptación

- Con `alumna@sadhana.test` / `Sadhana123!` se inicia sesión y se llega a `/`.
- Con una contraseña incorrecta se ve el error general sin perder lo escrito.
- Funciona solo con teclado y con lector de pantalla (etiquetas, `role="alert"`).
