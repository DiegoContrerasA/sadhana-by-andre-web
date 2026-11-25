# 06 · Auth: recuperar contraseña

Estado: ⬜ · Fase 4 · Depende de 03 y 05

Dos pantallas: solicitar el enlace y restablecer con el token.

## Pantalla A: solicitar enlace

- Ruta: `/recuperar-contrasena` → `ForgotPasswordScreen`.
- Texto: explica que se enviará un enlace si el correo existe.

| Campo | Componente | `type` | `autoComplete` | Obligatorio |
|---|---|---|---|---|
| `email` | `TextField` | `email` | `email` | Sí |

Validaciones (`forgot-password.schema.ts`): correo requerido ("Ingresa tu correo") y con formato válido ("Ingresa un correo válido").

Flujo:

1. Action `requestPasswordReset` valida y pide a Better Auth el restablecimiento con `redirectTo` hacia `/restablecer-contrasena`.
2. **Siempre** responde éxito, exista o no el correo.
3. La pantalla muestra confirmación: "Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña" y un enlace "Volver a iniciar sesión".
4. Mock: el enlace llega a la bandeja `/dev/mailbox` en lugar de a un correo real.

## Pantalla B: restablecer

- Ruta: `/restablecer-contrasena?token=...` → `ResetPasswordScreen`.
- Si falta el token o es inválido, se muestra un estado de error con acción "Solicitar un nuevo enlace".

| Campo | Componente | `type` | `autoComplete` | Obligatorio |
|---|---|---|---|---|
| `password` | `PasswordField` | `password` | `new-password` | Sí |
| `confirmPassword` | `PasswordField` | `password` | `new-password` | Sí |

El token no es un campo visible: viaja oculto desde la URL a la action.

Validaciones (`reset-password.schema.ts`): mismas reglas de contraseña que el registro (schema compartido, ficha 05) y coincidencia de ambas.

Flujo:

1. Action `resetPassword` valida y llama a Better Auth con el token y la nueva contraseña.
2. Éxito → mensaje "Tu contraseña se actualizó" y redirección a `/iniciar-sesion`. No se abre sesión automáticamente.
3. Se invalidan las sesiones anteriores del usuario (a confirmar con el comportamiento de Better Auth).

## Errores

| Caso | Mensaje | Dónde |
|---|---|---|
| Token inválido o vencido | "El enlace no es válido o ya venció" | Estado de error de la pantalla |
| Token ya usado | Igual al anterior | Igual |
| Demasiados intentos | "Demasiados intentos. Intenta de nuevo en un minuto" | Error general |
| Inesperado | "Algo salió mal. Intenta de nuevo" | Error general |

## Mock de correo

`/dev/mailbox` (solo desarrollo) lista los correos "enviados": destinatario, asunto y el enlace clicable. Vence a los 30 minutos y es de un solo uso. Al pasar a un proveedor real (Resend, por ejemplo, que usa el curso de referencia) se cambia solo la función de envío.

## Pruebas

- Schemas: correo inválido; contraseñas que no coinciden; reglas de contraseña.
- Solicitar: respuesta idéntica con correo existente e inexistente.
- Restablecer: token válido cambia la contraseña y permite iniciar sesión con la nueva; token usado o vencido falla.

## Tareas

- [ ] `forgot-password.schema.ts` y `reset-password.schema.ts`
- [ ] Actions `request-password-reset` y `reset-password`
- [ ] Hooks y formularios de ambas pantallas
- [ ] Pantallas y rutas `/recuperar-contrasena` y `/restablecer-contrasena`
- [ ] Estado de confirmación y estado de token inválido
- [ ] Bandeja mock `/dev/mailbox` con el enlace
- [ ] Pruebas
- [ ] Actualizar tópico `auth.md`
- [ ] Biome, lint, typecheck y tests en verde
- [ ] Revisión del usuario

## Criterios de aceptación

- Flujo completo: solicitar → abrir enlace desde `/dev/mailbox` → nueva contraseña → iniciar sesión con ella.
- La respuesta de "solicitar" no permite saber si un correo existe.
- Un enlace usado o vencido no sirve.
