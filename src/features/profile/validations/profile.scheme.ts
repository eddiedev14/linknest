import * as z from "zod";
import { LANGUAGE_LEVELS, PROFESSIONAL_STATUS_VALUES } from "@/features/auth/types/user.type";

const languageSchema = z.object({
  language: z.string(),
  level: z.enum(LANGUAGE_LEVELS),
});

export const profileFormScheme = z.object({
  displayName: z.string().optional(),
  bio: z.string().max(100, "Your bio must be less than 100 characters long").optional(),
  professionalRole: z.string().optional(),
  professionalStatus: z.enum(PROFESSIONAL_STATUS_VALUES).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  languages: z.array(languageSchema).optional(),
  experienceYears: z
    .string()
    .nullable()
    .refine((val) => {
      if (!val || val === "") return true;
      const num = Number(val);
      return !Number.isNaN(num);
    }, "Must be a number")
    .refine((val) => {
      if (!val || val === "") return true;

      const num = Number(val);
      return num >= 0 && num <= 100;
    }, "Must be between 0 and 100"),
});
