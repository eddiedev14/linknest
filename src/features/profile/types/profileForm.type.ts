import type { Languages, ProfessionalStatus } from "@/features/auth/types/user.type";

export interface ProfileForm {
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus | "";
  country: string;
  city: string;
  techStack: string[];
  languages: Languages[];
  experienceYears: number | null;
}
