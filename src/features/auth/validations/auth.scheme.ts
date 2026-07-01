import { z } from "zod";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../constants/regex.constant";

const authScheme = (isSignup: boolean) =>
  z
    .object({
      email: z.email("Please enter a valid email address."),
      username: isSignup
        ? z
            .string()
            .regex(
              USERNAME_REGEX,
              "Username must be 3–20 characters long and contain only lowercase letters (no diacritics), numbers, and underscores.",
            )
        : z.string(),
      password: z
        .string()
        .regex(
          PASSWORD_REGEX,
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
        ),
      confirmPassword: z.string(),
    })
    // ? Password validation
    .refine(
      (data) => {
        if (!isSignup) {
          return true;
        }

        return data.password === data.confirmPassword;
      },
      {
        path: ["confirmPassword"],
        error: "Passwords don't match.",
      },
    );

export { authScheme };
