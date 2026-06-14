import {
  BsFillGlobeAmericasFill,
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import {
  FaChartBar,
  FaGithub,
  FaLink,
  FaPalette,
  FaShield,
} from "react-icons/fa6";
import { BiSolidZap } from "react-icons/bi";

import type {
  IFeatureItem,
  IHeroAnalytic,
  IHeroLink,
  IStepItem,
} from "@/shared/interfaces/landing.interfaces";

//* Navbar
const navMenuItems: string[] = ["Features", "How it works"];

//* Hero
const mockLinks: IHeroLink[] = [
  { icon: BsFillGlobeAmericasFill, label: "My Portfolio", clicks: 142 },
  { icon: BsTwitterX, label: "Twitter / X", clicks: 89 },
  { icon: BsInstagram, label: "Instagram", clicks: 211 },
  { icon: BsLinkedin, label: "LinkedIn", clicks: 57 },
  { icon: FaGithub, label: "Github", clicks: 33 },
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
    title: "Professional Links",
    description:
      "Connect your GitHub, LinkedIn, portfolio, resume, coding platforms, social profiles, and more from a single page.",
  },
  {
    icon: FaChartBar,
    title: "Transparent Analytics",
    description:
      "Track clicks across all your links and understand what recruiters, collaborators, and visitors engage with most.",
  },
  {
    icon: FaPalette,
    title: "Visual Customization",
    description:
      "Personalize your profile with an avatar, banner, bio, professional status, and tech stack to showcase who you are.",
  },
  {
    icon: BsFillGlobeAmericasFill,
    title: "Shareable Public URL",
    description:
      "Get a unique profile link like getlinknest.vercel.app/u/yourname and share it anywhere online.",
  },
  {
    icon: FaShield,
    title: "Privacy First",
    description:
      "Your analytics belong to you. We never sell your data or track visitors beyond the interactions you choose to measure.",
  },
  {
    icon: BiSolidZap,
    title: "Ready in Minutes",
    description:
      "Create your profile, add your platforms, and start sharing your professional presence in just a few minutes.",
  },
];

//* How It Works
const steps: IStepItem[] = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up with email, Google or Github and choose your unique username. This becomes your public LinkNest profile.",
  },
  {
    number: "02",
    title: "Build your profile",
    description:
      "Add your avatar, bio, professional status, tech stack, and other details that help people understand who you are.",
  },
  {
    number: "03",
    title: "Connect your platforms",
    description:
      "Add your GitHub, LinkedIn, portfolio, coding platforms, social profiles, and contact channels from a single dashboard.",
  },
  {
    number: "04",
    title: "Share & track",
    description:
      "Share your profile anywhere and monitor link performance through built-in analytics designed to help you understand visitor engagement.",
  },
];

export { navMenuItems, mockLinks, mockAnalytics, features, steps };
