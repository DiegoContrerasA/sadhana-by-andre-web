import { ShowcaseSection } from "./showcase-section"

export function TypographyShowcase() {
  return (
    <ShowcaseSection
      title="Tipografía"
      description="Fuente del sistema, como sadhanabyandre.com. Títulos livianos, etiquetas en mayúsculas espaciadas."
    >
      <div className="flex flex-col gap-6">
        <p className="text-[0.65rem] tracking-[0.35em] text-primary uppercase">
          Sobre mí
        </p>
        <h1 className="text-6xl leading-none">El camino hacia tu equilibrio</h1>
        <h2 className="text-5xl leading-none">
          Cada postura, una conversación
        </h2>
        <h3 className="text-3xl">Yoga grupal</h3>
        <p className="max-w-xl leading-relaxed">
          Sadhana nace de mi propio camino de búsqueda, escucha y reconexión con
          el cuerpo. Un espacio para cuerpos reales y procesos reales.
        </p>
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          A lo largo de los 12 años practicando entendí que el bienestar no se
          trata de forzar, corregir o exigir, sino de habitar el cuerpo con
          presencia, respeto y honestidad.
        </p>
        <blockquote className="max-w-xl border-l-2 border-primary pl-4 text-primary italic">
          Mi filosofía es simple: cada cuerpo tiene su propia sabiduría.
        </blockquote>
        <p className="text-sm tracking-[0.22em] uppercase">
          Respira · Estírate · Fortalece tu ser interior
        </p>
      </div>
    </ShowcaseSection>
  )
}
