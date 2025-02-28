import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LuBook,
  LuGithub,
  LuLinkedin,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { applySocialIcons, cn, socialLinks } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { headers } from "next/headers";

export const metadata = {
  title: "About Anbuselvan Annamalai | Social links",
  description:
    "Anbuselvan Annamalai is the Founder & CEO of CyberDude Networks Private Limited, company and is a passionate advocate for technology education, bringing over 10 years of experience in the tech industry. With a strong background in programming and a dedication to mentorship, Anbuselvan Annamalai has empowered countless individuals through teaching and guiding them in the world of software development. Anbuselvan is known for CM Awards, District Collector Awards and teaching more than 10 Million students around the world.He has delivered more than 25+ Guest lectures in various institutions. Anbuselvan Annamalai is the participant, Industry mentor and evaluator of Smart India Hackathon.",
  keywords: "Anbuselvan Annamalai, Anbuselvan Rocky, Anbu Tutorials,",
};

const LinkComponent = ({
  href,
  type,
  text,
  username,
  className = "",
}: {
  href: string;
  type: string;
  text: string;
  username: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        "border rounded-full p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        {applySocialIcons(type)}
        <h4 className="font-semibold">
          {text} <span className="text-sm text-gray-600">(@{username})</span>
        </h4>
      </div>
      <FaArrowRightLong />
    </a>
  );
};

export default async function AboutPage() {
  const headersList = await headers();
  const domain = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${domain}/reviews/about`;

  return (
    <main className="bg-white flex flex-col  items-center p-5 sm:h-screen">
      <div className="text-center space-y-4  mx-auto">
        <Image
          src="/images/anbuselvan-annamalai.png"
          width={"0"}
          height={"0"}
          sizes="100vw"
          priority
          alt="Anbuselvan Annamalai"
          className="rounded-full shadow-2xl mx-auto w-32 h-auto"
        />
        <div className="text-center space-y-2 ">
          <h4 className="font-semibold text-xl relative " title="Verified user">
            <span>Anbuselvan Annamalai </span>
            {/* <span className="absolute right-2 top-1 w-2 h-2 bg-green-500 rounded-full"></span> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
              className="ml-1 -mt-1 stroke-current text-green-500 inline-block"
            >
              <path
                fill="none"
                stroke="currentColor"
                d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
              ></path>
            </svg>
          </h4>
          <p className="text-sm ">
            Founder/CEO of CyberDude - Tech Enthusiast, Mentor & Teacher
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
        <div className="flex-1">
          <ul className="space-y-4 my-10  sm:w-[450px]">
            <LinkComponent
              href={socialLinks.facebook.url}
              type="facebook"
              text={"Facebook"}
              username={"anburocky3"}
            />
            <LinkComponent
              href={socialLinks.instagram.url}
              type="instagram"
              text={"Instagram"}
              username={"anbuselvanrocky"}
            />
            <LinkComponent
              href={socialLinks.linkedin.url}
              type={"linkedin"}
              text={"Linkedin"}
              username={"anburocky3"}
            />
            <LinkComponent
              href={socialLinks.x.url}
              type={"twitter"}
              text={"Twitter"}
              username={"anbuselvanrocky"}
            />
            <LinkComponent
              href={socialLinks.github.url}
              type={"github"}
              text={"Github"}
              username={"anburocky3"}
            />
          </ul>
        </div>
        <div className="p-10 bg-orange-50 rounded">
          <QRCodeSVG value={fullUrl} size={300} />
        </div>
      </div>
      <Card className="max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Connect with me on social media and stay updated with my latest
            workshops and content.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href={socialLinks.x.url} target="_blank">
                <LuTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={socialLinks.github.url} target="_blank">
                <LuGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={socialLinks.linkedin.url} target="_blank">
                <LuLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={socialLinks.youtube.url} target="_blank">
                <LuYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={socialLinks.cyberdude.url} target="_blank">
                <LuBook className="h-5 w-5" />
                <span className="sr-only">CyberDude Youtube</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
