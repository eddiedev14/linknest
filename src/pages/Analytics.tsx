import { useEffect } from "react";
import { getUserId } from "@/firebase/utils/firebase.helper";
import { PageLoader } from "@/shared/components/app/PageLoader";
import { PageHeader } from "@/shared/components/app/PageHeader";
import { StatCards } from "@/features/analytics/components/stats/StatCards";
import { WeeklyClicksChart } from "@/features/analytics/components/WeeklyClicksChart";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";

export const Analytics = () => {
  const userId = getUserId();
  const { analyticsLoading, stats, getUserStats } = useAnalytics(userId);

  useEffect(() => {
    getUserStats();
  }, [getUserStats]);

  if (analyticsLoading) return <PageLoader />;
  if (!stats) return;

  const { totalLinks, totalClicksToday, totalClicksYesterday, clicksPerDay } = stats;

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4" aria-label="Your Analytics">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <PageHeader
          title="Analytics"
          description="Track how your audience interacts with your links over the last 7 days."
        />

        <StatCards
          totalLinks={totalLinks}
          totalClicksYesterday={totalClicksYesterday}
          totalClicksToday={totalClicksToday}
        />

        {/* Charts */}
        {clicksPerDay && <WeeklyClicksChart data={clicksPerDay} />}
      </div>
    </main>
  );
};
