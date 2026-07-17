import type { IconType } from "react-icons";
import type { PLATFORM_IDS } from "../constants/platforms.constant";

export type PlatformId = (typeof PLATFORM_IDS)[number];

export interface LinkPlatform {
  name: string;
  Icon: IconType;
  baseUrl: string;
  bgColor: string;
}
