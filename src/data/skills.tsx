import { FaMobileAlt } from "react-icons/fa";
import { FaNodeJs, FaPhp, FaPython, FaReact } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import Link from "next/link";

interface SkillData {
  name: string | React.ReactNode;
  icon: React.ReactNode;
  proficiency: string;
  url?: string;
}

export const skillsData: SkillData[] = [
  {
    name: (
      <>
        <Link
          href="https://www.typescriptlang.org"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Javascript / Typescript
        </Link>
      </>
    ),
    icon: <SiTypescript className="text-yellow-500" />,
    proficiency: "92%",
    url: "https://www.typescriptlang.org",
  },
  {
    name: (
      <>
        <Link
          href="https://react.dev"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          React
        </Link>
      </>
    ),
    icon: <FaReact className="text-blue-500" />,
    proficiency: "80%",
    url: "https://react.dev",
  },
  {
    name: (
      <>
        <Link
          href="https://nodejs.org"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Node.js
        </Link>
      </>
    ),
    icon: <FaNodeJs className="text-green-500" />,
    proficiency: "80%",
    url: "https://nodejs.org",
  },
  {
    name: (
      <>
        <Link
          href="https://www.python.org"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Python
        </Link>
      </>
    ),
    icon: <FaPython className="text-blue-500" />,
    proficiency: "80%",
    url: "https://www.python.org",
  },
  {
    name: (
      <>
        <Link
          href="https://www.php.net"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          PHP
        </Link>
      </>
    ),
    icon: <FaPhp className="text-purple-500" />,
    proficiency: "80%",
    url: "https://www.php.net",
  },
  {
    name: (
      <>
        <Link
          href="https://reactnative.dev"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Mobile Development
        </Link>
      </>
    ),
    icon: <FaMobileAlt className="text-green-500" />,
    proficiency: "80%",
    url: "https://reactnative.dev",
  },
];
