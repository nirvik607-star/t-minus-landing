import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nirvik607-star.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/v1", "/dev/", "/api/"] }],
    sitemap: `${origin}${basePath}/sitemap.xml`,
  };
}
