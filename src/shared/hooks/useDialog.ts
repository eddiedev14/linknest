import { useState } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    onOpenChange: setOpen,
    handleOpenDialog: () => setOpen(true),
    handleCloseDialog: () => setOpen(false),
  };
};
