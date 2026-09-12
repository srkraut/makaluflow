"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import { galleryCategories, type GalleryPhoto } from "@/content/gallery";

const ALL = "All";
const pad = (n: number) => String(n).padStart(2, "0");

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = category === ALL ? photos : photos.filter((item) => item.category === category);
  const count = visible.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((index) => (index === null ? null : (index + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : visible[openIndex];

  return (
    <>
      <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-2">
        {[ALL, ...galleryCategories].map((name) => {
          const active = name === category;
          const total = name === ALL ? photos.length : photos.filter((item) => item.category === name).length;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(name)}
              className={`flex h-11 items-center gap-2 rounded-full px-5 text-sm transition-colors ${
                active ? "bg-bone font-bold text-ink" : "border border-line-dark text-ash hover:border-smoke hover:text-bone"
              }`}
            >
              {name}
              <span className={`font-mono text-[11px] ${active ? "text-stone" : "text-dim"}`}>{total}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 columns-1 gap-3 sm:columns-2 md:mt-12 lg:columns-3">
        {visible.map((item, index) => (
          <li key={item.id} className="mb-3 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View larger: ${item.alt}`}
              className="group relative block w-full overflow-hidden bg-coal"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                placeholder="blur"
                blurDataURL={item.blurDataURL}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="photo-bw h-auto w-full"
              />
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[11px] tracking-[0.1em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                FIG. {pad(index + 1)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && openIndex !== null && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[60] flex flex-col bg-night/95">
          <div className="flex items-center justify-between gap-4 px-4 py-3 font-mono text-[11px] tracking-[0.1em] text-ash md:px-8 md:py-5 md:text-xs">
            <span>
              FIG. {pad(openIndex + 1)} / {pad(count)} · {current.category.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-dark text-bone hover:border-smoke"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              fill
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={current.blurDataURL}
              className="object-contain px-4 md:px-24"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-bone hover:bg-black md:left-6"
                >
                  <ArrowRightIcon className="size-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-bone hover:bg-black md:right-6"
                >
                  <ArrowRightIcon className="size-5" />
                </button>
              </>
            )}
          </div>
          <p className="px-4 pb-6 pt-4 text-center font-serif text-lg italic text-fog md:pb-8 md:text-2xl">{current.alt}</p>
        </div>
      )}
    </>
  );
}
