import { useRef, useState, type FocusEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  isInvalidEmail,
  isInvalidPassword,
  isInvalidUsername,
} from "../utils/form.helper";
import { createBaseNewUser } from "../utils/firebase.helper";

import type { UserRegister } from "../types/user.type";
import { useAuth } from "./useAuth";

type AuthFields = "email" | "username" | "password";

export const useAuthForm = (isSignup: boolean) => {
  //* States
  const [formErrors, setFormErrors] = useState<Record<AuthFields, string>>({
    email: "",
    username: "",
    password: "",
  });

  //* Contexts
  const { loading, registerWithEmailAndPassword } = useAuth();

  //* References
  const formRef = useRef<HTMLFormElement>(null);

  //* Navigate
  const navigate = useNavigate();

  //* Handlers

  // ? Blur validations
  const handleBlurEmail = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isInvalidEmail(e.target.value)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    setFormErrors((prev) => ({
      ...prev,
      email: "",
    }));
  };

  const handleBlurUsername = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isInvalidUsername(e.target.value)) {
      setFormErrors((prev) => ({
        ...prev,
        username:
          "Username must be 3–20 characters long and contain only lowercase letters, numbers, and underscores.",
      }));
      return;
    }

    setFormErrors((prev) => ({
      ...prev,
      username: "",
    }));
  };

  const handleBlurPassword = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isInvalidPassword(e.target.value)) {
      setFormErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      }));
      return;
    }

    setFormErrors((prev) => ({
      ...prev,
      password: "",
    }));
  };

  // ? Submit methods
  const handleRegister = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Data validation
    const { email, username, password } = Object.fromEntries(
      new FormData(formRef.current),
    ) as UserRegister;

    if (
      isInvalidEmail(email) ||
      isInvalidUsername(username) ||
      isInvalidPassword(password)
    ) {
      toast.error("There are invalid fields");
      return;
    }

    // Register the new base user
    const errorMessage = await registerWithEmailAndPassword(
      createBaseNewUser(email, username, password),
    );

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("User created successfully");
    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 2000);
  };

  return {
    formRef,
    formErrors,
    loading,

    handleBlurEmail,
    handleBlurUsername,
    handleBlurPassword,
    handleSubmit: isSignup ? handleRegister : () => {},
  };
};
