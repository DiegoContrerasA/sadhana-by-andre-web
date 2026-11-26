# 04 · Auth: iniciar sesión

Estado: 🟨 · Fase 2 · Primera entrega en revisión

## Primera entrega (mock)

Pedido del usuario: login con diseño de dos columnas, responsive, solo correo y contraseña, validaciones básicas y Google simulado, con un layout compartido para todo el flujo de auth.

Ajustes pedidos en la revisión: título "Iniciar sesión", más espacio, enlaces a `/sign-up` y `/forgot-password` (páginas provisionales), pantalla completa, foto sin texto y con capa de color, y sin autorrelleno (reemplaza el `autoComplete` de la tabla de campos).

Incluye: layout `(auth)`, pantalla `/sign-in` en `es` y `en`, schema, actions simuladas y pruebas.

Queda para después, junto con la ficha 03: Better Auth, sesión y redirección, "recordarme", límite de intentos, cerrar sesión y los enlaces a crear cuenta y recuperar contraseña. Lo descrito abajo es el objetivo completo.

## Ruta y pantalla

- Ruta: `/sign-in` → `SignInScreen` en `features/auth/screens/sign-in-screen.tsx`.
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
- [ ] `SignInScreen` y ruta `/sign-in`
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
