# Autenticación

## Qué hace

Pantalla de inicio de sesión con correo y contraseña, y acceso con Google. Todo es simulado: no hay Better Auth, sesión, cookie ni redirección.

## Pantallas y rutas

| URL | Ruta en `src/app/[locale]/` | Pantalla |
|---|---|---|
| `/sign-in`, `/en/sign-in` | `(auth)/sign-in/page.tsx` | `SignInScreen` |
| `/sign-up`, `/en/sign-up` | `(auth)/sign-up/page.tsx` | `ComingSoonScreen` (provisional) |
| `/forgot-password`, `/en/forgot-password` | `(auth)/forgot-password/page.tsx` | `ComingSoonScreen` (provisional) |

`(auth)/layout.tsx` monta `AuthLayout` para todas las páginas de auth: formulario a la izquierda y foto a la derecha, a pantalla completa. La foto no lleva texto y tiene una capa del color de la marca y un degradado oscuro en la parte baja, sin desenfoque. Por debajo de `lg` solo se ve el formulario. Una página nueva del flujo se crea dentro de `(auth)` y solo entrega su título y formulario.

## Flujo

1. `AuthLayout` monta `NextIntlClientProvider` solo con los textos de `auth`. `SignInForm` y `useSignIn` los leen con `useTranslations`; el hook crea el schema con `createSignInSchema`.
2. `signIn` vuelve a validar y busca el usuario en `lib/auth/mock-users.json`.
3. Entrada inválida o credenciales incorrectas devuelven `invalidCredentials`. Si la petición falla, se muestra `unknown`.
4. Al tener éxito se muestra un aviso de acceso simulado.
5. `signInWithGoogle` siempre responde con éxito y no habla con Google.

Mientras hay una petición, los dos botones de envío quedan deshabilitados.

## Detalles a tener en cuenta

- El correo usa `autocomplete="off"` y la contraseña `new-password` para que el navegador no rellene credenciales guardadas (pedido del usuario). Un navegador o gestor de contraseñas puede ignorarlo; `globals.css` evita el fondo azul del autorrelleno.
- El mock no debe presentarse como autenticación real. Se reemplaza según la [ficha 03](../../docs/features/03-auth-foundation.md).
- La página lleva `noindex` y la landing todavía no la enlaza.
- No hay límite de intentos ni "recordarme". El login enlaza a crear cuenta y recuperar contraseña, que por ahora solo muestran "Próximamente".
- Los textos viven en `messages/*.json` bajo `auth`.

## Archivos clave

`features/auth/`, `lib/auth/mock-users.json`, `app/[locale]/(auth)/`, `public/brand/google.svg`.

## Pruebas

Cubierto: schema, action `signIn` y formulario (validación, error del servidor, fallo de red y Google). Falta: E2E del layout.
