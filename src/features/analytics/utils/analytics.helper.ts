import { FaArrowDown, FaArrowUp, FaEquals } from "react-icons/fa6";
import type { DailyAnalytics } from "../types/analytics.type";
import type { ClicksPerDay, Stats } from "../types/stats.type";

// Function to calculate the values for the stats and analytics
const buildStats = (totalLinks: number, weekAnalytics: DailyAnalytics[]): Stats => {
  // Today at 00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Yesterday at 00:00
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 1. Calculate today and yesterday clicks
  const todayAnalytics = weekAnalytics.find(
    (day) => day.date.toDate().getTime() === today.getTime(),
  );

  const yesterdayAnalytics = weekAnalytics.find(
    (day) => day.date.toDate().getTime() === yesterday.getTime(),
  );

  const totalClicksToday = todayAnalytics?.totalClicks ?? 0;
  const totalClicksYesterday = yesterdayAnalytics?.totalClicks ?? 0;

  // 2. Calculate clicks per day
  const clicksPerDay: ClicksPerDay[] = weekAnalytics
    .slice() // Make a coy
    .reverse() // From oldest to newest
    .map((day) => ({
      day: day.date.toDate().toLocaleDateString("es-CO", {
        weekday: "short",
      }),
      clicks: day.totalClicks,
    }));

  return {
    totalLinks,
    totalClicksToday,
    totalClicksYesterday,
    clicksPerDay,
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
