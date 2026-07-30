import type { PlatformId } from "@/features/links/types/platform.type";

export interface DailyAnalytics {
  totalClicks: number;
  byPlatform: Record<PlatformId, number>;
  byLink: Record<string, number>;
}
