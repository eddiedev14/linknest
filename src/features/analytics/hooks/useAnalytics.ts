import { useCallback, useState } from "react";
import { increment, limit, orderBy, Timestamp, where } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Link, LinkDoc } from "@/features/links/types/link.type";
import type { DailyAnalytics } from "../types/analytics.type";
import type { Stats } from "../types/stats.type";
import { canRegisterClick, saveClickLocally } from "../utils/localStorage.helper";
import { buildStats } from "../utils/stats.helper";
import { getAnalyticsDay } from "../utils/analytics.helper";

export const useAnalytics = (userId?: string) => {
  //* States
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  //* useCollection hooks
  const { update: updateLink, count: countLinks } = useCollection<Link>(
    userId ? `users/${userId}/links` : "",
  );
  const { setById: setAnalyticsById, getAll: getAllAnalytics } = useCollection<DailyAnalytics>(
    userId ? `users/${userId}/analytics` : "",
  );

  //* Functions
  const registerClick = async (link: LinkDoc) => {
    if (!userId) return;
    const { id } = link;

    // 1. Check if this click can be registered
    if (!canRegisterClick(id)) return;

    try {
      // 2. Register the analytics
      await Promise.all([
        updateLink(id, {
          totalClicks: increment(1),
        }),
        upsertAnalytics(link),
      ]);

      // 3. Save locally only if Firebase operations succeeded
      saveClickLocally(id);
    } catch (error) {
      console.error("[registerClick] Failed!", error);
    }
  };

  // Function to create a new daily analytics doc or update it.
  const upsertAnalytics = async (link: LinkDoc) => {
    const { label, platform } = link;
    const { id: analyticsId, date } = getAnalyticsDay();

    return setAnalyticsById(
      analyticsId,
      {
        date,
        totalClicks: increment(1),
        byPlatform: {
          [platform]: increment(1),
        },
        byLink: {
          [label]: increment(1),
        },
      },
      {
        withCreatedAt: false,
        merge: true,
      },
    );
  };

  // Function to get all the stats for the Analytics page
  const getUserStats = useCallback(async () => {
    if (!userId) return;
    setAnalyticsLoading(true);

    try {
      // 1. Count how many links the user have and get week analytics
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(0, 0, 0, 0);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const [totalLinks, weekAnalytics] = await Promise.all([
        countLinks(),
        getAllAnalytics([
          where("date", ">=", Timestamp.fromDate(sevenDaysAgo)),
          orderBy("date", "desc"),
          limit(7),
        ]),
      ]);

      // 2. Calculate the stats with the helper function.
      const stats = buildStats(totalLinks, weekAnalytics);
      setStats(stats);
    } finally {
      setAnalyticsLoading(false);
    }
  }, [userId, countLinks, getAllAnalytics]);

  return {
    analyticsLoading,
    stats,
    registerClick,
    getUserStats,
  };
};
