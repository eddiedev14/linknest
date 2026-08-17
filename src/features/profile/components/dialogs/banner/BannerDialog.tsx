import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { FaPencil } from "react-icons/fa6";
import { useDialog } from "@/shared/hooks/useDialog";
import { BannerPresets } from "./BannerPresets";

export const BannerDialog = () => {
  const { open, onOpenChange, handleCloseDialog } = useDialog();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="absolute top-3 right-3 size-8 rounded-lg bg-black/20 hover:bg-black/35 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          aria-label="Edit banner color"
        >
          <FaPencil aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize your banner</DialogTitle>
          <DialogDescription>
            Choose from our solid color presets or select your own custom color
          </DialogDescription>

          {/* Presets */}
          <div className="flex flex-col gap-2 mt-4">
            <BannerPresets onSuccess={handleCloseDialog} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
