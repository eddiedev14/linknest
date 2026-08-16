import { useCallback, useState } from "react";
import { increment, limit, orderBy, Timestamp, where } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Link, LinkDoc } from "@/features/links/types/link.type";
import type { DailyAnalytics } from "../types/analytics.type";
import type { Stats } from "../types/stats.type";
import { canRegisterClick, saveClickLocally } from "../utils/localStorage.helper";
import { buildStats } from "../utils/stats.helper";

export const useAnalytics = (userId?: string) => {
  //* States
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  //* useCollection hooks
  const { update: updateLink, count: countLinks } = useCollection<Link>(
    userId ? `users/${userId}/links` : "",
  );
  const {
    add: addAnalytics,
    update: updateAnalytics,
    find: findAnalytics,
    getAll: getAllAnalytics,
  } = useCollection<DailyAnalytics>(userId ? `users/${userId}/analytics` : "");

  //* Functions
  const registerClick = async (link: LinkDoc) => {
    if (!userId) return;
    const { id } = link;

    // 1. Validate if the link should be register as a stat
    if (!canRegisterClick(id)) return;

    // 2. Update the global analytics
    const [updated, upserted] = await Promise.all([
      updateLink(id, {
        totalClicks: increment(1),
      }),
      upsertAnalytics(link),
    ]);

    if (updated && upserted) {
      saveClickLocally(id);
    }
  };

  // Function to create a new daily analytics doc or update it.
  const upsertAnalytics = async (link: LinkDoc) => {
    const { label, platform } = link;

    // 1. Validate if already exists an analytic doc for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytics = await findAnalytics([where("date", "==", Timestamp.fromDate(today))]);

    // 2. Create payload
    const payload: DailyAnalytics = {
      date: Timestamp.fromDate(today),
      totalClicks: (existingAnalytics?.totalClicks ?? 0) + 1,
      byPlatform: {
        ...existingAnalytics?.byPlatform,
        [platform]: (existingAnalytics?.byPlatform?.[platform] ?? 0) + 1,
      },
      byLink: {
        ...existingAnalytics?.byLink,
        [label]: (existingAnalytics?.byLink?.[label] ?? 0) + 1,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, ...updatePayload } = payload;

    // 2. Upsert the Analytics doc
    const success = existingAnalytics
      ? await updateAnalytics(existingAnalytics.id, updatePayload, { withUpdatedAt: false })
      : await addAnalytics(payload, { withCreatedAt: false });

    return success;
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
