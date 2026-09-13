import Image from "next/image";
import { type Video, formatDuration, videoThumbnail, videoUrl } from "@/lib/youtube";

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });
const viewsFormat = new Intl.NumberFormat("en", { notation: "compact" });

export const videoMeta = (video: Video) =>
  [
    video.publishedAt && dateFormat.format(new Date(video.publishedAt)),
    video.views !== undefined && `${viewsFormat.format(video.views)} views`,
    formatDuration(video.durationSeconds),
  ]
    .filter(Boolean)
    .join(" · ");

type VideoThumbProps = { video: Video; sizes: string; className?: string; eager?: boolean };

export function VideoThumb({ video, sizes, className = "", eager = false }: VideoThumbProps) {
  const duration = formatDuration(video.durationSeconds);
  return (
    <div className={`relative aspect-video overflow-hidden bg-fog ${className}`}>
      <Image
        src={videoThumbnail(video.id)}
        alt=""
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="photo-bw object-cover"
      />
      {duration && (
        <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 font-mono text-[11px] text-paper">{duration}</span>
      )}
    </div>
  );
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <a href={videoUrl(video.id)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3">
      <VideoThumb video={video} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <span className="font-serif text-[24px] leading-[1.12] md:text-[26px]">{video.title}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">{videoMeta(video)}</span>
    </a>
  );
}

export function VideoRow({ video, index }: { video: Video; index: number }) {
  return (
    <a
      href={videoUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 border-t border-line-light py-4 md:gap-6 md:py-[22px]"
    >
      <span className="hidden w-14 shrink-0 font-serif text-xl italic md:block">No. {String(index).padStart(2, "0")}</span>
      <VideoThumb video={video} sizes="200px" className="order-first w-32 shrink-0 md:order-last md:w-[200px]" />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
        <span className="font-serif text-xl leading-[1.15] md:text-[28px] md:leading-[1.1]">{video.title}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-stone md:text-[11px]">{videoMeta(video)}</span>
      </span>
    </a>
  );
}
