import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { documentaryImage, documentaryMeta } from "@/components/DocumentaryCard";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";
import { PageTitle } from "@/components/PageTitle";
import { SectionLabel } from "@/components/SectionLabel";
import { documentaries } from "@/content/documentaries";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Documentaries",
  description:
    "Long-form documentaries from eastern Nepal by Makalu Flow Creations — Makalu, Shiva Dhara, Makalu Barun National Park, Bhojpur and Ramdhuni.",
};

export default function DocumentariesPage() {
  return (
    <div className="bg-ink">
      <section className={`${container} flex flex-col gap-10 pb-14 pt-12 md:gap-16 md:pb-20 md:pt-20`}>
        <SectionLabel
          tone="dark"
          index="01"
          title="Documentaries"
          aside={<span className="font-mono text-[11px] tracking-[0.12em] text-smoke md:text-xs">{documentaries.length} FILMS</span>}
        />
        <div className="flex flex-col gap-6 md:gap-8">
          <PageTitle display="Documentaries" serif="from eastern Nepal." />
          <p className="max-w-md text-base leading-relaxed text-smoke md:text-[17px]">
            Films about places, rituals and communities — made on the trail, and for organisations, municipalities and
            national parks.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <ol className={`${container} flex flex-col`}>
          {documentaries.map((doc, index) => (
            <li key={doc.slug} className="border-t border-line-dark py-10 md:py-14">
              <Link
                href={`/documentaries/${doc.slug}`}
                className="group grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-14"
              >
                <div className="relative aspect-video overflow-hidden bg-coal">
                  <Image
                    {...documentaryImage(doc)}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="photo-bw object-cover"
                  />
                  <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-bone/85 bg-black/35 text-bone transition-transform group-hover:scale-105 md:size-20">
                    <PlayIcon className="ml-1 size-4 md:size-5" />
                  </span>
                  <span className="absolute bottom-3 right-3 font-mono text-[11px] tracking-[0.12em] text-fog md:text-xs">
                    {doc.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-smoke md:text-xs">
                    No. {String(index + 1).padStart(2, "0")} · {documentaryMeta(doc)}
                  </span>
                  <h2 className="flex flex-col gap-2 font-normal">
                    <span className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[0.95]">{doc.title}</span>
                    {doc.subtitle && (
                      <span className="font-serif text-[26px] italic leading-[1.05] md:text-[32px]">{doc.subtitle}</span>
                    )}
                  </h2>
                  {doc.nepaliTitle && <p className="text-lg text-ash">{doc.nepaliTitle}</p>}
                  <p className="leading-relaxed text-smoke">{doc.synopsis[0]}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span className="border-b border-[#5a5a58] pb-0.5 transition-colors group-hover:border-bone">Watch the film</span>
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
