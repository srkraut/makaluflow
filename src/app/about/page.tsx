import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { SectionLabel } from "@/components/SectionLabel";
import { photo } from "@/content/gallery";
import { site } from "@/content/site";
import { button, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Makalu Flow Creations is a vlogger, documentary filmmaker and cinematographer from Itahari, Sunsari, filming the people and places of eastern Nepal.",
};

const portrait = photo("dsc07362-edit");

export default function AboutPage() {
  return (
    <>
      <section className="bg-paper text-charcoal">
        <div className={`${container} flex flex-col gap-10 py-12 md:gap-16 md:py-20`}>
          <SectionLabel
            index="01"
            title="About"
            aside={<span className="font-mono text-[11px] tracking-[0.12em] text-stone md:text-xs">ITAHARI, SUNSARI — NEPAL</span>}
          />
          <div className="grid gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16">
            <div className="flex flex-col gap-8">
              <h1 className="flex flex-col font-normal">
                <span className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88]">Behind</span>
                <span className="font-serif text-[clamp(3rem,8.5vw,8rem)] italic leading-[0.95] tracking-[-0.02em]">the camera.</span>
              </h1>
              <div className="flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-graphite">
                <p>
                  Makalu Flow Creations is the work of a vlogger, documentary filmmaker and cinematographer from Itahari, in
                  Sunsari district. The name comes from Makalu — the fifth-highest mountain on Earth, and the subject of the
                  channel&apos;s feature-length film.
                </p>
                <p>
                  The work moves between two modes: vlogs that bring people along — treks, road trips, coffee and
                  conversations — and documentaries made slowly, about rituals, farming, disasters and the communities who
                  live with them.
                </p>
                <p>
                  Alongside the channel, Makalu Flow films for organisations and local governments, including Kalpa in Bhojpur
                  and Ramdhuni Municipality — from camera and drone work to narration and edit.
                </p>
              </div>
            </div>
            <figure className="flex flex-col gap-3">
              <div className="group relative aspect-[4/5] overflow-hidden bg-fog">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={portrait.blurDataURL}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="photo-bw object-cover"
                />
              </div>
              <figcaption className="text-[13px] text-stone">
                <em className="font-serif text-[17px] text-charcoal">Fig. 1</em> — {portrait.alt}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className={`${container} flex flex-col gap-10 py-16 md:gap-14 md:py-28`}>
          <SectionLabel tone="dark" index="02" title="What Makalu Flow does" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {site.services.map((service, index) => (
              <div key={service.title} className="flex flex-col gap-4 border-t border-line-dark pt-6">
                <span className="font-mono text-xs text-smoke">0{index + 1}</span>
                <h2 className="font-display text-[26px] leading-[0.98] md:text-[30px]">{service.title}</h2>
                <p className="leading-relaxed text-smoke">{service.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={button.light}>
              Book a shoot
            </Link>
            <Link href="/documentaries" className={button.outlineOnDark}>
              See the documentaries
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper text-charcoal">
        <div className={`${container} flex flex-col gap-8 py-16 md:gap-12 md:py-24`}>
          <SectionLabel index="03" title="Follow along" />
          <ul className="flex flex-col border-b border-line-light">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border-t border-line-light py-5 md:py-7"
                >
                  <span className="font-display text-[32px] leading-none md:text-[64px]">{social.label}</span>
                  <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-stone group-hover:text-charcoal md:text-xs">
                    <span className="hidden sm:inline">{social.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
