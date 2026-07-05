import type { ProfessionalStatus } from "@/features/auth/types/professionalStatus.type";

export interface ProfileForm {
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus | "";
  country: string;
  city: string;
  techStack: string[];
  languages: string[];
}
