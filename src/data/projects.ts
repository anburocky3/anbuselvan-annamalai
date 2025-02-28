import { socialLinks } from "@/lib/utils";

export interface Project {
  type: "app" | "website" | "design" | "other";
  title: string;
  description: string;
  image: string;
  features: string[];
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    type: "app",
    title: "Varam.app",
    description: "Complete matrimonial app focused on south indian tradition.",
    image: "/images/site/projects/varam-kongu-matrimony.png",
    features: [
      "We connect the south indian community.",
      "Integrated with OTP and secure Indian payment gateway.",
      "Privacy and security is our top priority.",
      "Has Web & Android version",
    ],
    tags: ["branding", "Graphic design", "Development"],
    link: "https://varam.app",
  },
  {
    type: "app",
    title: "cyberdude.app",
    description:
      "Skill a beginner with practical knowledge with various fun activities.",
    image: "/images/site/projects/cyberdude-app.png",
    features: [
      "Complete Tech Learning Platform.",
      "Integrated with OTP and secure payment gateway.",
      "Has AI support for learning.",
      "Has Web & Android version",
    ],
    tags: ["branding", "Graphic design", "Development"],
    link: "https://cyberdudenetworks.com",
  },
  {
    type: "app",
    title: "farm2bag.app",
    description:
      "Connect the farmers directly to the consumer, buy organic items at your doorsteps.",
    image: "/images/site/projects/farm2bag.png",
    features: [
      "Connect the farmers directly to the consumer.",
      "Complete E-Commerce Platform.",
      "Contributed to Android development",
      "Has Web & Android version",
    ],
    tags: ["branding", "Graphic design", "Development"],
    link: "https://farm2bag.com",
  },
  {
    type: "app",
    title: "Tech Instructor",
    description:
      "A platform for tech enthusiasts to learn and share their knowledge.",
    image: "/images/site/projects/cyberdude-channel.png",
    features: [
      "Taught 10+ Million students.",
      "Learn from the best in the industry.",
      "Make your own courses and earn money.",
      "Has Web & Android version",
    ],
    tags: ["branding", "Graphic design", "Development"],
    link: socialLinks.cyberdude.url,
  },
];
