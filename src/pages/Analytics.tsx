import { useEffect } from "react";
import { getUserId } from "@/firebase/utils/firebase.helper";
import { SEO } from "@/shared/components/SEO";
import { PageHeader } from "@/shared/components/app/PageHeader";
import { StatCards } from "@/features/analytics/components/stats/StatCards";
import { WeeklyClicksChart } from "@/features/analytics/components/charts/WeeklyClicksChart";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import { AnalyticsSkeleton } from "@/features/analytics/components/AnalyticsSkeleton";
import { WeeklyPlatformsChart } from "@/features/analytics/components/charts/WeeklyPlatformsChart";
import { WeeklyLinksChart } from "@/features/analytics/components/charts/WeeklyLinksChart";

const Analytics = () => {
  const userId = getUserId();
  const { analyticsLoading, stats, getUserStats } = useAnalytics(userId);

  useEffect(() => {
    getUserStats();
  }, [getUserStats]);

  return (
    <>
      <SEO
        title="My Analytics"
        description="Analyze your LinkNest link performance with detailed insights into clicks, traffic trends, platforms, and individual links."
        path="/analytics"
        noIndex
      />

      <main className="flex-1 flex flex-col items-center py-10 px-4" aria-label="Your Analytics">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <PageHeader
            title="Analytics"
            description="Track how your audience interacts with your links over the last 7 days."
          />

          {analyticsLoading || !stats ? (
            <AnalyticsSkeleton />
          ) : (
            <>
              <StatCards
                totalLinks={stats.totalLinks}
                totalClicksYesterday={stats.totalClicksYesterday}
                totalClicksToday={stats.totalClicksToday}
              />

              {/* Charts */}
              <WeeklyClicksChart data={stats.clicksPerDay} />

              <div className="grid md:grid-cols-2 gap-3">
                <WeeklyPlatformsChart data={stats.clicksByPlatform} />
                <WeeklyLinksChart data={stats.clicksByLink} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Analytics;
