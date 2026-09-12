import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { DocumentaryCard, documentaryImage } from "@/components/DocumentaryCard";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";
import { SectionLabel, Viewfinder } from "@/components/SectionLabel";
import { VideoRow, VideoThumb, videoMeta } from "@/components/VideoCard";
import { documentaries, documentaryName, featuredDocumentary as film, runtimeLabel } from "@/content/documentaries";
import { photo } from "@/content/gallery";
import { site, whatsappLink } from "@/content/site";
import { formatDuration, getLatestVideos, videoUrl } from "@/lib/youtube";
import { button, container } from "@/lib/ui";

export const revalidate = 3600;

const hero = photo("dsc07355-edit");
const storyteller = photo("dsc07288");
const detail = photo("dsc00710");
const strip = [
  { item: photo("dsc07277"), flex: "md:flex-[3]" },
  { item: photo("dsc07415"), flex: "md:flex-[3]" },
  { item: photo("dsc07504"), flex: "md:flex-[5]" },
  { item: photo("dsc07378"), flex: "md:flex-[4]" },
];

const mono = "font-mono text-[11px] uppercase tracking-[0.12em] md:text-xs";

export default async function HomePage() {
  const [lead, ...rest] = await getLatestVideos(5);
  const leadDuration = lead ? formatDuration(lead.durationSeconds) : null;

  return (
    <>
      {/* Hero — watching */}
      <section className="bg-night">
        <div className="relative h-[calc(100svh-4rem)] min-h-[640px] overflow-hidden bg-coal md:h-[calc(100svh-160px)] md:max-h-[860px] md:min-h-[620px]">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={hero.blurDataURL}
            className="photo-bw object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/30 lg:bg-linear-to-r lg:from-black/85 lg:via-black/25 lg:to-black/50"
          />
          <Viewfinder />
          <div className={`reveal absolute left-7 top-7 flex items-center gap-2.5 text-fog md:left-16 md:top-11 ${mono}`}>
            <span className="size-1.5 animate-pulse rounded-full bg-bone md:size-2" />
            REC 00:00:12:04
          </div>
          <div className={`absolute right-7 top-7 flex flex-col items-end gap-1.5 text-fog md:right-16 md:top-11 ${mono}`}>
            <span className="hidden md:inline">
              {site.location.city}, {site.location.district} · {site.location.country}
            </span>
            <span>{site.location.coordinates}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pb-9 md:px-16 md:pb-16 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5 md:gap-7">
                <p className="reveal font-mono text-[10px] leading-relaxed tracking-[0.14em] text-ash md:text-[13px] md:tracking-[0.18em]">
                  VLOGGER · DOCUMENTARY FILMMAKER
                  <br className="md:hidden" />
                  <span className="hidden md:inline"> · </span>
                  CINEMATOGRAPHER
                </p>
                <h1 className="flex flex-col font-normal">
                  <span className="reveal font-display text-[clamp(4rem,10.4vw,9.4rem)] leading-[0.88] [animation-delay:120ms]">
                    Nepal,
                  </span>
                  <span className="reveal font-serif text-[clamp(4.5rem,10vw,9rem)] italic leading-[0.92] tracking-[-0.02em] [animation-delay:240ms]">
                    frame by <br className="xl:hidden" />
                    frame.
                  </span>
                </h1>
              </div>
              <div className="reveal flex max-w-[340px] flex-col gap-5 [animation-delay:400ms] md:gap-6 lg:pb-2">
                <p className="text-[15px] leading-relaxed text-fog md:text-[17px]">
                  Vlogs, documentaries and cinematography — from Itahari to the foot of Makalu.
                </p>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  <Link href={`/documentaries/${film.slug}`} className={button.light}>
                    <PlayIcon />
                    Watch the film
                  </Link>
                  <Link href="/documentaries" className={button.outlineOnDark}>
                    View work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {lead && (
          <div className="mx-auto hidden h-[72px] max-w-[1440px] items-center gap-8 px-14 font-mono text-xs tracking-[0.12em] text-dim md:flex">
            <span>SCROLL</span>
            <span className="h-px flex-1 bg-line-dark" />
            <a href={videoUrl(lead.id)} target="_blank" rel="noopener noreferrer" className="max-w-[60%] truncate hover:text-bone">
              NOW SHOWING — {lead.title.toUpperCase()}
              {leadDuration && ` · ${leadDuration}`}
            </a>
          </div>
        )}
      </section>

      {/* The storyteller — reading */}
      <section className="bg-paper text-charcoal">
        <div className={`${container} flex flex-col gap-8 py-[72px] md:gap-14 md:py-32`}>
          <SectionLabel
            index="01"
            title="The storyteller"
            aside={<span className={`text-stone ${mono}`}>Itahari, Sunsari — Nepal</span>}
          />
          <div className="grid gap-10 md:grid-cols-[minmax(0,560fr)_minmax(0,688fr)] md:gap-16">
            <figure className="order-2 flex flex-col gap-3 md:order-1">
              <div className="group relative aspect-[4/5] overflow-hidden bg-fog md:aspect-auto md:min-h-[760px] md:flex-1">
                <Image
                  src={storyteller.src}
                  alt={storyteller.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={storyteller.blurDataURL}
                  className="photo-bw object-cover"
                />
              </div>
              <figcaption className="text-[13px] text-stone">
                <em className="font-serif text-[17px] text-charcoal">Fig. 1</em> — {storyteller.alt}
              </figcaption>
            </figure>
            <div className="order-1 flex flex-col gap-7 md:order-2">
              <h2 className="text-pretty font-serif text-[44px] font-normal leading-[1.02] tracking-[-0.01em] md:text-[clamp(3.5rem,5.3vw,4.75rem)] md:leading-none">
                Real stories from the hills, rivers and people of <em>eastern Nepal.</em>
              </h2>
              <p className="max-w-[560px] text-base leading-relaxed text-graphite md:text-[19px]">
                Makalu Flow Creations is the work of a vlogger, documentary filmmaker and cinematographer from Itahari,
                Sunsari — filming everyday life, culture and the trails between home and the foot of Makalu.
              </p>
              <ArrowLink href="/about" className="self-start text-[15px]">
                More about Makalu Flow
              </ArrowLink>
              <figure className="mt-auto hidden flex-col gap-3 pt-5 md:flex">
                <div className="group relative h-[380px] overflow-hidden bg-fog">
                  <Image
                    src={detail.src}
                    alt={detail.alt}
                    fill
                    sizes="45vw"
                    placeholder="blur"
                    blurDataURL={detail.blurDataURL}
                    className="photo-bw object-cover"
                  />
                </div>
                <figcaption className="text-[13px] text-stone">
                  <em className="font-serif text-[17px] text-charcoal">Fig. 2</em> — {detail.alt}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Featured documentary — watching */}
      <section className="bg-ink">
        <div className={`${container} flex flex-col gap-6 py-[72px] md:gap-12 md:py-32`}>
          <SectionLabel
            tone="dark"
            index="02"
            title="Featured documentary"
            aside={<ArrowLink href="/documentaries">All documentaries</ArrowLink>}
          />
          <Link
            href={`/documentaries/${film.slug}`}
            className="group relative block aspect-video overflow-hidden bg-coal md:aspect-[2.39/1]"
          >
            <Image
              {...documentaryImage(film)}
              alt=""
              fill
              sizes="(min-width: 1440px) 1328px, 100vw"
              className="photo-bw object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/45" />
            {film.kicker && (
              <span className={`absolute left-6 top-5 hidden text-fog md:block ${mono}`}>{film.kicker}</span>
            )}
            <span className={`absolute bottom-3 right-4 text-fog md:bottom-5 md:right-6 ${mono}`}>{film.duration}</span>
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-bone/85 bg-black/35 text-bone transition-transform group-hover:scale-105 md:size-[104px]">
              <PlayIcon className="ml-1 size-4 md:size-[26px]" />
            </span>
            <span className="sr-only">Watch {documentaryName(film)}</span>
          </Link>

          <div className="grid gap-6 md:grid-cols-[minmax(0,600px)_minmax(0,1fr)] md:gap-[72px]">
            <div className="flex flex-col gap-4 md:gap-5">
              <span className={`text-smoke ${mono}`}>
                Documentary · {film.year} · {runtimeLabel(film.duration)}
              </span>
              <h2 className="flex flex-col gap-1.5 font-normal">
                <span className="font-display text-[52px] leading-[0.9] md:text-[96px]">{film.title}</span>
                {film.subtitle && (
                  <span className="font-serif text-[32px] italic leading-[1.05] md:text-5xl">{film.subtitle}</span>
                )}
              </h2>
              {film.nepaliTitle && <span className="text-base text-ash md:text-xl">{film.nepaliTitle}</span>}
            </div>
            <div className="flex flex-col gap-5 md:gap-6 md:pt-[34px]">
              {film.quote && (
                <p className="font-serif text-2xl italic leading-[1.3] md:text-[38px] md:leading-[1.2]">“{film.quote}”</p>
              )}
              <p className="leading-relaxed text-smoke">{film.synopsis[1] ?? film.synopsis[0]}</p>
              <Link href={`/documentaries/${film.slug}`} className={`${button.light} self-start`}>
                <PlayIcon />
                Watch the film
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-line-dark pt-7">
            <span className={`text-smoke ${mono}`}>More documentaries</span>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {documentaries.slice(1).map((doc) => (
                <DocumentaryCard key={doc.slug} doc={doc} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest videos — reading */}
      {lead && (
        <section className="bg-paper text-charcoal">
          <div className={`${container} flex flex-col gap-6 py-[72px] md:gap-14 md:py-32`}>
            <SectionLabel index="03" title="Latest videos" aside={<ArrowLink href="/videos">All videos</ArrowLink>} />
            <div className="grid gap-8 md:grid-cols-[minmax(0,640px)_minmax(0,1fr)] md:items-start md:gap-16">
              <a href={videoUrl(lead.id)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3 md:gap-[18px]">
                <div className="relative">
                  <VideoThumb video={lead} sizes="(min-width: 768px) 45vw, 100vw" />
                  <span className="pointer-events-none absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-charcoal md:size-[76px]">
                    <PlayIcon className="ml-0.5 size-4 md:size-5" />
                  </span>
                </div>
                <span className={`text-stone ${mono}`}>Newest · {videoMeta(lead)}</span>
                <span className="font-serif text-[28px] leading-[1.1] md:text-[52px] md:leading-[1.02]">{lead.title}</span>
              </a>
              <div className="flex flex-col border-b border-line-light">
                {rest.map((video, index) => (
                  <VideoRow key={video.id} video={video} index={index + 2} />
                ))}
              </div>
            </div>
            <Link href="/videos" className={`${button.outlineOnLight} md:hidden`}>
              All videos
            </Link>
          </div>
        </section>
      )}

      {/* Photographs — watching */}
      <section className="bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 py-[72px] md:gap-12 md:py-32">
          <div className="px-4 md:px-14">
            <SectionLabel
              tone="dark"
              index="04"
              title="Photographs"
              aside={<ArrowLink href="/photographs">Open gallery</ArrowLink>}
            />
          </div>
          <ul className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:gap-3 md:overflow-visible md:px-14 md:pb-0">
            {strip.map(({ item, flex }, index) => (
              <li
                key={item.id}
                className={`flex w-[72vw] max-w-[320px] shrink-0 snap-start flex-col gap-2.5 md:w-auto md:max-w-none md:shrink ${flex}`}
              >
                <Link href="/photographs" className="group relative block h-[340px] overflow-hidden bg-coal md:h-[480px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 72vw"
                    placeholder="blur"
                    blurDataURL={item.blurDataURL}
                    className="photo-bw object-cover"
                  />
                </Link>
                <span className="text-xs text-smoke">
                  <em className="font-serif text-[15px] text-bone md:text-base">Fig. {index + 3}</em> — {item.category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact — reading */}
      <section className="bg-paper text-charcoal">
        <div className={`${container} flex flex-col gap-8 pb-16 pt-[72px] md:gap-16 md:pb-28 md:pt-32`}>
          <SectionLabel
            index="05"
            title="Work with Makalu Flow"
            aside={<span className={`hidden text-stone sm:inline ${mono}`}>Documentaries · Brand films · Cinematography</span>}
          />
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="flex flex-col font-normal">
              <span className="font-display text-[34px] leading-[0.95] md:text-[clamp(3rem,6.1vw,5.5rem)] md:leading-[0.9]">
                Have a story
              </span>
              <span className="font-serif text-[50px] italic leading-none tracking-[-0.02em] md:text-[clamp(4rem,7.2vw,6.5rem)]">
                worth filming?
              </span>
            </h2>
            <div className="flex flex-col gap-2 lg:items-end lg:pb-3">
              <span className={`text-stone ${mono}`}>Write to</span>
              <a href={`mailto:${site.email}`} className="font-serif text-[28px] hover:underline md:text-4xl">
                {site.email}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-[15px] text-graphite hover:underline md:text-base">
                WhatsApp {site.phoneDisplay}
              </a>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={whatsappLink("Namaste Makalu Flow! I'd like to talk about a shoot.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={button.outlineOnLight}
                >
                  WhatsApp
                </a>
                <Link href="/contact" className={button.dark}>
                  Book a shoot
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
