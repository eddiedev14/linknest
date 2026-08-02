import type { DailyAnalytics } from "../types/analytics.type";
import type { ClicksPerDay } from "../types/stats.type";

export function buildStats(weekAnalytics: DailyAnalytics[]) {
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
    totalClicksToday,
    totalClicksYesterday,
    clicksPerDay,
  };
}
