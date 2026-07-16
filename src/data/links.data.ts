import type { IconType } from "react-icons";
import {
  FaBriefcase,
  FaCodepen,
  FaDev,
  FaGithub,
  FaGlobe,
  FaHackerrank,
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
} from "react-icons/fa6";

interface ILinkPlatform {
  id: string;
  name: string;
  Icon: IconType;
  baseUrl: string;
  bgColor: string;
}

export const LINK_PLATFORMS: ILinkPlatform[] = [
  {
    id: "github",
    name: "GitHub",
    Icon: FaGithub,
    baseUrl: "https://github.com/",
    bgColor: "#24292F",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    Icon: FaLinkedin,
    baseUrl: "https://linkedin.com/in/",
    bgColor: "#0A66C2",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    Icon: FaBriefcase,
    baseUrl: "",
    bgColor: "#6366F1",
  },
  {
    id: "devto",
    name: "Dev.to",
    Icon: FaDev,
    baseUrl: "https://dev.to/",
    bgColor: "#0F172A",
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    Icon: FaStackOverflow,
    baseUrl: "https://stackoverflow.com/users/",
    bgColor: "#F48024",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    Icon: FaHackerrank,
    baseUrl: "https://hackerrank.com/profile/",
    bgColor: "#00EA64",
  },
  {
    id: "codepen",
    name: "CodePen",
    Icon: FaCodepen,
    baseUrl: "https://codepen.io/",
    bgColor: "#000",
  },
  {
    id: "medium",
    name: "Medium",
    Icon: FaMedium,
    baseUrl: "https://medium.com/@",
    bgColor: "#121212",
  },
  {
    id: "x",
    name: "X",
    Icon: FaXTwitter,
    baseUrl: "https://x.com/",
    bgColor: "#000000",
  },
  {
    id: "website",
    name: "Website",
    Icon: FaGlobe,
    baseUrl: "",
    bgColor: "#6366F1",
  },
];
