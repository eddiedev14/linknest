import { FaArrowDown, FaArrowUp, FaEquals } from "react-icons/fa6";
import type { PlatformId } from "@/features/links/types/platform.type";
import type { DailyAnalytics } from "../types/analytics.type";
import type { ClicksByPlatformChart, ClicksPerDayChart, Stats, Weekday } from "../types/stats.type";

// Function to calculate the values for the stats and analytics
const buildStats = (totalLinks: number, weekAnalytics: DailyAnalytics[]): Stats => {
  // Today at 00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Yesterday at 00:00
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 1. Result variables
  let totalClicksToday = 0;
  let totalClicksYesterday = 0;

  let clicksPerDay: ClicksPerDayChart[] = [];
  let clicksByPlatform: ClicksByPlatformChart[] = [];

  // 2. Iterate over weekAnalytics to calculate all the stats
  weekAnalytics
    .slice()
    .reverse() // From oldest to the newest
    .forEach((day) => {
      const date = day.date.toDate();
      const time = date.getTime();

      // Today / Yesterday
      if (time === today.getTime()) {
        totalClicksToday = day.totalClicks;
      }

      if (time === yesterday.getTime()) {
        totalClicksYesterday = day.totalClicks;
      }

      // Clicks per day
      clicksPerDay.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }) as Weekday,
        clicks: day.totalClicks,
      });

      // Clicks by platform
      Object.entries(day.byPlatform).forEach(([platform, clicks]) => {
        const platformId = platform as PlatformId;
        const existing = clicksByPlatform.find((platform) => platform.platform === platformId);

        if (existing) {
          existing.clicks += clicks;
          return;
        }

        clicksByPlatform.push({ platform: platformId, clicks: clicks });
      });
    });

  return {
    totalLinks,
    totalClicksToday,
    totalClicksYesterday,
    clicksPerDay,
    clicksByPlatform,
  };
};

const getDeltaClicksInfo = (delta: number, absoluteDelta: number) => {
  if (delta > 0) {
    return {
      classname: "text-emerald-500",
      Icon: FaArrowUp,
      ariaLabel: `${absoluteDelta} more clicks than yesterday`,
      value: `+${absoluteDelta}`,
    };
  }

  if (delta < 0) {
    return {
      classname: "text-destructive",
      Icon: FaArrowDown,
      ariaLabel: `${absoluteDelta} fewer clicks than yesterday`,
      value: `-${absoluteDelta}`,
    };
  }

  return {
    classname: "text-primary",
    Icon: FaEquals,
    ariaLabel: `Same number of clicks as yesterday`,
    value: "",
  };
};

export { buildStats, getDeltaClicksInfo };
