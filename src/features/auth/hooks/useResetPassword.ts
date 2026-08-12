import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordScheme } from "../validations/resetPassword.scheme";

type FormData = z.input<typeof resetPasswordScheme>;

export const useResetPassword = (closeDialog: () => void) => {
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
  const handleResetPasswordSubmit = (data: FormData) => {
    console.log(data);
    closeDialog();
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordSubmit),
  };
};
