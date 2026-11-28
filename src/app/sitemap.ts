import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nirvik607-star.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string) => `${origin}${basePath}${path}`;
  return [
    { url: at("/"), priority: 1 },
    { url: at("/privacy"), priority: 0.2 },
    { url: at("/terms"), priority: 0.2 },
  ];
}
