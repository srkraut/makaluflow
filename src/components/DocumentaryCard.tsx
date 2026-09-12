import Image from "next/image";
import Link from "next/link";
import { type Documentary, documentaryName, youtubeThumbnail } from "@/content/documentaries";
import { photo } from "@/content/gallery";

export function documentaryImage(doc: Documentary) {
  if (!doc.cover) return { src: youtubeThumbnail(doc.youtubeId) };
  const cover = photo(doc.cover);
  return { src: cover.src, placeholder: "blur" as const, blurDataURL: cover.blurDataURL };
}

export const documentaryMeta = (doc: Documentary) =>
  `${doc.madeFor ? `For ${doc.madeFor}` : doc.location} · ${doc.year}`;

export function DocumentaryCard({ doc }: { doc: Documentary }) {
  return (
    <Link href={`/documentaries/${doc.slug}`} className="group flex flex-col gap-3.5">
      <div className="relative aspect-video overflow-hidden bg-coal">
        <Image
          {...documentaryImage(doc)}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="photo-bw object-cover"
        />
        <span className="absolute bottom-2.5 right-2.5 bg-black/80 px-1.5 py-0.5 font-mono text-[11px] text-bone">
          {doc.duration}
        </span>
      </div>
      <span className="text-[17px] font-semibold leading-snug">{documentaryName(doc)}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">{documentaryMeta(doc)}</span>
    </Link>
  );
}
