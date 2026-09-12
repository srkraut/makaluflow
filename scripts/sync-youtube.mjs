#!/usr/bin/env node
// Refreshes src/content/videos.json from the YouTube channel.
// Requires yt-dlp (https://github.com/yt-dlp/yt-dlp). Usage: npm run sync:youtube [limit]
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHANNEL_VIDEOS = "https://www.youtube.com/@makaluflowcreations/videos";
const limit = Number(process.argv[2] ?? 40);

const output = execFileSync(
  "yt-dlp",
  [
    "--no-warnings",
    "--flat-playlist",
    "--playlist-end",
    String(limit),
    "--print",
    "%(id)s\t%(duration)s\t%(title)s",
    CHANNEL_VIDEOS,
  ],
  { encoding: "utf8" },
);

const cleanTitle = (title) =>
  title
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s*\|\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const videos = output
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [id, duration, ...title] = line.split("\t");
    return { id, title: cleanTitle(title.join("\t")), durationSeconds: Number(duration) || null };
  })
  // Skip very short clips; they read as teasers rather than videos.
  .filter((video) => video.durationSeconds === null || video.durationSeconds >= 60);

writeFileSync(
  new URL("../src/content/videos.json", import.meta.url),
  `${JSON.stringify(videos, null, 2)}\n`,
);
console.log(`Saved ${videos.length} videos to src/content/videos.json`);
