import {
  FaCode,
  FaMobileScreen,
  FaProductHunt,
  FaUikit,
} from "react-icons/fa6";

export interface SiteServices {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const services: SiteServices[] = [
  {
    icon: <FaCode className="text-purple-500 text-2xl" />,
    title: "Web Development",
    description:
      "I can develop a website for your business or personal use. I use Next.js, Tailwind CSS, and TypeScript to create a fast and responsive website.",
  },
  {
    icon: <FaProductHunt className="text-purple-500 text-2xl" />,
    title: "Product Design",
    description:
      "I can design a product for your business or personal use. I use Figma, Adobe XD, and Sketch to create a fast and responsive website.",
  },
  {
    icon: <FaUikit className="text-purple-500 text-2xl" />,
    title: "UI/UX Design",
    description:
      "I can design a UI/UX for your business or personal use. I use Figma, Adobe XD, and Sketch to create a fast and responsive website.",
  },
  {
    icon: <FaMobileScreen className="text-purple-500 text-2xl" />,
    title: "Mobile Development",
    description:
      "I can develop a mobile app for your business or personal use. I use React Native, Expo, and TypeScript to create a fast and responsive mobile app.",
  },
];
