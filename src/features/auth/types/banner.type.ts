import type { BANNER_PRESETS } from "../constants/bannerPresets.constant";

type BannerPreset = (typeof BANNER_PRESETS)[number];
export type BannerStyle = BannerPreset | `#${string}`;
