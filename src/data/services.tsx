import {
  FaCode,
  FaMobileScreen,
  FaProductHunt,
  FaUikit,
} from "react-icons/fa6";
import Link from "next/link";

export interface SiteServices {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

export const services: SiteServices[] = [
  {
    icon: <FaCode className="text-purple-500 text-2xl" />,
    title: "Web Development",
    description: (
      <>
        I can develop a website for your business or personal use. I use{" "}
        <Link
          href="https://nextjs.org"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Tailwind CSS
        </Link>
        , and{" "}
        <Link
          href="https://www.typescriptlang.org"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          TypeScript
        </Link>{" "}
        to create a fast and responsive website.
      </>
    ),
  },
  {
    icon: <FaProductHunt className="text-purple-500 text-2xl" />,
    title: "Product Design",
    description: (
      <>
        I can design a product for your business or personal use. I use{" "}
        <Link
          href="https://www.figma.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Figma
        </Link>
        ,{" "}
        <Link
          href="https://adobexdplatform.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Adobe XD
        </Link>
        , and{" "}
        <Link
          href="https://www.sketch.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Sketch
        </Link>{" "}
        to create a fast and responsive website.
      </>
    ),
  },
  {
    icon: <FaUikit className="text-purple-500 text-2xl" />,
    title: "UI/UX Design",
    description: (
      <>
        I can design a UI/UX for your business or personal use. I use{" "}
        <Link
          href="https://www.figma.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Figma
        </Link>
        ,{" "}
        <Link
          href="https://adobexdplatform.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Adobe XD
        </Link>
        , and{" "}
        <Link
          href="https://www.sketch.com"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Sketch
        </Link>{" "}
        to create a fast and responsive website.
      </>
    ),
  },
  {
    icon: <FaMobileScreen className="text-purple-500 text-2xl" />,
    title: "Mobile Development",
    description: (
      <>
        I can develop a mobile app for your business or personal use. I use{" "}
        <Link
          href="https://reactnative.dev"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          React Native
        </Link>
        ,{" "}
        <Link
          href="https://expo.dev"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          Expo
        </Link>
        , and{" "}
        <Link
          href="https://www.typescriptlang.org"
          target="_blank"
          rel="noopener"
          className="text-purple-300 hover:underline"
        >
          TypeScript
        </Link>{" "}
        to create a fast and responsive mobile app.
      </>
    ),
  },
];
