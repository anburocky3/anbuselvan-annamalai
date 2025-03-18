import { FaBriefcase, FaGraduationCap } from "react-icons/fa6";

export interface TimelineData {
  education: {
    year: string;
    title: string;
    institution: string;
    icon: React.ReactNode;
  }[];
  experience: {
    year: string;
    title: string;
    company: string;
    icon: React.ReactNode;
  }[];
}

export const timelineData: TimelineData = {
  education: [
    {
      year: "2023 - 2025",
      title: "Master of Business Administration",
      institution: "University of Madras",
      icon: <FaGraduationCap className="w-6 h-6" />,
    },
    {
      year: "2013 - 2017",
      title: "Bachelor of Engineering (C.S.E.)",
      institution: "Anna University",
      icon: <FaGraduationCap className="w-6 h-6" />,
    },
    {
      year: "2001 - 2013",
      title: "SCHOOLING",
      institution: "Nazareth Matri. Hr. Sec. School",
      icon: <FaGraduationCap className="w-6 h-6" />,
    },
  ],
  experience: [
    {
      year: "2016 - PRESENT",
      title: "FOUNDER/CEO",
      company: "CyberDude Networks Pvt. Ltd.",
      icon: <FaBriefcase className="w-6 h-6" />,
    },
    {
      year: "2016 - 2018",
      title: "PRODUCT DEVELOPER",
      company: "CyberDude Networks Pvt. Ltd.",
      icon: <FaBriefcase className="w-6 h-6" />,
    },
    {
      year: "2014 - 2015",
      title: "JUNIOR SOFTWARE INTERN",
      company: "Google Inc.",
      icon: <FaBriefcase className="w-6 h-6" />,
    },
  ],
};
