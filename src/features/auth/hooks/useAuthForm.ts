import { useRef, useState, type FocusEvent } from "react";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../constants/regex.constant";

type AuthFields = "email" | "username" | "password";

export const useAuthForm = (isSignup: boolean) => {
  //* States
  const [formErrors, setFormErrors] = useState<Record<AuthFields, string>>({
    email: "",
    username: "",
    password: "",
  });

  //* References
  const formRef = useRef<HTMLFormElement>(null);

  //* Handlers

  // ? Blur validations
  const handleBlurEmail = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!EMAIL_REGEX.test(e.target.value)) {
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

  const handleBlurUsername = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!USERNAME_REGEX.test(e.target.value)) {
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

  const handleBlurPassword = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!PASSWORD_REGEX.test(e.target.value)) {
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

  return {
    formRef,
    formErrors,

    handleBlurEmail,
    handleBlurUsername,
    handleBlurPassword,
  };
};
