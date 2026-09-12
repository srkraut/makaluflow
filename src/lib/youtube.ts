import staticVideos from "@/content/videos.json";
import { site } from "@/content/site";

export type Video = {
  id: string;
  title: string;
  durationSeconds: number | null;
  publishedAt?: string;
  views?: number;
};

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtube.channelId}`;

const decodeEntities = (text: string) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

export const cleanTitle = (title: string) =>
  title
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s*\|\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const tag = (entry: string, pattern: RegExp) => entry.match(pattern)?.[1];

/**
 * Latest uploads from the channel's public RSS feed, refreshed hourly.
 * Durations come from src/content/videos.json (npm run sync:youtube);
 * if the feed can't be reached the synced list is used instead.
 */
export async function getLatestVideos(limit = 12): Promise<Video[]> {
  const synced = staticVideos as Video[];
  const known = new Map(synced.map((video) => [video.id, video]));

  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`YouTube feed responded ${response.status}`);
    const xml = await response.text();

    const fromFeed = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]): Video | null => {
        const id = tag(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
        const link = tag(entry, /<link rel="alternate" href="([^"]+)"/) ?? "";
        if (!id || link.includes("/shorts/")) return null;
        const views = tag(entry, /<media:statistics views="(\d+)"/);
        return {
          id,
          title: cleanTitle(decodeEntities(tag(entry, /<title>([^<]*)<\/title>/) ?? "")),
          durationSeconds: known.get(id)?.durationSeconds ?? null,
          publishedAt: tag(entry, /<published>([^<]+)<\/published>/),
          views: views ? Number(views) : undefined,
        };
      })
      .filter((video): video is Video => video !== null);

    const seen = new Set(fromFeed.map((video) => video.id));
    return [...fromFeed, ...synced.filter((video) => !seen.has(video.id))].slice(0, limit);
  } catch (error) {
    console.error("Falling back to synced YouTube videos:", error);
    return synced.slice(0, limit);
  }
}

export const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
};

export const videoThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
