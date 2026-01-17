import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cyberdragons.in",
      lastModified: new Date(),
    },
    {
      url: "https://cyberdragons.in/about",
      lastModified: new Date(),
    },
    {
      url: "https://cyberdragons.in/courses",
      lastModified: new Date(),
    },
    {
      url: "https://cyberdragons.in/roadmap",
      lastModified: new Date(),
    },
    {
      url: "https://cyberdragons.in/notes",
      lastModified: new Date(),
    },
    {
      url: "https://cyberdragons.in/contact",
      lastModified: new Date(),
    },
  ];
}
