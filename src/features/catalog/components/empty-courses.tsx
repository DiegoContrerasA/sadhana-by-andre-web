import type { Messages } from "next-intl"

type EmptyCoursesProps = {
  copy: Messages["catalog"]["empty"]
}

export function EmptyCourses({ copy }: EmptyCoursesProps) {
  return (
    <div
      role="status"
      className="flex flex-col gap-2 rounded-xl border border-primary/15 bg-background px-6 py-16 text-center"
    >
      <p className="text-lg">{copy.title}</p>
      <p className="text-sm text-muted-foreground">{copy.hint}</p>
    </div>
  )
}
