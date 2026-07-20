import { useEffect } from "react";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserId } from "@/features/auth/utils/firebase.helper";
import type { Link, LinkFormData } from "../types/link.type";

export const useLinkState = () => {
  //* Collection Hook
  const userId = getUserId();
  const {
    results: links,
    isPending,
    add,
    suscribe,
    updateMany,
  } = useCollection<Link>(`users/${userId}/links`);
  const linksCount = links.length;

  //* Effects
  useEffect(() => {
    const unsubscribe = suscribe([orderBy("position")]);
    return unsubscribe;
  }, [suscribe]);

  //* Functions
  const addLink = async (data: LinkFormData): Promise<string | null> => {
    if (linksCount === 10) return "You can add a maximum of 10 links to your account";

    const payload = { ...data, position: linksCount + 1 };
    const linkId = await add(payload as Link);
    return !linkId ? "An error occurred while adding your link" : null;
  };

  const updateLinksOrder = async (updatedLinks: Link[]): Promise<string | null> => {
    const updates = updatedLinks.map((link, index) => ({
      id: link.id,
      data: {
        position: index + 1,
      },
    }));

    const success = await updateMany(updates);
    return !success ? "An error occurred while updating the order of your links" : null;
  };

  return {
    links,
    linksCount,
    loadingLinks: isPending,
    addLink,
    updateLinksOrder,
  };
};
