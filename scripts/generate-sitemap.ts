import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import dotenv from "dotenv";
import { getAllPosts } from "../src/lib/blog";

// Load environment variables
dotenv.config();

export const baseUrl =
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

// Function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
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
        (entry.name.endsWith(".ts") && !entry.name.includes("sitemap")) ||
        entry.name.startsWith("[") // Skip dynamic route directories
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
export async function generateXMLSitemap() {
  console.log("Starting sitemap generation...");
  const { mainRoutes, reviewRoutes } = getAllRoutes();
  let allEntries: SitemapEntry[] = [];

  // Get all blog posts
  const blogPosts = await getAllPosts();
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
    priority: 0.8,
  }));

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
    // Add blog posts
    ...blogEntries,
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
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
      <image:loc>${escapeXml(image.url)}</image:loc>
      ${
        image.title
          ? `      <image:title>${escapeXml(image.title)}</image:title>`
          : ""
      }
      ${
        image.caption
          ? `      <image:caption>${escapeXml(image.caption)}</image:caption>`
          : ""
      }
      ${
        image.license_url
          ? `      <image:license>${escapeXml(
              image.license_url
            )}</image:license>`
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

  // Only write to filesystem when not in Vercel deployment environment
  if (process.env.VERCEL !== "1") {
    try {
      fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
      console.log("Sitemap written to public/sitemap.xml");
    } catch (error) {
      console.error("Error writing sitemap to filesystem:", error);
      // Continue execution without failing build
    }
  } else {
    console.log("Skipping sitemap file writing in Vercel environment");
  }

  return xml;
}

// Main execution - only run when script is called directly
if (import.meta.url.endsWith("generate-sitemap.ts")) {
  generateXMLSitemap()
    .then(() => console.log("✅ Sitemap generated successfully!"))
    .catch((error: Error) => {
      console.error("Error generating sitemap:", error);
      process.exit(1);
    });
}

// Next.js sitemap function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { mainRoutes, reviewRoutes } = getAllRoutes();
  const blogPosts = await getAllPosts();

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

  // Generate entries for blog posts
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency:
      "monthly" as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: 0.8,
  }));

  // Return combined entries for Next.js sitemap
  return [...mainEntries, ...reviewEntries, ...blogEntries];
}
