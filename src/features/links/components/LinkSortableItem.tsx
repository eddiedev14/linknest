import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import { LuGripVertical } from "react-icons/lu";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Button } from "@/shared/components/shadcn/button";
import { ConfirmDialog } from "@/shared/components/forms/ConfirmDialog";
import type { Link } from "../types/link.type";
import { LINK_PLATFORMS_MAP } from "@/data/links.data";
import { useMyLinks } from "../hooks/useLink";

interface Props {
  link: Link;
}

export const LinkSortableItem = ({ link }: Props) => {
  const { id, label, platform, url, position } = link;
  const { Icon, bgColor } = LINK_PLATFORMS_MAP[platform];
  const { handleSetLinkToEdit, removeLink } = useMyLinks();

  //* States
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  //* Dnd Kit
  const { ref, handleRef, isDragging } = useSortable({ id, index: position });

  return (
    <>
      <li ref={ref}>
        <div
          className={cn(
            "group flex items-center gap-3 bg-background rounded-2xl border border-border px-4 py-4 shadow-sm transition-shadow",
            isDragging && "shadow-lg ring-2 ring-primary/70",
          )}
        >
          {/* Make the button trigger a drag */}
          <Button
            ref={handleRef}
            className="bg-transparent p-0 rounded-none cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground hover:bg-transparent transition-colors shrink-0 touch-none"
            aria-label="Drag to reorder"
          >
            <LuGripVertical size={16} aria-hidden="true" />
          </Button>

          {/* Platform icon badge */}
          <div
            className="size-8 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: bgColor }}
          >
            <Icon />
          </div>

          {/* Link Info */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground truncate leading-tight">
                {label}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground truncate">{url}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity *:bg-transparent *:size-8 *:rounded-lg *:flex *:items-center *:justify-center *:text-muted-foreground *:transition-colors">
            {/* Edit */}
            <Button
              onClick={() => handleSetLinkToEdit(link)}
              className="hover:text-foreground hover:bg-muted"
              aria-label={`Edit ${label}`}
            >
              <FaPencil size={12} aria-hidden="true" />
            </Button>

            {/* Delete */}
            <Button
              onClick={() => setOpenConfirmDialog(true)}
              className="hover:text-destructive hover:bg-destructive/10"
              aria-label={`Delete ${label}`}
            >
              <FaTrash size={12} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </li>

      <ConfirmDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        title={`Remove "${link.label}" link?`}
        text="If you continue, your link will be removed from your public page."
        onConfirm={() => removeLink(link.id)}
      />
    </>
  );
};
