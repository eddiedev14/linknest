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
    baseUrl: "github.com/",
    bgColor: "#24292F",
    chartColor: "var(--chart-1)",
  },
  linkedin: {
    name: "LinkedIn",
    Icon: FaLinkedin,
    baseUrl: "linkedin.com/in/",
    bgColor: "#0A66C2",
    chartColor: "var(--chart-2)",
  },
  portfolio: {
    name: "Portfolio",
    Icon: FaBriefcase,
    baseUrl: "",
    bgColor: "#6366F1",
    chartColor: "var(--chart-3)",
  },
  devto: {
    name: "Dev.to",
    Icon: FaDev,
    baseUrl: "dev.to/",
    bgColor: "#0F172A",
    chartColor: "var(--chart-4)",
  },
  stackoverflow: {
    name: "Stack Overflow",
    Icon: FaStackOverflow,
    baseUrl: "stackoverflow.com/users/",
    bgColor: "#F48024",
    chartColor: "var(--chart-5)",
  },
  hackerrank: {
    name: "HackerRank",
    Icon: FaHackerrank,
    baseUrl: "hackerrank.com/profile/",
    bgColor: "#00EA64",
    chartColor: "var(--chart-6)",
  },
  codepen: {
    name: "CodePen",
    Icon: FaCodepen,
    baseUrl: "codepen.io/",
    bgColor: "#000000",
    chartColor: "var(--chart-7)",
  },
  medium: {
    name: "Medium",
    Icon: FaMedium,
    baseUrl: "medium.com/@",
    bgColor: "#121212",
    chartColor: "var(--chart-8)",
  },
  x: {
    name: "X",
    Icon: FaXTwitter,
    baseUrl: "x.com/",
    bgColor: "#000000",
    chartColor: "var(--chart-9)",
  },
  website: {
    name: "Website",
    Icon: FaGlobe,
    baseUrl: "",
    bgColor: "#2196f3",
    chartColor: "var(--chart-10)",
  },
};

export const PLATFORM_ENTRIES = Object.entries(LINK_PLATFORMS_MAP) as [PlatformId, LinkPlatform][];
