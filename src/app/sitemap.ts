import { MetadataRoute } from "next";
import { getAllRoutes } from "@/lib/utils";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anbuselvan-annamalai.com";

// Define image sitemap interfaces
interface ImageSitemap {
  url: string;
  title?: string;
  caption?: string;
  license_url?: string;
}

// Define the main site images
const mainImages = {
  home: [
    {
      url: `${baseUrl}/images/anbuselvan-annamalai.png`,
      title: "Anbuselvan Annamalai - Technology Mentor & Entrepreneur",
      caption: "Anbuselvan Annamalai's profile picture",
    },
    {
      url: `${baseUrl}/images/anbuselvan-annamalai-og.png`,
      title: "Anbuselvan Annamalai - Social Share Image",
      caption: "Anbuselvan Annamalai's social media preview image",
    },
  ],
  about: [
    {
      url: `${baseUrl}/images/sessions/anbuselvan-annamalai-vit-talk.jpg`,
      title: "Anbuselvan Annamalai speaking at VIT",
      caption: "Guest lecture at VIT University",
    },
    {
      url: `${baseUrl}/images/sessions/anbuselvan-annamalai-freshworks-talk.jpg`,
      title: "Anbuselvan Annamalai at Freshworks",
      caption: "Speaking at Freshworks FSSA",
    },
    {
      url: `${baseUrl}/images/sessions/anbuselvan-annamalai-kongu-talks-1.jpg`,
      title: "Workshop at Kongu Engineering College",
      caption: "Conducting React Development Workshop",
    },
  ],
};

// Helper function to get images for a route
function getImagesForRoute(route: string): ImageSitemap[] | undefined {
  if (route === "") {
    return mainImages.home;
  }
  if (route === "about") {
    return mainImages.about;
  }
  return undefined;
}

// Next.js sitemap function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { mainRoutes, reviewRoutes } = getAllRoutes();

  // Generate entries for main routes
  const mainEntries = mainRoutes.map((route: string) => {
    const url = route === "" ? baseUrl : `${baseUrl}/${route}`;
    const images = getImagesForRoute(route);

    return {
      url,
      lastModified: new Date(),
      changeFrequency: (route === ""
        ? "weekly"
        : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: route === "" ? 1.0 : 0.8,
      ...(images && { images }),
    };
  });

  // Generate entries for review routes
  const reviewEntries = reviewRoutes.map((route: string) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency:
      "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route === "reviews" ? 0.9 : 0.8,
  }));

  // Return combined entries for Next.js sitemap
  return [...mainEntries, ...reviewEntries];
}
