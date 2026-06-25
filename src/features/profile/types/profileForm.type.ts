import type { ProfessionalStatus } from "@/features/auth/types/professionalStatus.type";
import type { Languages } from "@/features/auth/types/languages.type";

export interface ProfileForm {
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus | "";
  country: string;
  city: string;
  techStack: string[];
  languages: Languages[];
}
