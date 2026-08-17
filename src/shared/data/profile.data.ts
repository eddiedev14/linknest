import type { SelectOption } from "@/shared/components/forms/fields/SelectField";
import { PROFESSIONAL_STATUS_LABELS } from "@/features/auth/constants/professionalStatus.constant";
import { TECH_LABELS } from "@/features/auth/constants/techs.constant";
import { LANGUAGE_LABELS } from "@/features/auth/constants/languages.constant";

//* Professional Status
const PROFESSIONAL_STATUS_OPTIONS: SelectOption[] = Object.entries(PROFESSIONAL_STATUS_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

//* Tech Stack
const TECH_STACK_OPTIONS: SelectOption[] = Object.entries(TECH_LABELS).map(([value, label]) => ({
  value,
  label,
}));

//* Languages
const LANGUAGES_OPTIONS: SelectOption[] = Object.entries(LANGUAGE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export { PROFESSIONAL_STATUS_OPTIONS, TECH_STACK_OPTIONS, LANGUAGES_OPTIONS };
