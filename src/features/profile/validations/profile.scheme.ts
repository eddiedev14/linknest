import * as z from "zod";
import { LANGUAGE_LEVELS } from "@/features/auth/constants/languages.constant";
import { PROFESSIONAL_STATUS_VALUES } from "@/features/auth/constants/professionalStatus.constant";

const languageSchema = z.object({
  language: z.string(),
  level: z.enum(LANGUAGE_LEVELS),
});

export const profileFormScheme = z.object({
  displayName: z.string().optional(),
  bio: z.string().max(100, "Your bio must be less than 100 characters long").optional(),
  professionalRole: z.string().optional(),
  professionalStatus: z.enum(PROFESSIONAL_STATUS_VALUES).nullable(),
  country: z.string().optional(),
  city: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  languages: z.array(languageSchema).optional(),
});
