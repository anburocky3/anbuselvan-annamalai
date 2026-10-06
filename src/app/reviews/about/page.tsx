import { headers } from "next/headers";
import { AboutView } from "@/components/reviews/AboutView";

export const metadata = {
  title: "About Anbuselvan Annamalai | Social links",
  description:
    "Anbuselvan Annamalai is the Founder & CEO of CyberDude Networks Private Limited, company and is a passionate advocate for technology education, bringing over 10 years of experience in the tech industry. With a strong background in programming and a dedication to mentorship, Anbuselvan Annamalai has empowered countless individuals through teaching and guiding them in the world of software development. Anbuselvan is known for CM Awards, District Collector Awards and teaching more than 10 Million students around the world.He has delivered more than 25+ Guest lectures in various institutions. Anbuselvan Annamalai is the participant, Industry mentor and evaluator of Smart India Hackathon.",
  keywords: "Anbuselvan Annamalai, Anbuselvan Rocky, Anbu Tutorials,",
};

export default async function AboutPage() {
  const headersList = await headers();
  const domain = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${domain}/reviews`;

  return <AboutView fullUrl={fullUrl} />;
}
