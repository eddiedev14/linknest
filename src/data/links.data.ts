import type { LinkPlatform, PlatformId } from "@/features/links/types/platform.type";
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

export const LINK_PLATFORMS_MAP: Record<PlatformId, LinkPlatform> = {
  github: {
    name: "GitHub",
    Icon: FaGithub,
    baseUrl: "https://github.com/",
    bgColor: "#24292F",
  },
  linkedin: {
    name: "LinkedIn",
    Icon: FaLinkedin,
    baseUrl: "https://linkedin.com/in/",
    bgColor: "#0A66C2",
  },
  portfolio: {
    name: "Portfolio",
    Icon: FaBriefcase,
    baseUrl: "",
    bgColor: "#6366F1",
  },
  devto: {
    name: "Dev.to",
    Icon: FaDev,
    baseUrl: "https://dev.to/",
    bgColor: "#0F172A",
  },
  stackoverflow: {
    name: "Stack Overflow",
    Icon: FaStackOverflow,
    baseUrl: "https://stackoverflow.com/users/",
    bgColor: "#F48024",
  },
  hackerrank: {
    name: "HackerRank",
    Icon: FaHackerrank,
    baseUrl: "https://hackerrank.com/profile/",
    bgColor: "#00EA64",
  },
  codepen: {
    name: "CodePen",
    Icon: FaCodepen,
    baseUrl: "https://codepen.io/",
    bgColor: "#000000",
  },
  medium: {
    name: "Medium",
    Icon: FaMedium,
    baseUrl: "https://medium.com/@",
    bgColor: "#121212",
  },
  x: {
    name: "X",
    Icon: FaXTwitter,
    baseUrl: "https://x.com/",
    bgColor: "#000000",
  },
  website: {
    name: "Website",
    Icon: FaGlobe,
    baseUrl: "",
    bgColor: "#6366F1",
  },
};

export const PLATFORM_ENTRIES = Object.entries(LINK_PLATFORMS_MAP) as [PlatformId, LinkPlatform][];
