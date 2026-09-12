import type { MetadataRoute } from "next";
import { documentaries } from "@/content/documentaries";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/documentaries`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/videos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/photographs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const films: MetadataRoute.Sitemap = documentaries.map((doc) => ({
    url: `${site.url}/documentaries/${doc.slug}`,
    lastModified: new Date(doc.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...films];
}
