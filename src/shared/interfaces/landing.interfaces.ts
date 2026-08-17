import type { IconType } from "react-icons";

//* Hero
interface IHeroLink {
  icon: IconType;
  label: string;
  clicks: number;
}

interface IHeroAnalytic {
  label: string;
  w: string;
  val: string;
}

//* Features
interface IFeatureItem {
  id: string;
  icon: IconType;
  title: string;
  description: string;
}

//* How It Works
interface IStepItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export type { IHeroLink, IHeroAnalytic, IFeatureItem, IStepItem };
