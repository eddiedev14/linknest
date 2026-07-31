import type { PlatformId } from "@/features/links/types/platform.type";
import type { FirestoreDoc } from "@/firebase/types/firestore.types";

export interface DailyAnalytics {
  date: Date;
  totalClicks: number;
  byPlatform: Partial<Record<PlatformId, number>>;
  byLink: Record<string, number>;
}

export type DailyAnalyticsDoc = FirestoreDoc<DailyAnalytics>;
