import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anbuselvan-annamalai.com";

// Define image sitemap interfaces
interface ImageSitemap {
  url: string;
  title?: string;
  caption?: string;
  license_url?: string;
}

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  images?: ImageSitemap[];
};

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

// Function to get all routes from the file system
function getAllRoutes() {
  const appDirectory = path.join(process.cwd(), "src/app");
  const mainRoutes: string[] = [];
  const reviewRoutes: string[] = [];

  // Helper function to recursively get routes
  function getRoutesFromDir(dir: string, basePath: string = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip files and directories that don't represent routes
      if (
        entry.name.startsWith("_") ||
        entry.name.startsWith(".") ||
        entry.name === "api" ||
        entry.name === "admin" ||
        entry.name === "sitemap.ts" ||
        entry.name === "layout.tsx" ||
        entry.name === "page.tsx" ||
        entry.name === "globals.css" ||
        entry.name.endsWith(".ico") ||
        entry.name.endsWith(".png") ||
        entry.name.endsWith(".svg") ||
        entry.name.endsWith(".json") ||
        (entry.name.endsWith(".ts") && !entry.name.includes("sitemap"))
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        const newBasePath = basePath ? `${basePath}/${entry.name}` : entry.name;

        // Check if this directory contains a page.tsx file (indicating it's a route)
        const hasPage = fs.existsSync(path.join(dir, entry.name, "page.tsx"));

        if (hasPage) {
          if (newBasePath.startsWith("reviews")) {
            reviewRoutes.push(newBasePath);
          } else {
            mainRoutes.push(newBasePath);
          }
        }

        // Recursively check subdirectories
        getRoutesFromDir(path.join(dir, entry.name), newBasePath);
      }
    }
  }

  getRoutesFromDir(appDirectory);

  // Add the root route
  mainRoutes.push("");

  return { mainRoutes, reviewRoutes };
}

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

// Function to generate XML sitemap with images
async function generateXMLSitemap() {
  console.log("Starting sitemap generation...");
  const { mainRoutes, reviewRoutes } = getAllRoutes();
  let allEntries: SitemapEntry[] = [];

  // Add main routes
  allEntries = [
    ...mainRoutes.map((route) => {
      const url = route === "" ? baseUrl : `${baseUrl}/${route}`;
      const images = getImagesForRoute(route);

      return {
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        ...(images && { images }),
      } as SitemapEntry;
    }),
    // Add review routes
    ...reviewRoutes.map(
      (route) =>
        ({
          url: `${baseUrl}/${route}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: route === "reviews" ? 0.9 : 0.8,
        } as SitemapEntry)
    ),
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${
      entry.lastModified instanceof Date
        ? entry.lastModified.toISOString()
        : new Date().toISOString()
    }</lastmod>
    <changefreq>${entry.changeFrequency || "monthly"}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
    ${
      entry.images
        ? entry.images
            .map(
              (image: ImageSitemap) => `    <image:image>
      <image:loc>${image.url}</image:loc>
      ${image.title ? `      <image:title>${image.title}</image:title>` : ""}
      ${
        image.caption
          ? `      <image:caption>${image.caption}</image:caption>`
          : ""
      }
      ${
        image.license_url
          ? `      <image:license>${image.license_url}</image:license>`
          : ""
      }
    </image:image>`
            )
            .join("\n")
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  // Write the XML sitemap
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
  console.log("Sitemap written to public/sitemap.xml");
}

// Main execution
generateXMLSitemap()
  .then(() => console.log("✅ Sitemap generated successfully!"))
  .catch((error: Error) => {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  });

// Next.js sitemap function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { mainRoutes, reviewRoutes } = getAllRoutes();

  // Generate entries for main routes
  const mainEntries = mainRoutes.map((route) => {
    const url = route === "" ? baseUrl : `${baseUrl}/${route}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: (route === ""
        ? "weekly"
        : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: route === "" ? 1.0 : 0.8,
    };
  });

  // Generate entries for review routes
  const reviewEntries = reviewRoutes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency:
      "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route === "reviews" ? 0.9 : 0.8,
  }));

  // Generate XML sitemap with images
  await generateXMLSitemap();

  // Return combined entries for Next.js sitemap
  return [...mainEntries, ...reviewEntries];
}
