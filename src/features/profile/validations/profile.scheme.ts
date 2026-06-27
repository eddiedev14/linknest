import * as z from "zod";
import { PROFESSIONAL_STATUS_VALUES } from "@/features/auth/constants/professionalStatus.constant";

export const profileFormScheme = z.object({
  displayName: z.string(),
  bio: z.string().max(100, "Your bio must be less than 100 characters long"),
  professionalRole: z.string(),
  professionalStatus: z.enum(PROFESSIONAL_STATUS_VALUES),
  country: z.string(),
  city: z.string(),
  techStack: z.array(z.string()),
  /*
  languages: z.array(languageSchema),
  */
});
