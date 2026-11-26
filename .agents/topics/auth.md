# Autenticación

## Qué hace

Pantalla de inicio de sesión con correo y contraseña, y acceso con Google. Todo es simulado: no hay Better Auth, sesión, cookie ni redirección.

## Pantallas y rutas

| URL | Ruta en `src/app/[locale]/` | Pantalla |
|---|---|---|
| `/sign-in`, `/en/sign-in` | `(auth)/sign-in/page.tsx` | `SignInScreen` |
| `/sign-up`, `/en/sign-up` | `(auth)/sign-up/page.tsx` | `SignUpScreen` |
| `/forgot-password`, `/en/forgot-password` | `(auth)/forgot-password/page.tsx` | `ComingSoonScreen` (provisional) |

`(auth)/layout.tsx` monta `AuthLayout` para todas las páginas de auth: formulario a la izquierda y foto a la derecha, a pantalla completa. No hay logo ni enlace a la portada. La foto no lleva texto y tiene una capa del color de la marca y un degradado oscuro en la parte baja, sin desenfoque. Por debajo de `lg` solo se ve el formulario. Una página nueva del flujo se crea dentro de `(auth)` y solo entrega su título y formulario.

## Flujo

1. `AuthLayout` monta `NextIntlClientProvider` solo con los textos de `auth`. `SignInForm` y `useSignIn` los leen con `useTranslations`; el hook crea el schema con `createSignInSchema`.
2. `signIn` vuelve a validar y busca el usuario en `lib/auth/mock-users.json`.
3. Entrada inválida o credenciales incorrectas devuelven `invalidCredentials`. Si la petición falla, se muestra `unknown`.
4. Al tener éxito se muestra un aviso de acceso simulado.
5. `signInWithGoogle` siempre responde con éxito y no habla con Google.

Mientras hay una petición, el botón de Google se deshabilita. El de envío solo se deshabilita mientras carga su propio envío.

## Flujo de registro

1. `useSignUp` valida nombre, apellido (2 a 50), correo, teléfono (7 a 15 dígitos, `+` opcional; se guardan sin espacios ni guiones) y contraseña (8 a 128, con letra y número).
2. `signUp` vuelve a validar. Si el correo está en `mock-users.json` devuelve `emailTaken`, que se muestra en el campo de correo.
3. Al tener éxito muestra un aviso. La cuenta no se guarda, así que no permite iniciar sesión después.

`useAuthRequest` concentra el envío, el estado de carga, el resultado y Google para ambos formularios.

## Detalles a tener en cuenta

- Los campos usan `autocomplete="off"` y las contraseñas `new-password` para que el navegador no rellene credenciales guardadas (pedido del usuario). Un navegador o gestor de contraseñas puede ignorarlo.
- El mock no debe presentarse como autenticación real. Se reemplaza según la [ficha 03](../../docs/features/03-auth-foundation.md).
- La página lleva `noindex` y la landing todavía no la enlaza.
- No hay límite de intentos ni "recordarme". El login enlaza a crear cuenta y a recuperar contraseña; esta última solo muestra "Próximamente".
- Los textos viven en `messages/*.json` bajo `auth`.

## Problemas conocidos

Detectados en la revisión de código y todavía sin corregir. Deben resolverse antes de publicar.

- Si se envía un formulario antes de que cargue el JavaScript, el navegador usa GET y los datos, incluida la contraseña, quedan en la URL.
- Con Google en curso se puede enviar también el formulario.
- Un aviso de éxito o error anterior permanece cuando el nuevo envío no pasa la validación.
- El estilo de autorrelleno en `globals.css` no se aplica al fondo de los campos.
- Si se cambia el correo mientras se espera la respuesta, el error de correo ya registrado aparece sobre el nuevo.
- La contraseña visible no desactiva mayúsculas ni autocorrección, y el aviso de éxito puede no anunciarse en lectores de pantalla.

## Archivos clave

`features/auth/`, `lib/auth/mock-users.json`, `app/[locale]/(auth)/`, `public/brand/google.svg`.

## Pruebas

Cubierto: schemas, actions `signIn` y `signUp`, y ambos formularios. Fallo de red y Google solo se prueban en el formulario de inicio de sesión. Falta: E2E del layout.
