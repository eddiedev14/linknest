import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordFormScheme } from "../validations/resetPassword.scheme";

type FormData = z.input<typeof resetPasswordFormScheme>;

export const useResetPasswordForm = () => {
  //* React Hook Form
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordFormScheme),
    mode: "onBlur",
  });

  // * Functions
  const handleResetPasswordFormSubmit = async (data: FormData) => {
    console.log(data);
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordFormSubmit),
  };
};
