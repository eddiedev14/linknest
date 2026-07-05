import { z } from "zod";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../constants/regex.constant";

const authScheme = (isSignup: boolean) => {
  if (isSignup) {
    return z
      .object({
        email: z.email("Please enter a valid email address."),
        username: z
          .string()
          .regex(
            USERNAME_REGEX,
            "Username must be 3–20 characters long and contain only lowercase letters (no diacritics), numbers, and underscores.",
          ),
        password: z
          .string()
          .regex(
            PASSWORD_REGEX,
            "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
          ),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match.",
      });
  }

  return z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
  });
};

export { authScheme };
