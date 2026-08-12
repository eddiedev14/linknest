import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { resetPasswordScheme } from "../validations/resetPassword.scheme";

type FormData = z.input<typeof resetPasswordScheme>;

export const useResetPassword = (closeDialog: () => void) => {
  const { resetPassword } = useAuth();

  //* RHF
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordScheme),
    mode: "onBlur",
  });

  //* Handlers
  const handleResetPasswordSubmit = async (data: FormData) => {
    const errorMessage = await resetPassword(data.resetEmail);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success(`¡Email sent! Check your inbox.`);
    closeDialog();
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordSubmit),
  };
};
