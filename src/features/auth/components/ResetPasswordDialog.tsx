import { CiMail } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn/dialog";
import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { InputField } from "@/shared/components/forms/fields";
import { useResetPassword } from "../hooks/useResetPassword";

interface Props {
  openDialog: boolean;
  onOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseDialog: () => void;
}

export const ResetPasswordDialog = ({ openDialog, onOpenDialog, handleCloseDialog }: Props) => {
  const { errors, register, onSubmit } = useResetPassword(handleCloseDialog);

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Reset your Password</DialogTitle>
          <DialogDescription>
            Recover your Linknest password in just a few simple steps.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="reset-email">Email</Label>
            <InputField
              Icon={CiMail}
              id="reset-password"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              registration={register("resetEmail")}
              errorMsg={errors.resetEmail?.message}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Send Recovery Email</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
