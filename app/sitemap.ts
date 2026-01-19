import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cyberdragons.in",
      lastModified: new Date(),
    },
    {
      url: "https://www.cyberdragons.in/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.cyberdragons.in/courses",
      lastModified: new Date(),
    },
    {
      url: "https://www.cyberdragons.in/roadmap",
      lastModified: new Date(),
    },
    {
      url: "https://www.cyberdragons.in/notes",
      lastModified: new Date(),
    },
    {
      url: "https://www.cyberdragons.in/contact",
      lastModified: new Date(),
    },
  ];
}
