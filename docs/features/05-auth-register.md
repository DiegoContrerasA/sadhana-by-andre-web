# 05 · Auth: crear cuenta

Estado: ⬜ · Fase 3 · Depende de 04

## Ruta y pantalla

- Ruta: `/sign-up` → `RegisterScreen`.
- `AuthCard` con título "Crea tu cuenta", formulario y enlace "¿Ya tienes cuenta? Inicia sesión".

## Campos

| Campo | Componente | `type` | `autoComplete` | Obligatorio |
|---|---|---|---|---|
| `name` | `TextField` | `text` | `name` | Sí |
| `email` | `TextField` | `email` | `email` | Sí |
| `password` | `PasswordField` | `password` | `new-password` | Sí |
| `confirmPassword` | `PasswordField` | `password` | `new-password` | Sí |
| `acceptTerms` | `CheckboxField` | — | — | Sí |

Se pide un solo nombre completo (el producto no necesita separar nombre y apellido todavía). Se puede añadir teléfono después sin romper nada.

## Validaciones (`sign-up.schema.ts`)

| Campo | Regla | Mensaje |
|---|---|---|
| `name` | Requerido, recortado | "Ingresa tu nombre" |
| `name` | 2 a 80 caracteres | "El nombre debe tener entre 2 y 80 caracteres" |
| `email` | Requerido y formato válido (minúsculas, recortado) | "Ingresa un correo válido" |
| `password` | Mínimo 8 caracteres | "Usa al menos 8 caracteres" |
| `password` | Máximo 128 | "Usa máximo 128 caracteres" |
| `password` | Al menos una letra y un número | "Incluye al menos una letra y un número" |
| `confirmPassword` | Igual a `password` | "Las contraseñas no coinciden" (error en `confirmPassword`) |
| `acceptTerms` | Debe ser `true` | "Debes aceptar los términos para continuar" |

Política de contraseña propuesta: longitud antes que complejidad, sin exigir símbolos. Se puede endurecer cambiando solo el schema. El schema de contraseña se comparte con la ficha 06 para que ambas pantallas apliquen la misma regla.

## Métodos y flujo

1. Validación en el cliente y bloqueo mientras carga.
2. Action `signUp` vuelve a validar y llama a Better Auth (registro con correo y contraseña). `confirmPassword` y `acceptTerms` se validan pero no se envían.
3. Éxito → se abre la sesión y se redirige a `/`. Si más adelante se exige verificación de correo, redirige a una pantalla "Revisa tu correo".
4. Se guarda en el mock con rol `student`.

## Errores

| Caso | Mensaje | Dónde |
|---|---|---|
| Correo ya registrado | "Ya existe una cuenta con este correo" | Campo `email` |
| Demasiados intentos | "Demasiados intentos. Intenta de nuevo en un minuto" | Error general |
| Inesperado | "Algo salió mal. Intenta de nuevo" | Error general |

> Mostrar "correo ya registrado" revela que el correo existe (enumeración de usuarios). Es la UX estándar y se acepta para el registro; queda anotado para revisar cuando haya verificación de correo.

## Pendiente de decidir

- ¿Exigir verificación de correo antes de entrar? Por ahora desactivada.
- ¿Indicador de fortaleza de contraseña? Por ahora no.
- URLs de términos y privacidad (el checkbox necesita enlaces reales).

## Pruebas

- Schema: cada regla y su mensaje, coincidencia de contraseñas, términos no aceptados.
- Formulario: errores por campo, envío válido, correo duplicado muestra error en `email`.
- Action: crea usuario, rechaza duplicado, la sesión queda abierta.

## Tareas

- [ ] Schema de contraseña compartido
- [ ] `sign-up.schema.ts`
- [ ] Action `sign-up`
- [ ] Hook `use-sign-up-form`
- [ ] Componente `SignUpForm`
- [ ] `RegisterScreen` y ruta `/sign-up`
- [ ] Páginas o enlaces de términos y privacidad (placeholder)
- [ ] Pruebas
- [ ] Actualizar tópico `auth.md`
- [ ] Biome, lint, typecheck y tests en verde
- [ ] Revisión del usuario

## Criterios de aceptación

- Un registro nuevo permite iniciar sesión de inmediato y luego cerrar y volver a entrar (mientras el servidor siga encendido).
- Registrar un correo existente muestra el error en el campo.
- Ninguna regla de contraseña está duplicada entre schemas.
