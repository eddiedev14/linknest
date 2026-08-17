import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { resetPasswordFormScheme } from "../validations/resetPassword.scheme";

type FormData = z.input<typeof resetPasswordFormScheme>;

export const useResetPasswordForm = () => {
  //* Context
  const { validatePasswordResetCode, completePasswordReset } = useAuth();

  //* States
  const [isValidating, setIsValidating] = useState(true);

  //* React Router Dom
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  //* React Hook Form
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordFormScheme),
    mode: "onBlur",
  });

  //* Effects
  useEffect(() => {
    let cancelled = false;

    const validateResetCode = async () => {
      // 1. Verify query params
      if (!oobCode) {
        navigate("/login", { replace: true });
        toast.error("The password reset link is incorrect");
        return;
      }

      // 2. Verify with useAuth the oobCode
      try {
        const error = await validatePasswordResetCode(oobCode);
        if (cancelled) return;

        if (error) {
          navigate("/login", { replace: true });
          toast.error(error);
          return;
        }
      } finally {
        if (!cancelled) {
          setIsValidating(false);
        }
      }
    };

    validateResetCode();

    return () => {
      cancelled = true;
    };
  }, [oobCode, navigate, validatePasswordResetCode]);

  // * Functions
  const handleResetPasswordFormSubmit = async (data: FormData) => {
    if (!oobCode) return;

    const error = await completePasswordReset(oobCode, data.password);

    if (error) {
      navigate("/login", { replace: true });
      toast.error(error);
      return;
    }

    toast.success(`¡Password successfully reset!`);
    navigate("/login", { replace: true });
  };

  return {
    isValidating,
    errors,
    register,
    onSubmit: handleSubmit(handleResetPasswordFormSubmit),
  };
};
