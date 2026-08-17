import * as z from "zod";
import { USERNAME_REGEX } from "@/features/auth/constants/regex.constant";
import { PROFESSIONAL_STATUS_VALUES } from "@/features/auth/constants/professionalStatus.constant";
import { TECH_VALUES } from "@/features/auth/constants/techs.constant";
import { LANGUAGE_VALUES } from "@/features/auth/constants/languages.constant";

export const profileFormScheme = z.object({
  username: z
    .string()
    .regex(
      USERNAME_REGEX,
      "Username must be 3–20 characters long and contain only lowercase letters (no diacritics), numbers, and underscores.",
    ),
  displayName: z.string(),
  bio: z.string().max(100, "Your bio must be less than 100 characters long"),
  professionalRole: z.string(),
  professionalStatus: z.enum(PROFESSIONAL_STATUS_VALUES),
  country: z.string(),
  city: z.string(),
  techStack: z.array(z.enum(TECH_VALUES)),
  languages: z.array(z.enum(LANGUAGE_VALUES)),
});
