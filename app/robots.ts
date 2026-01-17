import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register", "/forgot-password", "/reset-password", "/admin"],
    },
    sitemap: "https://cyberdragons.in/sitemap.xml",
  };
}
