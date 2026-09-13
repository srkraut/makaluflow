import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentaryCard } from "@/components/DocumentaryCard";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageTitle } from "@/components/PageTitle";
import { SectionLabel } from "@/components/SectionLabel";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import {
  documentaries,
  documentaryName,
  getDocumentary,
  isoDuration,
  runtimeLabel,
  youtubeThumbnail,
  youtubeWatchUrl,
} from "@/content/documentaries";
import { site } from "@/content/site";
import { container } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return documentaries.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<"/documentaries/[slug]">): Promise<Metadata> {
  const doc = getDocumentary((await params).slug);
  if (!doc) return {};
  const title = documentaryName(doc);
  return {
    title,
    description: doc.synopsis[0],
    alternates: { canonical: `/documentaries/${doc.slug}` },
    openGraph: {
      title,
      description: doc.synopsis[0],
      type: "video.other",
      images: [{ url: youtubeThumbnail(doc.youtubeId), width: 1280, height: 720 }],
    },
  };
}

export default async function DocumentaryPage({ params }: PageProps<"/documentaries/[slug]">) {
  const doc = getDocumentary((await params).slug);
  if (!doc) notFound();

  const name = documentaryName(doc);
  const others = documentaries.filter((item) => item.slug !== doc.slug);
  const details = [
    { label: "Released", value: String(doc.year) },
    { label: "Runtime", value: runtimeLabel(doc.duration) },
    { label: "Location", value: doc.location },
    ...(doc.series ? [{ label: "Series", value: doc.series }] : []),
    ...(doc.madeFor ? [{ label: "Made for", value: doc.madeFor }] : []),
    ...(doc.credits ?? []).map((credit) => ({ label: credit.role, value: credit.name })),
  ];

  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: doc.synopsis.join(" "),
    thumbnailUrl: [youtubeThumbnail(doc.youtubeId)],
    uploadDate: doc.publishedAt,
    duration: isoDuration(doc.duration),
    embedUrl: `https://www.youtube.com/embed/${doc.youtubeId}`,
    contentUrl: youtubeWatchUrl(doc.youtubeId),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <section className="bg-ink">
        <div className={`${container} flex flex-col gap-5 pb-12 pt-8 md:gap-6 md:pb-16 md:pt-12`}>
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.12em] text-smoke md:text-xs">
            <Link href="/documentaries" className="hover:text-bone">
              DOCUMENTARIES
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-bone">{doc.title.toUpperCase()}</span>
          </nav>
          <YouTubePlayer id={doc.youtubeId} title={name} poster={youtubeThumbnail(doc.youtubeId)} />
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.12em] text-smoke md:text-xs">
            <span>{doc.kicker?.toUpperCase() ?? `${doc.location.toUpperCase()} · ${doc.year}`}</span>
            <a
              href={youtubeWatchUrl(doc.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-bone hover:text-ash"
            >
              WATCH ON YOUTUBE <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper text-charcoal">
        <div className={`${container} grid gap-14 py-16 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-20 md:py-28`}>
          <div className="flex flex-col gap-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone md:text-xs">
              Documentary · {doc.year} · {runtimeLabel(doc.duration)}
            </span>
            <PageTitle
              display={doc.title}
              serif={doc.subtitle}
              fit="word"
              max="6.5rem"
              serifScale={0.58}
              serifClassName="mt-2 leading-[1.02]"
            />
            {doc.nepaliTitle && <p className="text-xl text-graphite">{doc.nepaliTitle}</p>}
            {doc.quote && (
              <blockquote className="font-serif text-[28px] italic leading-[1.22] md:text-[38px]">“{doc.quote}”</blockquote>
            )}
            <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-graphite">
              {doc.synopsis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <dl className="flex flex-col self-start border-b border-line-light">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between gap-6 border-t border-line-light py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone">{detail.label}</dt>
                <dd className="text-right text-[15px]">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink">
        <div className={`${container} flex flex-col gap-10 py-16 md:py-24`}>
          <SectionLabel tone="dark" index="—" title="More documentaries" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <DocumentaryCard key={item.slug} doc={item} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObject).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
