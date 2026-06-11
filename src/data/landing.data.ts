import {
  BsFillGlobeAmericasFill,
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import {
  FaCartShopping,
  FaChartBar,
  FaLink,
  FaPalette,
  FaShield,
} from "react-icons/fa6";
import { GoZap } from "react-icons/go";

import type {
  IFeatureItem,
  IHeroAnalytic,
  IHeroLink,
} from "@/shared/interfaces/landing.interfaces";

//* Navbar
const navMenuItems: string[] = ["Features", "How it works"];

//* Hero
const mockLinks: IHeroLink[] = [
  { icon: BsFillGlobeAmericasFill, label: "My Portfolio", clicks: 142 },
  { icon: BsTwitterX, label: "Twitter / X", clicks: 89 },
  { icon: BsInstagram, label: "Instagram", clicks: 211 },
  { icon: BsLinkedin, label: "LinkedIn", clicks: 57 },
  { icon: FaCartShopping, label: "My Store", clicks: 33 },
];

const mockAnalytics: IHeroAnalytic[] = [
  { label: "Portfolio", w: "w-full", val: "142" },
  { label: "Instagram", w: "w-4/5", val: "211" },
  { label: "Twitter", w: "w-3/5", val: "89" },
];

//* Features
const features: IFeatureItem[] = [
  {
    icon: FaLink,
    title: "10 Links per Account",
    description:
      "Add as many links as you need (max 10.) — social profiles, portfolio, store, booking page, and more.",
  },
  {
    icon: FaChartBar,
    title: "Transparent Analytics",
    description:
      "See exactly how many clicks each link got in the last 7 days. Your data, always visible from your dashboard.",
  },
  {
    icon: FaPalette,
    title: "Visual Customization",
    description:
      "Choose your banner color, upload an avatar, write your bio. Your page reflects your personal brand.",
  },
  {
    icon: BsFillGlobeAmericasFill,
    title: "Shareable Public URL",
    description:
      "Get a clean link like linknest.app/u/yourname to share on any social network or business card.",
  },
  {
    icon: FaShield,
    title: "Privacy Focused",
    description:
      "We never sell your data. Analytics are yours alone — no third-party tracking on visitor activity.",
  },
  {
    icon: GoZap,
    title: "Instant Setup",
    description:
      "Register, add your links, and go live in under 2 minutes. No technical knowledge required.",
  },
];

export { navMenuItems, mockLinks, mockAnalytics, features };
