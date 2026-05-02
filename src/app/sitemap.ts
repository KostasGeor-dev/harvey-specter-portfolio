import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://h.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    client.fetch<{ slug: string }[]>(
      `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
      {},
      { cache: "no-store" }
    ),
    client.fetch<{ slug: string }[]>(
      `*[_type == "project" && defined(slug.current)]{"slug": slug.current}`,
      {},
      { cache: "no-store" }
    ),
  ]);

  return [
    { url: siteUrl,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${siteUrl}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...posts.map(({ slug }) => ({
      url: `${siteUrl}/news/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
