import { increment, where } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Link, LinkDoc } from "@/features/links/types/link.type";
import type { DailyAnalytics } from "../types/analytics.type";
import { canRegisterClick, saveClickLocally } from "../utils/localStorage.helper";

export const useAnalytics = (userId?: string) => {
  //* useCollection hooks
  const { update: updateLink } = useCollection<Link>(userId ? `users/${userId}/links` : "");
  const {
    add: addAnalytics,
    update: updateAnalytics,
    find: findAnalytics,
  } = useCollection<DailyAnalytics>(userId ? `users/${userId}/analytics` : "");

  //* Functions
  const registerClick = async (link: LinkDoc) => {
    const { id } = link;

    // 1. Validate if the link should be register as a stat
    if (!canRegisterClick(id)) return;

    // 2. Update the totalClicks field in links collection
    const updated = await updateLink(id, {
      totalClicks: increment(1),
    });

    // 3. Register/update a new document in Analytics colleciton
    const upserted = await upsertAnalytics(link);

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

    const existingAnalytics = await findAnalytics([where("date", "==", today)]);

    // 2. Create payload
    const payload: DailyAnalytics = {
      date: today,
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

    const { date, ...updatePayload } = payload;

    // 2. Upsert the Analytics doc
    const success = existingAnalytics
      ? await updateAnalytics(existingAnalytics.id, updatePayload, { withUpdatedAt: false })
      : await addAnalytics(payload, { withCreatedAt: false });

    return success;
  };

  return {
    registerClick,
  };
};
