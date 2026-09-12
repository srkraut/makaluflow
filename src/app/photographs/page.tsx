import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionLabel } from "@/components/SectionLabel";
import { gallery } from "@/content/gallery";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Photographs",
  description: "Mountains, meadows, night skies and the people of Nepal — photographs by Makalu Flow Creations.",
};

export default function PhotographsPage() {
  return (
    <div className="bg-ink">
      <section className={`${container} flex flex-col gap-10 pb-10 pt-12 md:gap-16 md:pb-14 md:pt-20`}>
        <SectionLabel
          tone="dark"
          index="01"
          title="Photographs"
          aside={<span className="font-mono text-[11px] tracking-[0.12em] text-smoke md:text-xs">{gallery.length} FRAMES</span>}
        />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="flex flex-col font-normal">
            <span className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.88]">Photographs</span>
            <span className="font-serif text-[clamp(2.75rem,8vw,7.5rem)] italic leading-[0.95] tracking-[-0.02em]">
              from the trail.
            </span>
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-smoke md:pb-3 md:text-[17px]">
            Mountains, meadows, night skies and the people in between. Hover for colour, tap to see a frame full size.
          </p>
        </div>
      </section>
      <section className={`${container} pb-24 md:pb-32`}>
        <GalleryGrid photos={gallery} />
      </section>
    </div>
  );
}
