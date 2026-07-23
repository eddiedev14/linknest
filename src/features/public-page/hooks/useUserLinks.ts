import { useEffect } from "react";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Link } from "@/features/links/types/link.type";

export const useUserLinks = (userId?: string) => {
  const { results: links, isPending, suscribe } = useCollection<Link>(`users/${userId}/links`);

  useEffect(() => {
    if (!userId) return;
    return suscribe([orderBy("position")]);
  }, [userId, suscribe]);

  return {
    links,
    loadingLinks: isPending,
  };
};
