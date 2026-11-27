export function CourseLessonSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col gap-5 motion-reduce:animate-none"
    >
      <div className="h-5 w-56 rounded-md bg-primary/10" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="aspect-video rounded-xl bg-primary/10" />
        <div className="h-72 rounded-xl bg-primary/10" />
      </div>
    </div>
  )
}
