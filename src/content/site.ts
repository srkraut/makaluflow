export const site = {
  name: "Makalu Flow Creations",
  shortName: "Makalu Flow",
  tagline: "Nepal, frame by frame.",
  description:
    "Vlogs, documentaries and cinematography from Itahari, Sunsari — and the trails that lead to the foot of Makalu.",
  roles: ["Vlogger", "Documentary filmmaker", "Cinematographer"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: {
    city: "Itahari",
    district: "Sunsari",
    country: "Nepal",
    coordinates: "26.66° N  87.27° E",
  },
  email: "makaluflow@gmail.com",
  phone: "+9779815370099",
  phoneDisplay: "+977 9815370099",
  whatsapp: "9779815370099",
  youtube: {
    handle: "@makaluflowcreations",
    url: "https://www.youtube.com/@makaluflowcreations",
    channelId: "UCrxLneN_r_qfsLNBOc1njhg",
  },
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/@makaluflowcreations" },
    { label: "Instagram", href: "https://www.instagram.com/makaluflow/" },
    { label: "Facebook", href: "https://www.facebook.com/makaluflowofficial" },
    { label: "TikTok", href: "https://www.tiktok.com/@makalu_flow_creations" },
  ],
  services: [
    {
      title: "Documentaries",
      body: "Long-form films for organisations, municipalities and national parks — research, filming, narration and edit.",
    },
    {
      title: "Cinematography",
      body: "Camera and drone work for brand films, events and productions across eastern Nepal and beyond.",
    },
    {
      title: "Travel & destination films",
      body: "Treks, hidden places and local culture, filmed as stories that make people want to go.",
    },
  ],
} as const;

export const nav = [
  { label: "Documentaries", href: "/documentaries" },
  { label: "Videos", href: "/videos" },
  { label: "Photographs", href: "/photographs" },
  { label: "About", href: "/about" },
] as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
