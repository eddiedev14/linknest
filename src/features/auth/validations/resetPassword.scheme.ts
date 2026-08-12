import * as z from "zod";

const resetPasswordScheme = z.object({
  resetEmail: z.email("Please enter a valid email address."),
});

export { resetPasswordScheme };
