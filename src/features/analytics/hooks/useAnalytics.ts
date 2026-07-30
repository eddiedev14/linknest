import { increment } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { LinkDoc } from "@/features/links/types/link.type";

export const useAnalytics = (userId?: string) => {
  //* useCollection hooks
  const { update: updateLink } = useCollection<LinkDoc>(userId ? `users/${userId}/links` : "");

  //* Handlers
  const registerClick = async (link: LinkDoc) => {
    const { id } = link;

    await updateLink(id, {
      totalClicks: increment(1),
    });
  };

  return {
    registerClick,
  };
};
