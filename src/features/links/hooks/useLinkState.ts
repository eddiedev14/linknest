import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserId } from "@/features/auth/utils/firebase.helper";
import type { Link, LinkFormData } from "../types/link.type";

export const useLinkState = () => {
  //* Collection Hook
  const userId = getUserId();
  const { results: links, isPending: loading, add } = useCollection<Link>(`users/${userId}/links`);
  const linksCount = links.length;

  //* Functions
  const addLink = async (data: LinkFormData): Promise<string | null> => {
    if (linksCount === 10) return "You can add a maximum of 10 links to your account";
    const linkId = await add(data as Link);
    return !linkId ? "An error occurred while adding your link" : null;
  };

  return {
    loading,
    addLink,
  };
};
