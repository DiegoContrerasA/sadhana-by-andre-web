# Autenticación

## Qué hace

Pantalla de inicio de sesión con correo y contraseña, y acceso con Google. Todo es simulado: no hay Better Auth, sesión, cookie ni redirección.

## Pantallas y rutas

| URL | Ruta en `src/app/[locale]/` | Pantalla |
|---|---|---|
| `/sign-in`, `/en/sign-in` | `(auth)/sign-in/page.tsx` | `SignInScreen` |
| `/sign-up`, `/en/sign-up` | `(auth)/sign-up/page.tsx` | `SignUpScreen` |
| `/forgot-password`, `/en/forgot-password` | `(auth)/forgot-password/page.tsx` | `ForgotPasswordScreen` |
| `/reset-password?token=…`, `/en/reset-password?token=…` | `(auth)/reset-password/page.tsx` | `ResetPasswordScreen` |

`(auth)/layout.tsx` monta `AuthLayout` para todas las páginas de auth: formulario a la izquierda y foto a la derecha, a pantalla completa. No hay logo ni enlace a la portada. La foto no lleva texto y tiene una capa del color de la marca y un degradado oscuro en la parte baja, sin desenfoque. Por debajo de `lg` solo se ve el formulario. Una página nueva del flujo se crea dentro de `(auth)` y solo entrega su título y formulario.

## Flujo

1. `AuthLayout` monta `NextIntlClientProvider` solo con los textos de `auth`. `SignInForm` y `useSignInForm` los leen con `useTranslations`; el hook crea el schema con `createSignInSchema`.
2. `signIn` vuelve a validar y busca el usuario en `lib/auth/mock-users.json`.
3. Entrada inválida o credenciales incorrectas devuelven `invalidCredentials`. Si la petición falla, se muestra `unknown`.
4. Al tener éxito se muestra un aviso de acceso simulado.
5. `signInWithGoogle` siempre responde con éxito y no habla con Google.

Mientras hay una petición no se puede iniciar otra: Google y el envío quedan deshabilitados.

## Flujo de registro

1. `useSignUpForm` valida nombre, apellido (2 a 50), correo, teléfono (7 a 15 dígitos, `+` opcional; se guardan sin espacios ni guiones) y contraseña (8 a 128, con letra y número).
2. `signUp` vuelve a validar. Si el correo está en `mock-users.json` devuelve `emailTaken`, que se muestra en el campo de correo.
3. Al tener éxito muestra un aviso. La cuenta no se guarda, así que no permite iniciar sesión después.

`useAuthRequest` concentra el envío, el estado de carga, el resultado y Google para ambos formularios.

## Flujo de recuperación

1. `requestPasswordReset` valida el correo y responde igual exista o no. No se envía ningún correo.
2. La confirmación muestra un enlace de prueba a `/reset-password` con el token de `lib/auth/mock-reset-token.json`.
La ruta lee `searchParams` y su `loading.tsx` cubre la espera con `ResetLinkLoading` ("Validando tu enlace…").
3. Sin ese token, la pantalla muestra enlace inválido y permite pedir otro.
4. `resetPassword` revisa el token y vuelve a validar. La contraseña usa `createPasswordSchema`, el mismo del registro, y debe coincidir con la confirmación. No se guarda nada.

El token de prueba es fijo: no vence ni es de un solo uso.

## Detalles a tener en cuenta

- Los cuatro formularios usan `method="post"` y no se pueden enviar hasta que la página está lista, para que los datos no queden en la URL.
- Un intento que no pasa la validación borra el aviso anterior. El foco pasa al error general o, en la recuperación, al aviso de éxito.
- El error de correo ya registrado solo se muestra si el correo del campo sigue siendo el que se envió.
- El estilo de autorrelleno va fuera de las capas de CSS en `globals.css` para ganarle a las clases de la primitiva.
- Los campos usan `autocomplete="off"` y las contraseñas `new-password` para que el navegador no rellene credenciales guardadas (pedido del usuario). Un navegador o gestor de contraseñas puede ignorarlo.
- El mock no debe presentarse como autenticación real. Se reemplaza según la [ficha 03](../../docs/features/03-auth-foundation.md).
- La página lleva `noindex` y la landing todavía no la enlaza.
- No hay límite de intentos ni "recordarme". El login enlaza a crear cuenta y a recuperar contraseña.
- Los textos viven en `messages/*.json` bajo `auth`.

## Archivos clave

`features/auth/`, `lib/auth/mock-users.json`, `app/[locale]/(auth)/`, `public/brand/google.svg`.

## Pruebas

Cubierto: schemas, actions `signIn` y `signUp`, y ambos formularios. El fallo de red y Google solo se prueban en el formulario de inicio de sesión; el catálogo y los hooks no tienen pruebas propias. Falta: E2E del layout.
