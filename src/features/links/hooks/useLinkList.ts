/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { toast } from "react-toastify";
import { useMyLinks } from "./useMyLinks";

export const useLinkList = () => {
  //* Context
  const { links, updateLinksOrder } = useMyLinks();

  //* States
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  //* References
  const orderedLinksRef = useRef(links);

  //* UseEffect
  useEffect(() => {
    orderedLinksRef.current = links;
    setHasOrderChanged(false);
  }, [links]);

  //* Handlers
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    // Reorder the link list with move helper and save it in the ref.
    const reordered = move(orderedLinksRef.current, event);
    orderedLinksRef.current = reordered;

    // Calculate if a new change was produced
    setHasOrderChanged(reordered.some((link, index) => link.id !== links[index]?.id));
  };

  const handleSaveOrderClick = async () => {
    setIsUpdatingOrder(true);

    try {
      const error = await updateLinksOrder(orderedLinksRef.current);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Links are now correctly ordered");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  return {
    links,
    hasOrderChanged,
    isUpdatingOrder,
    handleDragEnd,
    handleSaveOrderClick,
  };
};
