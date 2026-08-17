import { useState } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { resetPasswordDialogScheme } from "../validations/resetPassword.scheme";

type EmailState = "idle" | "sending" | "sent";
type FormData = z.input<typeof resetPasswordDialogScheme>;

export const useResetPasswordDialog = () => {
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const { sendRecoveryPasswordEmail } = useAuth();

  //* RHF
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordDialogScheme),
    mode: "onBlur",
  });

  //* Handlers
  const handleResetPasswordDialogSubmit = async (data: FormData) => {
    setEmailState("sending");
    const errorMessage = await sendRecoveryPasswordEmail(data.resetEmail);

    if (errorMessage) {
      toast.error(errorMessage);
      setEmailState("idle");
      return;
    }

    setEmailState("sent");
    toast.success(`¡Email sent! Check your inbox.`);
  };

  return {
    emailState,
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordDialogSubmit),
  };
};
