import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anbuselvan-annamalai.com";

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

// This function generates the sitemap index
export function generateSitemapIndex(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/sitemap-0.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-1.xml`,
      lastModified: new Date(),
    },
  ];
}

// This function generates individual sitemaps
export async function generateSitemaps() {
  // Return array of sitemap segments
  return [
    {
      id: 0, // Main pages
    },
    {
      id: 1, // Review pages
    },
  ];
}

// Default sitemap function for each segment
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const { mainRoutes, reviewRoutes } = getAllRoutes();

  // Main pages sitemap
  if (id === 0) {
    return mainRoutes.map((route) => {
      // Handle root URL
      const url = route === "" ? baseUrl : `${baseUrl}/${route}`;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      };
    });
  }

  // Review pages sitemap
  if (id === 1) {
    return reviewRoutes.map((route) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "reviews" ? 0.9 : 0.8,
    }));
  }

  return [];
}
