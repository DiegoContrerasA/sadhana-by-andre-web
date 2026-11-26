# Formularios

Todo formulario usa `react-hook-form` con un schema de `zod` conectado por `@hookform/resolvers`. El mismo schema valida en el cliente y en la Server Action.

## Piezas de un formulario

| Pieza | Dónde vive | Qué contiene |
|---|---|---|
| Schema | `src/features/{dominio}/schema/{formulario}.schema.ts` | El schema de `zod` y el tipo inferido de sus valores. |
| Action | `src/features/{dominio}/actions/{mutacion}.ts` | La Server Action que vuelve a validar con el schema y llama a la API ([`data.md`](./data.md#mutaciones)). |
| Hook | `src/features/{dominio}/hooks/use-{formulario}-form.ts` | `useForm`, la llamada a la action y el estado de envío. |
| Campos | `src/components/form/` | Controles conectados a `react-hook-form` sobre las primitivas de shadcn. |
| Vista | Un Client Component de la feature | Los campos y el botón de envío. |

## Schema

- Un schema por formulario, declarado a nivel de módulo.
- El tipo de los valores se deriva con `z.infer` y se exporta junto al schema.
- Los mensajes de error vienen de `messages/`. El schema se crea con una función que los recibe (`createSignInSchema`), y el hook los lee con `useTranslations`. El formulario y su hook leen sus textos directamente: no se pasan por props. El layout que contiene formularios monta `NextIntlClientProvider` solo con los textos que necesitan.
- El schema valida lo que el usuario escribe. Si el body del endpoint tiene otra forma, la conversión la hace la action.
- Si el contrato de la API ya define un schema equivalente, se reutiliza o se extiende en lugar de duplicarlo.

## Hook del formulario

- Llama a `useForm` con `zodResolver` y `defaultValues` completos.
- Envía con la Server Action dentro de `startTransition` (`useTransition`) y expone `isPending`.
- Si la action devuelve un error esperado, lo muestra en el campo con `setError` o como error general del formulario.
- Si la vista debe reaccionar al éxito, recibe el callback por argumento y lo llama tras `{ ok: true }`.
- Devuelve solo lo que la vista necesita: `control`, la función de envío, `isPending` y el error general.

## Campos

- Los campos de `src/components/form/` son genéricos: reciben `control` y `name` tipados con `Control<T>` y `Path<T>` y usan `useController`.
- Cada campo arma `Field`, `FieldLabel`, el control, `FieldDescription` y `FieldError` de `src/components/ui/field`, asocia la etiqueta con `useId()` y marca `aria-invalid`.
- Campos disponibles en `src/components/form/`: `TextField` (con `icon` opcional), `PasswordField` y `CheckboxField`. Para el envío están `SubmitButton` (estado cargando) y `FormError` (error general). Antes de crear uno nuevo, revisa los que hay.
- Un campo no conoce ningún formulario concreto.

## Comportamiento

- El `<form>` lleva `noValidate`: la validación la hace el schema, no el navegador, para que los mensajes sean siempre los nuestros.
- El botón de envío se deshabilita mientras `isPending` es verdadero y muestra que está cargando.
- Un formulario no se cierra ni limpia antes de que la action responda con éxito, y conserva lo escrito si falla.
- Cada input declara su `type`, `autoComplete` e `inputMode` cuando aplica.
- Un error del servidor se muestra en pantalla; no se descarta.

## Qué no hacer

- No manejar campos con `useState`.
- No validar a mano dentro del componente.
- No escribir el tipo de los valores por separado del schema.
- No confiar en la validación del cliente: la action siempre vuelve a validar.
- No usar `watch` para todo el formulario; `useWatch` sobre el campo puntual.
