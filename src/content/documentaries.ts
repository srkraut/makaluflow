export type Documentary = {
  slug: string;
  title: string;
  subtitle?: string;
  nepaliTitle?: string;
  youtubeId: string;
  duration: string;
  publishedAt: string;
  year: number;
  location: string;
  kicker?: string;
  /** Gallery photo id shown instead of the YouTube thumbnail. */
  cover?: string;
  series?: string;
  madeFor?: string;
  quote?: string;
  synopsis: string[];
  credits?: { role: string; name: string }[];
};

export const documentaries: Documentary[] = [
  {
    slug: "makalu",
    title: "Makalu",
    subtitle: "Fascinating Journey of Two Brothers",
    nepaliTitle: "जिवनमा एक पटक जानै पर्ने ठाउँ मकालु",
    youtubeId: "uECBTgRZzxw",
    duration: "1:19:58",
    publishedAt: "2024-06-29",
    year: 2024,
    location: "Makalu Barun, Sankhuwasabha",
    kicker: "Dharan to Makalu Base Camp · 15 days",
    cover: "dsc07493",
    series: "Fascinating Journey of Two Brothers",
    quote: "The beauty of this place is undefined, but we tried our best to capture the scenic world of Makalu.",
    synopsis: [
      "Makalu is the fifth-highest mountain on Earth, rising to 8,485 metres in Sankhuwasabha district — inside Makalu Barun National Park, 19 km southeast of Everest on the Nepal–China border.",
      "The journey from Dharan to Makalu Base Camp took fifteen days, walked around the time of Dashain. The film was made as a guide for future travellers, covering the knowns and unknowns of the trail.",
    ],
  },
  {
    slug: "shiva-dhara",
    title: "Shiva Dhara",
    subtitle: "Nepal's Most Mysterious Place",
    youtubeId: "goN1e8jo_PM",
    duration: "37:47",
    publishedAt: "2024-08-16",
    year: 2024,
    location: "Makalu Rural Municipality, Sankhuwasabha",
    series: "Fascinating Journey of Two Brothers",
    synopsis: [
      "High in the Himalaya, among the clouds, Shiva Dhara is a place of rare beauty and spiritual calm.",
      "Two caves — Shiva Dhara and Parvati Gufa — sit in a towering cliff above Yangle Kharka, the “city of stones”, in ward 2 of Makalu Rural Municipality. Buddhists revere the site as Mahaguru, Kirat communities as Sumnima Paruhang, and Hindus as Lord Shiva and Parvati.",
    ],
  },
  {
    slug: "makalu-barun-national-park",
    title: "Makalu Barun National Park",
    subtitle: "MBNP Documentary (English)",
    youtubeId: "1UY3Nu4bM4s",
    duration: "25:28",
    publishedAt: "2021-02-05",
    year: 2021,
    location: "Makalu Barun National Park",
    synopsis: [
      "An English-language documentary on Makalu Barun National Park and the livelihoods being built around ecotourism.",
    ],
  },
  {
    slug: "bhojpur-kalpa",
    title: "Bhojpur",
    subtitle: "Documentary of Kalpa",
    youtubeId: "DkxUlXygS_c",
    duration: "10:29",
    publishedAt: "2023-10-08",
    year: 2023,
    location: "Bhojpur",
    madeFor: "Kalpa",
    synopsis: ["A short documentary filmed in Bhojpur for Kalpa (kalpanepal.org)."],
    credits: [
      { role: "Script", name: "Samrat Thapa" },
      { role: "DOP, narration & edit", name: "Makalu Flow" },
      { role: "Organisation", name: "Kalpa" },
    ],
  },
  {
    slug: "child-friendly-ramdhuni",
    title: "Child-Friendly Ramdhuni",
    nepaliTitle: "रामधुनी नगरपालिका बालमैत्री सम्बन्धि डकुमेन्ट्री",
    youtubeId: "z-UVNx06QSg",
    duration: "44:10",
    publishedAt: "2023-11-28",
    year: 2023,
    location: "Ramdhuni, Sunsari",
    madeFor: "Ramdhuni Municipality",
    synopsis: ["A documentary for Ramdhuni Municipality on its work towards becoming a child-friendly local government."],
  },
];

export const featuredDocumentary = documentaries[0];

export const getDocumentary = (slug: string) => documentaries.find((doc) => doc.slug === slug);

export const documentaryName = (doc: Documentary) => (doc.subtitle ? `${doc.title} — ${doc.subtitle}` : doc.title);

const toSeconds = (duration: string) =>
  duration.split(":").map(Number).reduce((total, part) => total * 60 + part, 0);

export const runtimeLabel = (duration: string) => {
  const minutes = Math.round(toSeconds(duration) / 60);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} hr ${minutes % 60} min` : `${minutes} min`;
};

export const isoDuration = (duration: string) => {
  const seconds = toSeconds(duration);
  return `PT${Math.floor(seconds / 3600)}H${Math.floor((seconds % 3600) / 60)}M${seconds % 60}S`;
};

export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
