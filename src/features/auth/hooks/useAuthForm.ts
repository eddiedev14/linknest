import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBaseNewUser } from "../utils/firebase.helper";
import { loginScheme, registerScheme } from "../schemes/auth.scheme";
import { validateField } from "@/shared/utils/zod.helper";
import type { UserRegister } from "../types/user.type";
import { useAuth } from "./useAuth";

type AuthFields = "email" | "username" | "password";

export const useAuthForm = (isSignup: boolean) => {
  //* States
  const [registered, setRegistered] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<AuthFields, string>>({
    email: "",
    username: "",
    password: "",
  });

  //* Contexts
  const { isPending, registerWithEmailAndPassword } = useAuth();

  //* References
  const formRef = useRef<HTMLFormElement>(null);
  const scheme = isSignup ? registerScheme : loginScheme;

  //* Navigate
  const navigate = useNavigate();

  //* Effects
  useEffect(() => {
    if (registered) {
      navigate("/profile", { replace: true });
    }
  }, [registered]);

  //* Handlers
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(scheme, name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ? Submit methods
  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Data validation
    const data = Object.fromEntries(new FormData(formRef.current)) as UserRegister;
    const validationResult = registerScheme.safeParse(data);

    if (!validationResult.success) {
      toast.error("There are invalid fields");
      return;
    }

    // Register the new base user
    const user: UserRegister = validationResult.data;
    const errorMessage = await registerWithEmailAndPassword(createBaseNewUser(user));

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setRegistered(true);
    toast.success("User created successfully");
  };

  return {
    formRef,
    formErrors,
    isPending,
    handleBlur,
    handleSubmit: isSignup ? handleRegister : () => {},
  };
};
