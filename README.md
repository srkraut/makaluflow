# Makalu Flow Creations

Website for **Makalu Flow Creations** — vlogs, documentaries and cinematography from Itahari, Sunsari, Nepal.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. The design alternates black "watching" sections (showreel, documentaries, photographs) with paper-white "reading" sections (story, latest videos, contact).

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero, the storyteller, featured documentary, latest videos, photographs, contact |
| `/documentaries` | All documentaries |
| `/documentaries/[slug]` | Film page with YouTube player, synopsis and credits |
| `/videos` | Latest uploads from the YouTube channel (refreshes hourly) |
| `/photographs` | Filterable gallery with a full-screen viewer |
| `/about` | About Makalu Flow, services, socials |
| `/contact` | Contact details and an enquiry form that opens WhatsApp or email |

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain (used for canonical links, sitemap and social previews).

## Editing content

All content lives in `src/content/`:

- `site.ts` — name, tagline, contact details, socials, services, navigation
- `documentaries.ts` — documentary titles, YouTube IDs, synopses, credits
- `gallery.ts` — gallery order, categories and alt text
- `videos.json` — synced YouTube list (durations); refresh with `npm run sync:youtube` (needs [yt-dlp](https://github.com/yt-dlp/yt-dlp))

The **Videos** section reads the channel's public RSS feed every hour, so new uploads appear without a redeploy.

### Adding photographs

1. Export a web version (long edge 2400px, JPEG quality ~80) into `public/images/gallery/`.
2. Add its width, height and a tiny blur placeholder to `src/content/gallery-meta.json`.
3. Add an entry (id, category, alt text) to `src/content/gallery.ts`.

## Deploy with Dokploy

The repo ships a production `Dockerfile` (Next.js standalone output) and a Dokploy-ready `docker-compose.yml`.

1. In Dokploy, create a **Docker Compose** service from this GitHub repository (branch `main`, compose path `./docker-compose.yml`).
2. In **Environment**, add `NEXT_PUBLIC_SITE_URL=https://your-domain.com`.
3. In **Domains**, add your domain → service `web`, container port `3000`, enable HTTPS (Let's Encrypt).
4. Deploy. Point the domain's DNS `A` record at the Dokploy server.

Run the same container locally:

```bash
docker network create dokploy-network   # once
docker compose up --build
```

(uncomment the `ports` mapping in `docker-compose.yml` to reach it on http://localhost:3000).

## Other folders

- `design/` — the design canvas source files (homepage directions and final mix)
- `Photos/` — original cover photo and logo
