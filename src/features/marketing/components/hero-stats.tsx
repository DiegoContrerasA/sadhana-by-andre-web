type HeroStatsProps = {
  stats: ReadonlyArray<{ value: string; label: string }>
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <dl className="absolute inset-x-0 bottom-0 flex divide-x divide-overlay-foreground/20 bg-overlay/30 backdrop-blur-sm md:animate-hero-enter md:[animation-delay:750ms] md:motion-reduce:animate-none">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-1 flex-col-reverse items-center justify-center gap-0.5 px-4 py-5"
        >
          <dt className="text-center text-[11px] tracking-[0.18em] text-overlay-foreground/80 uppercase md:text-xs">
            {label}
          </dt>
          <dd className="text-2xl font-semibold tracking-tight text-overlay-foreground text-shadow-md md:text-3xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
