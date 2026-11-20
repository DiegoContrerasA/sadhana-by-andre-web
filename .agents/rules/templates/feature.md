# Template: feature

Ejemplo de `src/features/catalog/` (ilustrativo: los nombres del cliente de la API dependen del contrato de `@yoga/sdk`). Reglas en [`../architecture.md`](../architecture.md) y [`../data.md`](../data.md). La ruta que lo consume está en [`route.md`](./route.md).

```
src/features/catalog/
├── screens/
│   ├── pose-detail-screen.tsx
│   └── poses-screen.tsx
├── components/
│   ├── pose-card.tsx
│   ├── pose-list.tsx
│   ├── poses-empty.tsx
│   └── favorite-pose-button.tsx
├── data/
│   ├── get-pose.ts
│   └── get-poses.ts
├── actions/
│   └── toggle-favorite-pose.ts
├── schema/
│   └── favorite-pose.schema.ts
├── index.ts
└── server.ts
```

## `src/constants/cache-tags.ts`

Una entrada por dominio. Se agrega al crear la feature.

```ts
export const cacheTags = {
  catalog: {
    all: "catalog",
    pose: (slug: string) => `catalog:pose:${slug}`,
  },
}
```

## `data/get-poses.ts`

Lectura pública, cacheada.

```ts
import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { cacheTags } from "@/constants/cache-tags"
import { apiClient } from "@/lib/api-client"

export async function getPoses() {
  "use cache"
  cacheTag(cacheTags.catalog.all)
  cacheLife("days")

  const poses = await apiClient.catalog.listPoses()

  return poses.map(({ slug, name, level, thumbnailUrl }) => ({
    slug,
    name,
    level,
    thumbnailUrl,
  }))
}
```

## `screens/poses-screen.tsx`

Server Component async. Recibe la navegación como `href` y resuelve el estado vacío; la carga la cubre el `loading.tsx` de la ruta y el error, su `error.tsx`.

```tsx
import { PoseList } from "../components/pose-list"
import { PosesEmpty } from "../components/poses-empty"
import { getPoses } from "../data/get-poses"

type PosesScreenProps = {
  poseHref: (slug: string) => string
}

export async function PosesScreen({ poseHref }: PosesScreenProps) {
  const poses = await getPoses()

  if (poses.length === 0) return <PosesEmpty />

  return <PoseList poses={poses} poseHref={poseHref} />
}
```

`poseHref` es una función, y eso funciona porque `PosesScreen` y `PoseList` son Server Components. Si `PoseList` fuera un Client Component, la pantalla le pasaría los `href` ya calculados.

## `actions/toggle-favorite-pose.ts`

```ts
"use server"

import { updateTag } from "next/cache"

import { cacheTags } from "@/constants/cache-tags"
import { requireSession } from "@/features/auth/server"
import { apiClient } from "@/lib/api-client"

import { favoritePoseSchema } from "../schema/favorite-pose.schema"

export async function toggleFavoritePose(input: unknown) {
  const session = await requireSession()
  const parsed = favoritePoseSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "INVALID_INPUT" } as const

  await apiClient.me.toggleFavorite(parsed.data)
  updateTag(cacheTags.me.favorites(session.userId))

  return { ok: true } as const
}
```

## `components/favorite-pose-button.tsx`

Client Component hoja: el único pedazo interactivo de la tarjeta.

```tsx
"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"

import { toggleFavoritePose } from "../actions/toggle-favorite-pose"

type FavoritePoseButtonProps = {
  poseId: string
  isFavorite: boolean
}

export function FavoritePoseButton({ poseId, isFavorite }: FavoritePoseButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="ghost"
      aria-pressed={isFavorite}
      disabled={isPending}
      onClick={() => startTransition(() => toggleFavoritePose({ poseId }))}
    >
      {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    </Button>
  )
}
```

## `server.ts`

Pantallas y lecturas. Solo lo importan `src/app/` y el código de servidor de otras features.

```ts
import "server-only"

export { getPose } from "./data/get-pose"
export { getPoses } from "./data/get-poses"
export { PoseDetailScreen } from "./screens/pose-detail-screen"
export { PosesScreen } from "./screens/poses-screen"
```

## `index.ts`

Lo que es seguro en el cliente.

```ts
export { toggleFavoritePose } from "./actions/toggle-favorite-pose"
export { FavoritePoseButton } from "./components/favorite-pose-button"
export { PoseCard } from "./components/pose-card"
export type { FavoritePoseValues } from "./schema/favorite-pose.schema"
```

Se exporta solo lo que algo externo consume. `PoseList` y `PosesEmpty` son internos mientras nadie fuera de `catalog` los necesite.

## Cómo la consume otra feature

`home` muestra posturas destacadas: importa `getPoses` desde `@/features/catalog/server` en su pantalla y `PoseCard` desde `@/features/catalog`. Nunca importa una pantalla ni un archivo interno.
