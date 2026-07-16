import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/shared/components/shadcn/button";
import { LinkForm } from "./LinkForm";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LinkDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full h-11 rounded-xl font-semibold text-sm shadow-sm shadow-primary/20 gap-2"
          aria-label="Add a new link"
        >
          <FaPlus size={16} aria-hidden="true" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new link</DialogTitle>
          <DialogDescription>Fill in the details to add a new link to your page.</DialogDescription>
          <LinkForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
