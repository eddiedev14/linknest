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
import { useResetPasswordDialog } from "../hooks/useResetPasswordDialog";
import { IoMdMailUnread } from "react-icons/io";

interface Props {
  openDialog: boolean;
  onOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetPasswordDialog = ({ openDialog, onOpenDialog }: Props) => {
  const { emailState, errors, register, onSubmit } = useResetPasswordDialog();

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Reset your Password</DialogTitle>
          <DialogDescription>
            Recover your Linknest password in just a few simple steps.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate aria-label="Form to request a Password Reset Email">
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
            {emailState === "sent" && (
              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                <IoMdMailUnread /> Be sure to check your spam folder
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={emailState === "sending"}>
              {emailState === "sending" ? "Sending..." : "Send Recovery Email"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
