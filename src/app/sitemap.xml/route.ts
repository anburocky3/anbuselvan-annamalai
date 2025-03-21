import { generateXMLSitemap } from "../../../scripts/generate-sitemap";

export async function GET() {
  // Generate the sitemap XML content
  const xml = await generateXMLSitemap();
  // Return the XML with proper content type
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
