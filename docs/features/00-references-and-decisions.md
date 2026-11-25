# 00 · Referencias y decisiones

Estado: ✅

## Objetivo del producto

Plataforma para dar clases de yoga en línea (web hoy, app Expo después). Esta etapa cubre solo el **bloque de autenticación** y la **base de componentes**, todo con datos mock.

## Referencia: curso de midu.dev (Astro + Headless CMS)

Lo que se pudo verificar leyendo la landing pública `https://midu.dev/curso/astro-cms-headless/`:

- Jerarquía **curso → capítulo → lección**, con URLs numeradas (`/curso/{curso}/{01-capitulo}/{06-leccion}/`).
- Cada lección muestra duración y un estado por usuario (`Sin ver`), lo que implica progreso por usuario.
- Hay lecciones "Premium" (acceso exclusivo) y el acceso depende de una suscripción vigente: control de acceso por lección y por plan.
- Landing pública, login con "Iniciar sesión", contenido detrás de sesión.
- Stack del curso (lo que enseña): Astro, Content Island (CMS headless), React, TypeScript, Tailwind, Server Actions, Resend para correos.

**No se pudo verificar** (la landing no lo expone): proveedor de video, reproductor, protección de contenido, base de datos, proveedor de auth y hosting. No se asume nada de eso; el video queda como decisión futura (feature `player`).

Lo que nos llevamos para el modelo futuro: `curso → capítulo → lección`, progreso por usuario, acceso por plan/lección. No se implementa en estas fases.

## Referencia: capa UI de vumi

Patrones que ya usamos y se mantienen:

- Campos de formulario conectados a `react-hook-form` con un único "shell" que resuelve etiqueta, estado inválido, deshabilitado y mensaje de error (`FieldShell` en vumi).
- Un campo por tipo (`InputField`, `SelectField`, `CheckboxField`, `SwitchField`…) sobre las primitivas de shadcn.
- El campo de contraseña incluye botón mostrar/ocultar.
- Primitivas en `ui/`, piezas propias reutilizables en `base/`.
- Schemas de `zod` por formulario, validados con `zodResolver`, `noValidate` en el `<form>`.

Diferencias en este repo (ver `.agents/rules/`): Next.js server-first en lugar de Vite/React Query, carpeta `src/components/form/` en lugar de `form-fields/`, sin comentarios, límites de tamaño por archivo, mensajes en español sin i18n por ahora.

## Referencia: marca (repo `sadhanabyandre`)

Ver [01-brand-and-theme](./01-brand-and-theme.md).

## Decisiones tomadas

| Decisión | Elección | Motivo |
|---|---|---|
| Auth | **Better Auth** | Funciona en Next.js y tiene plugin oficial para Expo, así que la misma lógica sirve a la app móvil |
| Datos en esta etapa | **Mock** (JSON semilla + adaptador en memoria) | Poder probar todo sin backend ni base de datos |
| UI | shadcn (estilo `base-nova`, Base UI) | Ya instalado en el repo |
| Formularios | `react-hook-form` + `zod` | Reglas del repo (`forms.md`) |
| Ubicación de las fichas | `docs/features/` dentro del repo | Pedido explícito del usuario (excepción a "docs fuera del repo") |

## Decisiones abiertas

| Tema | Pregunta | Cuándo se decide |
|---|---|---|
| Better Auth contra la API | Las reglas del repo dicen "Better Auth contra la API" (`@yoga/sdk`). Ahora se corre dentro de Next.js con mock; ¿el servidor de auth final vive en la API o en Next? | Antes de salir del mock |
| Verificación de correo | ¿Obligatoria para iniciar sesión? En el mock se deja desactivada | Ficha 05 |
| Login social (Google/Apple) | Apple lo exige App Store si hay otros logins sociales | Fuera de esta etapa |
| Tipografías y logo oscuro | Falta fuente de marca y logo para fondos claros | Ficha 01 |

## Fuera de alcance

Catálogo, reproductor de video, progreso, pagos y suscripción, panel de admin, i18n (`es/en/pt`), modo oscuro, app Expo, login social, verificación en dos pasos.
