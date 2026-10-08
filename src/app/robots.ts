import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Demonstration site — prevent indexing by default.
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: undefined,
    host: undefined,
  };
}
