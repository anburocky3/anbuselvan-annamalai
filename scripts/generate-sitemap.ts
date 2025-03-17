import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get the base URL from environment variables
const baseUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anbuselvan-annamalai.com";

// Define types
type RouteCollection = {
  mainRoutes: string[];
  reviewRoutes: string[];
};

// Function to get all routes from the file system
function getAllRoutes(): RouteCollection {
  const appDirectory: string = path.join(process.cwd(), "src/app");
  const mainRoutes: string[] = [];
  const reviewRoutes: string[] = [];

  // Helper function to recursively get routes
  function getRoutesFromDir(dir: string, basePath: string = ""): void {
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

// Function to generate a random date within the last month
function getRandomDate(): string {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const randomTimestamp =
    oneMonthAgo.getTime() +
    Math.random() * (now.getTime() - oneMonthAgo.getTime());
  return new Date(randomTimestamp).toISOString();
}

// Function to generate a random priority between 0.5 and 1.0
function getRandomPriority(): number {
  return (Math.floor(Math.random() * 6) + 5) / 10; // 0.5 to 1.0 in steps of 0.1
}

// Function to randomly select a change frequency
function getRandomChangeFreq(): string {
  const frequencies = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ] as const;

  return frequencies[Math.floor(Math.random() * frequencies.length)];
}

// Generate the sitemap XML content
function generateSitemapXml(): string {
  const { mainRoutes, reviewRoutes } = getAllRoutes();
  const allRoutes: string[] = [...mainRoutes, ...reviewRoutes];

  // Shuffle the routes for randomness
  allRoutes.sort(() => Math.random() - 0.5);

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add each route to the sitemap
  allRoutes.forEach((route) => {
    const url = route === "" ? baseUrl : `${baseUrl}/${route}`;
    const lastmod = getRandomDate();
    const changefreq = getRandomChangeFreq();
    const priority = getRandomPriority();

    xmlContent += `
<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`;
  });

  xmlContent += `
</urlset>`;

  return xmlContent;
}

// Main function to generate and save sitemap
function generateSitemap(): void {
  try {
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate and write the sitemap
    const sitemapContent = generateSitemapXml();
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);

    console.log("Sitemap generated successfully at public/sitemap.xml");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

// Execute the main function
generateSitemap();
