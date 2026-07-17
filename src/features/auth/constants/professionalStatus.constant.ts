import type { ProfessionalStatus } from "../types/professionalStatus.type";

export const PROFESSIONAL_STATUS_LABELS = {
  available: "Available",
  open_to_opportunities: "Open to Opportunities",
  currently_employed: "Currently Employed",
} as const;

export const PROFESSIONAL_STATUS_VALUES = [
  "",
  ...Object.keys(PROFESSIONAL_STATUS_LABELS),
] as ProfessionalStatus[];
