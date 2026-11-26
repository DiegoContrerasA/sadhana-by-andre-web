# 03 · Auth: base (Better Auth + mock)

Estado: ⬜ · Fase 2

## Objetivo

Dejar Better Auth funcionando con datos mock para que login, registro y recuperación sean flujos reales (sesión, cookie, errores) aunque no haya base de datos ni correo. El mismo contrato debe servir después a la app Expo.

## Decisión técnica

- **Better Auth** con `emailAndPassword` activado.
- **Persistencia mock**: adaptador en memoria sembrado desde un JSON de usuarios. Al reiniciar el servidor se pierden los registros nuevos (es lo esperado en mock).
- **Correo mock**: en lugar de enviar, `sendResetPassword` escribe el enlace en una "bandeja" en memoria visible en `/dev/mailbox`, para poder probar el flujo completo.
- Cuando exista la API real se cambia el adaptador y el envío de correo; las pantallas y actions no cambian.

> Los nombres exactos de la API de Better Auth (adaptador en memoria, métodos de cliente y de reset de contraseña) se verifican contra la documentación de la versión instalada antes de escribir código, no de memoria.

## Dependencias nuevas

`better-auth` (requiere tu aprobación según `code-style.md#dependencias`). Para Expo, más adelante, `@better-auth/expo`.

## Estructura propuesta

```
src/
├── lib/auth/
│   ├── auth.ts              Instancia de Better Auth (server-only)
│   ├── auth-client.ts       Cliente para componentes cliente
│   ├── mock-users.json      Usuarios semilla
│   └── mock-mailbox.ts      Bandeja en memoria (server-only)
├── app/api/auth/[...all]/route.ts   Handler de Better Auth
└── features/auth/
    ├── schema/              sign-in, sign-up, forgot-password, reset-password
    ├── actions/             sign-in, sign-up, request-password-reset, reset-password, sign-out
    ├── data/                get-session (server-only)
    ├── hooks/               un hook de formulario por pantalla
    ├── components/          formularios
    ├── screens/             pantallas
    ├── index.ts
    └── server.ts
```

`mock-users.json` se ubica en `lib/auth/` por ser infraestructura de auth; se retira cuando llegue la API.

## Usuarios semilla

| Nombre | Correo | Contraseña | Rol | Nota |
|---|---|---|---|---|
| Alumna Demo | `alumna@sadhana.test` | `Sadhana123!` | `student` | Caso feliz |
| Andre | `andre@sadhana.test` | `Sadhana123!` | `admin` | Instructora |
| Sin verificar | `pendiente@sadhana.test` | `Sadhana123!` | `student` | `emailVerified: false`, para probar el caso si se activa la verificación |

Las contraseñas de prueba viven solo en el mock y se hashean al sembrar.

## Sesión y rutas

- Sesión por cookie `httpOnly` (la gestiona Better Auth).
- `getSession()` en `features/auth/data/`, usado por las pantallas en el servidor.
- Rutas públicas de auth en el grupo `src/app/(auth)/`: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`.
- Si ya hay sesión, esas rutas redirigen a `/`; las zonas privadas (`(app)`) redirigen a `/sign-in`. Se decide en el `layout.tsx` del grupo, no en middleware, por ahora.
- Destino tras iniciar sesión: `/` (parámetro `redirectTo` validado: solo rutas internas).

## Contrato de errores (acciones)

Las Server Actions devuelven un resultado tipado:

```
{ ok: true }
{ ok: false, error: { code, message, fieldErrors? } }
```

Códigos esperados: `INVALID_CREDENTIALS`, `EMAIL_TAKEN`, `INVALID_TOKEN`, `RATE_LIMITED`, `UNKNOWN`. El mensaje visible está en español.

## Seguridad (aplica ya, aunque sea mock)

- Mensaje genérico en login fallido (no revelar si el correo existe).
- En recuperación, responder siempre igual exista o no el correo.
- Token de restablecimiento de un solo uso y con vencimiento (mock: 30 min).
- Límite de intentos (mock: 5 por minuto por correo) y respuesta `RATE_LIMITED`.
- La action vuelve a validar con el mismo schema de `zod`.
- `redirectTo` solo acepta rutas relativas.

## Tareas

- [ ] Aprobar la dependencia `better-auth`
- [ ] Verificar API vigente en la documentación de la versión instalada
- [ ] `lib/auth/auth.ts` con adaptador en memoria y semilla
- [ ] `mock-users.json`
- [ ] `mock-mailbox.ts` y página `/dev/mailbox`
- [ ] Route handler `/api/auth/[...all]`
- [ ] `auth-client.ts`
- [ ] Tipo `ActionResult` y mapeo de errores de Better Auth a códigos propios
- [ ] `getSession()`
- [ ] Layouts `(auth)` y `(app)` con redirecciones
- [ ] Documento de tópico `.agents/topics/auth.md` y entrada en `topics/index.md`
- [ ] Pruebas de utils y del mapeo de errores
- [ ] Revisión del usuario

## Criterios de aceptación

- Se puede iniciar sesión con un usuario semilla y la cookie queda establecida.
- Sin sesión, una ruta privada redirige al login.
- Cambiar el adaptador a uno real no exige tocar pantallas ni actions.
