import type { PlatformId } from "@/features/links/types/platform.type";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ClicksPerDayChart {
  day: Weekday;
  clicks: number;
}

export interface ClicksByPlatformChart {
  platform: PlatformId;
  clicks: number;
}

export interface Stats {
  totalLinks: number;
  totalClicksToday: number;
  totalClicksYesterday: number;
  clicksPerDay: ClicksPerDayChart[];
  clicksByPlatform: ClicksByPlatformChart[];
}
