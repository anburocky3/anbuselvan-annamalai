import { FaMobileAlt } from "react-icons/fa";
import { FaNodeJs, FaPhp, FaPython, FaReact } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";

interface SkillData {
  name: string;
  icon: React.ReactNode;
  proficiency: string;
}

export const skillsData: SkillData[] = [
  {
    name: "Javascript / Typescript",
    icon: <SiTypescript className="text-yellow-500" />,
    proficiency: "92%",
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-500" />,
    proficiency: "80%",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-500" />,
    proficiency: "80%",
  },
  {
    name: "Python",
    icon: <FaPython className="text-blue-500" />,
    proficiency: "80%",
  },
  {
    name: "PHP",
    icon: <FaPhp className="text-purple-500" />,
    proficiency: "80%",
  },
  {
    name: "Mobile Development",
    icon: <FaMobileAlt className="text-green-500" />,
    proficiency: "80%",
  },
];
