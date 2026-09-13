import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageTitle } from "@/components/PageTitle";
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
        <div className="flex flex-col gap-6 md:gap-8">
          <PageTitle display="Photographs" serif="from the trail." />
          <p className="max-w-md text-base leading-relaxed text-smoke md:text-[17px]">
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
