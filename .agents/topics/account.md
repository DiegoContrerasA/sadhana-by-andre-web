# Perfil

## Qué hace

`/profile` muestra los datos de la persona, cuántos cursos y favoritos tiene, y opciones de la cuenta. Como no hay sesión, la persona es de ejemplo (`src/lib/account/mock-profile.json`).

## Flujo

1. La ruta pasa el idioma y los `href` a `ProfileScreen`.
2. `AccountDetails`, dentro de `<Suspense>`, lee `getAccount` y los contadores (`getEnrolledCount` y `getFavoriteCount`, de `progress`).
3. `ProfileSummary` muestra iniciales, nombre, correo y los contadores, que enlazan a "Mis cursos" y "Favoritos".
4. `ProfileForm` edita nombre, apellido y teléfono. El correo es de solo lectura. `updateProfile` vuelve a validar y escribe la cookie; Next vuelve a pintar y el resumen cambia sin recargar.
5. "Cambios guardados" desaparece al volver a editar. Si falla, se conserva lo escrito.
6. `AccountSettings`: idioma (enlaces a `/profile` y `/en/profile`), cambiar contraseña (lleva a `/forgot-password`) y ayuda por WhatsApp.

## Detalles a tener en cuenta

- Las reglas de nombre y teléfono son las del registro (`createNameSchema` y `createPhoneSchema`, de `auth`).
- La cookie `sadhana_profile` guarda nombre, apellido y teléfono sin cifrar, en este navegador; no guarda el correo. Es solo para el mock: con cuentas reales los datos van a la API y esta cookie se elimina.
- Una cookie inválida se ignora y se muestran los datos de ejemplo.
- La action no autentica porque no hay sesión.
- No hay "cerrar sesión", eliminar cuenta, cambio de correo, foto, notificaciones ni suscripción: sin cuentas no tendrían efecto. El idioma no se recuerda entre visitas (`localeCookie: false`).
- Cambiar contraseña usa la recuperación simulada (ver [`auth.md`](./auth.md)).

## Archivos clave

`features/account/`, `app/[locale]/(app)/profile/`. Textos en `messages/*.json` bajo `profile`.

## Pruebas

Cubierto: lectura de la cookie, iniciales, `updateProfile` y el formulario (guardar, inválido y error). Falta: E2E de la pantalla.
