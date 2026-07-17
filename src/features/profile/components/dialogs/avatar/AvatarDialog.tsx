import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { FaCamera } from "react-icons/fa6";
import { useDialog } from "@/shared/hooks/useDialog";
import { AvatarForm } from "./AvatarForm";

export const AvatarDialog = () => {
  const { open, onOpenChange, handleCloseDialog } = useDialog();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="absolute bottom-1 right-1 size-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground shadow-sm transition-colors ring-2 ring-background"
          aria-label="Change profile photo"
        >
          <FaCamera aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload your avatar</DialogTitle>
          <DialogDescription>
            Upload the public avatar photo that will appear on your Linknest page
          </DialogDescription>

          <AvatarForm onSuccess={handleCloseDialog} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
