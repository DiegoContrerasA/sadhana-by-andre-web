# Template: ruta

Cómo una ruta de `src/app/` consume una pantalla. Reglas en [`../architecture.md`](../architecture.md); la feature de ejemplo está en [`feature.md`](./feature.md).

```
src/app/(marketing)/posturas/
├── page.tsx
├── loading.tsx
├── error.tsx
└── [slug]/
    └── page.tsx
```

## `page.tsx`

La ruta renderiza la pantalla y decide la navegación. No tiene estilos de layout propios, lógica ni llamadas a la API.

```tsx
import { PosesScreen } from "@/features/catalog/server"

export default function PosesPage() {
  return <PosesScreen poseHref={(slug) => `/posturas/${slug}`} />
}
```

## Ruta con parámetros

Los `params` llegan como promesa. La ruta los resuelve y los pasa como props.

```tsx
import { PoseDetailScreen } from "@/features/catalog/server"

export default async function PoseDetailPage({
  params,
}: PageProps<"/posturas/[slug]">) {
  const { slug } = await params

  return <PoseDetailScreen slug={slug} backHref="/posturas" />
}
```

Para metadatos (SEO), la ruta exporta `generateMetadata` usando la misma función de `data/` (`getPose`), que queda deduplicada por la caché.

## `loading.tsx`

Esqueleto de la pantalla mientras llegan los datos.

```tsx
import { PosesSkeleton } from "@/features/catalog"

export default function PosesLoading() {
  return <PosesSkeleton />
}
```

## `error.tsx`

Client Component obligatorio. Ofrece reintentar.

```tsx
"use client"

import { ErrorState } from "@/components/error-state"

export default function PosesError({ reset }: { reset: () => void }) {
  return <ErrorState onRetry={reset} />
}
```

## Datos del usuario dentro de una página pública

Cuando una pantalla mezcla contenido público y datos de la sesión (por ejemplo, los candados de una ruta según el tier), la parte del usuario va en un componente separado dentro de `<Suspense>` en la pantalla, para que lo público se sirva desde la caché y lo del usuario llegue por streaming.

```tsx
<ProgramOutline program={program}>
  <Suspense fallback={<LessonLocksSkeleton />}>
    <LessonLocks programId={program.id} />
  </Suspense>
</ProgramOutline>
```

## Navegación después de una acción

- Tras una mutación, la action llama a `updateTag` o `refresh()` y la misma página vuelve a pintarse con datos frescos: no hace falta navegar.
- Si el flujo exige cambiar de página (iniciar sesión, abrir el checkout), la action llama a `redirect()`.
- Si un Client Component necesita navegar por su cuenta, la ruta le pasa los `href` y el componente usa `<Link>`.
