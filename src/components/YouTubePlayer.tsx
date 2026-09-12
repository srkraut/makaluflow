"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@/components/icons";

type YouTubePlayerProps = { id: string; title: string; poster: string };

/** Shows a poster until played, so YouTube's player only loads when someone wants it. */
export function YouTubePlayer({ id, title, poster }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-coal">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`} className="group absolute inset-0">
          <Image src={poster} alt="" fill loading="eager" sizes="(min-width: 1440px) 1328px, 100vw" className="photo-bw object-cover" />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-bone/85 bg-black/35 text-bone transition-transform group-hover:scale-105 md:size-[104px]">
            <PlayIcon className="ml-1 size-5 md:size-7" />
          </span>
        </button>
      )}
    </div>
  );
}
