import { notFound } from "next/navigation"

import { ComponentsScreen } from "@/features/dev/server"

export default function ComponentsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound()
  }

  return <ComponentsScreen />
}
