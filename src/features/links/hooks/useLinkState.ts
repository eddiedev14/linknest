import { useEffect, useState } from "react";
import { orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserId } from "@/features/auth/utils/firebase.helper";
import { useDialog } from "@/shared/hooks/useDialog";
import type { Link, LinkFormData } from "../types/link.type";

export const useLinkState = () => {
  //* States
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);

  //* Custom Hook (Link Dialog)
  const { open, onOpenChange, handleOpenDialog, handleCloseDialog } = useDialog();

  //* Collection Hook
  const userId = getUserId();
  const {
    results: links,
    isPending,
    add,
    suscribe,
    update,
    updateMany,
    remove,
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

  const handleSetLinkToEdit = (link: Link | null) => {
    setLinkToEdit(link);
    if (link) handleOpenDialog();
  };

  const editLink = async (id: string, data: LinkFormData): Promise<string | null> => {
    const success = await update(id, data);
    return !success ? "An error occurred while updating your link" : null;
  };

  const removeLink = async (id: string) => {
    const success = await remove(id);
    if (!success) {
      toast.error(`An error occurred while removing your link`);
      return;
    }

    toast.success("Your link was deleted successfully");
  };

  return {
    open,
    links,
    linksCount,
    loadingLinks: isPending,
    linkToEdit,
    onOpenChange,
    handleOpenDialog,
    handleCloseDialog,
    addLink,
    updateLinksOrder,
    handleSetLinkToEdit,
    editLink,
    removeLink,
  };
};
