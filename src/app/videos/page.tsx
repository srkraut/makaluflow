import type { Metadata } from "next";
import { PlayIcon } from "@/components/icons";
import { PageTitle } from "@/components/PageTitle";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoCard, VideoThumb, videoMeta } from "@/components/VideoCard";
import { site } from "@/content/site";
import { getLatestVideos, videoUrl } from "@/lib/youtube";
import { button, container } from "@/lib/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Videos",
  description: "Vlogs, treks, conversations and reports from Nepal on the Makalu Flow Creations YouTube channel.",
};

export default async function VideosPage() {
  const [lead, ...rest] = await getLatestVideos(24);

  return (
    <div className="bg-paper text-charcoal">
      <section className={`${container} flex flex-col gap-10 pb-12 pt-12 md:gap-16 md:pb-20 md:pt-20`}>
        <SectionLabel
          index="01"
          title="Videos"
          aside={<span className="font-mono text-[11px] tracking-[0.12em] text-stone md:text-xs">{site.youtube.handle.toUpperCase()}</span>}
        />
        <div className="flex flex-col gap-6 md:gap-8">
          <PageTitle display="Latest from" serif="the channel." />
          <div className="flex max-w-md flex-col gap-5">
            <p className="text-base leading-relaxed text-graphite md:text-[17px]">
              Vlogs, treks, conversations and reports — new uploads appear here automatically.
            </p>
            <a
              href={`${site.youtube.url}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button.dark} self-start`}
            >
              <PlayIcon />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {lead ? (
        <section className={`${container} flex flex-col gap-14 pb-24 md:gap-20 md:pb-32`}>
          <a
            href={videoUrl(lead.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-6 border-t-[1.5px] border-charcoal pt-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-14 md:pt-12"
          >
            <VideoThumb video={lead} eager sizes="(min-width: 768px) 58vw, 100vw" />
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone md:text-xs">Newest · {videoMeta(lead)}</span>
              <span className="font-serif text-[38px] leading-[1.02] tracking-[-0.01em] md:text-[56px]">{lead.title}</span>
            </div>
          </a>
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      ) : (
        <section className={`${container} pb-24`}>
          <p className="text-lg text-graphite">
            Videos couldn&apos;t be loaded right now.{" "}
            <a href={site.youtube.url} className="underline">
              Watch on YouTube
            </a>
            .
          </p>
        </section>
      )}
    </div>
  );
}
