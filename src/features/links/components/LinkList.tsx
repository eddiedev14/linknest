import { DragDropProvider } from "@dnd-kit/react";
import { IoReload } from "react-icons/io5";
import { Button } from "@/shared/components/shadcn/button";
import { LinkSortableItem } from "./LinkSortableItem";
import { useLinkList } from "../hooks/useLinkList";

export const LinkList = () => {
  const { links, hasOrderChanged, isUpdatingOrder, handleDragEnd, handleSaveOrderClick } =
    useLinkList();

  return (
    <>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <ol className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkSortableItem key={link.id} link={link} />
          ))}
        </ol>
      </DragDropProvider>

      <div>
        <Button onClick={handleSaveOrderClick} disabled={!hasOrderChanged || isUpdatingOrder}>
          {isUpdatingOrder ? "Updating order..." : "Update order"}
          <IoReload aria-hidden="true" />
        </Button>
      </div>
    </>
  );
};
