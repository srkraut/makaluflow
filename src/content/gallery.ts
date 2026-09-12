import meta from "./gallery-meta.json";

export const galleryCategories = ["Mountains & lakes", "Hills & meadows", "People & places", "Night", "From above"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

type Entry = { id: string; alt: string; category: GalleryCategory };

export type GalleryPhoto = Entry & { src: string; width: number; height: number; blurDataURL: string };

// Files live in public/images/gallery (web versions of the originals). Order is the gallery order.
const entries: Entry[] = [
  { id: "dsc07493", category: "Mountains & lakes", alt: "A glacial lake with floating ice below a snow-covered Himalayan peak" },
  { id: "dsc07288", category: "People & places", alt: "An elderly man in a floral shirt carrying a rolled bamboo mat on his shoulder" },
  { id: "dsc00710", category: "Mountains & lakes", alt: "Prayer flags above a still lake reflecting a lone tree and blue sky" },
  { id: "mak07042", category: "Hills & meadows", alt: "A braided river winding through a misty valley" },
  { id: "dsc07415", category: "Mountains & lakes", alt: "A waterfall pouring down layered grey rock, with a person at its base" },
  { id: "dsc07378", category: "Mountains & lakes", alt: "Two trekkers shaking hands on the snowy shore of a mountain lake" },
  { id: "dji-0169", category: "From above", alt: "Terraced green fields and scattered houses on a hillside, seen from a drone" },
  { id: "mak07051", category: "Hills & meadows", alt: "A black cow resting in a green meadow under low cloud" },
  { id: "dsc07394", category: "Night", alt: "The Milky Way rising over a dark ridge and snow peaks" },
  { id: "dsc07277", category: "People & places", alt: "A woman carrying a doko basket up stone steps through a village" },
  { id: "dsc07421", category: "Mountains & lakes", alt: "A stone chorten and prayer poles beneath snow peaks" },
  { id: "mak07055", category: "Hills & meadows", alt: "A stone shrine wrapped in red cloth on a grassy hilltop" },
  { id: "dsc07355-edit", category: "Mountains & lakes", alt: "First light turning a mountain range red above a shadowed valley" },
  { id: "img-8680", category: "People & places", alt: "A roadside sugarcane juice cart and its vendor in the evening light" },
  { id: "dsc07504", category: "Mountains & lakes", alt: "A frozen lake in a bowl of snow-dusted mountains" },
  { id: "mak07060", category: "Hills & meadows", alt: "Cattle grazing on a misty hillside" },
  { id: "dsc2488", category: "Night", alt: "A temple lit up in gold lights at night" },
  { id: "dsc07425", category: "Mountains & lakes", alt: "A trekker resting on rocks below a vast snow-covered massif" },
  { id: "mak07044", category: "People & places", alt: "Traditional painted houses on a green hillside" },
  { id: "dsc07353", category: "Hills & meadows", alt: "Layered blue hills fading into a pink dusk horizon" },
  { id: "mak07073", category: "People & places", alt: "Motorcycles lined up beside a hilltop pond, mirrored in the water" },
  { id: "dsc07362-edit", category: "Mountains & lakes", alt: "A man in a hat standing on a rocky summit above rolling hills and cloud" },
  { id: "mak07046", category: "Hills & meadows", alt: "Rolling green meadows fading into mist" },
  { id: "dsc07428", category: "Mountains & lakes", alt: "Two trekkers on a stony trail below snow peaks" },
  { id: "dji-0320", category: "From above", alt: "A busy town junction with traffic and rooftops, seen from a drone" },
  { id: "mak07047", category: "Hills & meadows", alt: "A tractor crossing a green hill under towering clouds" },
  { id: "dsc07397", category: "Night", alt: "A valley under a deep blue night sky, ringed by snow peaks" },
  { id: "mak07056", category: "Hills & meadows", alt: "A weathered stone shrine with red cloth on a grassy slope" },
  { id: "dsc07412", category: "Mountains & lakes", alt: "Sun flaring into a glacial valley between snowy slopes" },
  { id: "mak07058", category: "People & places", alt: "A red and blue house and a tractor on a green hilltop" },
  { id: "dsc00708", category: "Mountains & lakes", alt: "A mirror-still lake reflecting a lone tree under a clear blue sky" },
  { id: "mak07053", category: "Hills & meadows", alt: "Cattle grazing in a meadow edged with tall trees" },
  { id: "mak07049", category: "Hills & meadows", alt: "A green hill beneath billowing white clouds" },
];

const dimensions = meta as Record<string, { width: number; height: number; blurDataURL: string }>;

export const gallery: GalleryPhoto[] = entries.map((entry) => ({
  ...entry,
  src: `/images/gallery/${entry.id}.jpg`,
  ...dimensions[entry.id],
}));

export function photo(id: string): GalleryPhoto {
  const match = gallery.find((item) => item.id === id);
  if (!match) throw new Error(`Unknown gallery photo: ${id}`);
  return match;
}
