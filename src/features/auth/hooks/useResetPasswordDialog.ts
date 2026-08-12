import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { resetPasswordDialogScheme } from "../validations/resetPassword.scheme";

type FormData = z.input<typeof resetPasswordDialogScheme>;

export const useResetPasswordDialog = (closeDialog: () => void) => {
  const { sendRecoveryPasswordEmail } = useAuth();

  //* RHF
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordDialogScheme),
    mode: "onBlur",
  });

  //* Handlers
  const handleResetPasswordDialogSubmit = async (data: FormData) => {
    const errorMessage = await sendRecoveryPasswordEmail(data.resetEmail);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success(`¡Email sent! Check your inbox.`);
    reset();
    closeDialog();
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordDialogSubmit),
  };
};
