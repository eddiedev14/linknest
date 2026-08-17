import * as z from "zod";
import { PASSWORD_REGEX } from "../constants/regex.constant";

const resetPasswordDialogScheme = z.object({
  resetEmail: z.email("Please enter a valid email address."),
});

const resetPasswordFormScheme = z
  .object({
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

export { resetPasswordDialogScheme, resetPasswordFormScheme };
