import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserId } from "@/features/auth/utils/firebase.helper";
import type { Link, LinkFormData } from "../types/link.type";
import { useEffect } from "react";

export const useLinkState = () => {
  //* Collection Hook
  const userId = getUserId();
  const {
    results: links,
    isPending: loading,
    add,
    suscribe,
  } = useCollection<Link>(`users/${userId}/links`);
  const linksCount = links.length;

  //* Effects
  useEffect(() => {
    const unsubscribe = suscribe();
    return unsubscribe;
  }, [suscribe]);

  //* Functions
  const addLink = async (data: LinkFormData): Promise<string | null> => {
    if (linksCount === 10) return "You can add a maximum of 10 links to your account";

    const payload = { ...data, position: linksCount + 1 };
    const linkId = await add(payload as Link);
    return !linkId ? "An error occurred while adding your link" : null;
  };

  return {
    loading,
    addLink,
  };
};
