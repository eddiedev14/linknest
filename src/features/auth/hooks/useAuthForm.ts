import { useState } from "react";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBaseNewUser } from "../utils/firebase.helper";
import { authScheme } from "../validations/auth.scheme";
import type { UserRegister } from "../types/user.type";
import { useAuth } from "./useAuth";

export const useAuthForm = (isSignup: boolean) => {
  //* States
  const [submitting, setSubmitting] = useState(false);

  //* Contexts
  const { registerWithEmailAndPassword } = useAuth();

  //* React Hook Form
  const schema = authScheme(isSignup);
  type FormData = z.infer<typeof schema>;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  //* Navigate
  const navigate = useNavigate();

  // * Functions
  const handleRegister = async (data: FormData) => {
    setSubmitting(true);

    try {
      // Register the new base user
      const user = data as UserRegister;
      const errorMessage = await registerWithEmailAndPassword(createBaseNewUser(user));

      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }

      toast.success("User created successfully");
      navigate("/profile", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    errors,
    register,
    onSubmit: handleSubmit(isSignup ? handleRegister : () => {}),
  };
};
