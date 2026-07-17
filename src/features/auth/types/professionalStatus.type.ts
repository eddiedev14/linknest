import type { PROFESSIONAL_STATUS_LABELS } from "../constants/professionalStatus.constant";

export type ProfessionalStatus = keyof typeof PROFESSIONAL_STATUS_LABELS | "";
