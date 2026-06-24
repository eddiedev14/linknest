import type { SelectOption } from "@/shared/components/forms/fields/SelectField";

const BANNER_PRESETS = [
  "banner-primary",
  "banner-ocean",
  "banner-sunset",
  "banner-forest",
  "banner-lavender",
  "banner-rose",
  "banner-aurora",
  "banner-midnight",
  "banner-gold",
  "banner-cherry",
  "banner-sky",
];

const PROFESSIONAL_STATUS_OPTIONS: SelectOption[] = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Open to Opportunities",
    value: "open_to_opportunities",
  },
  {
    label: "Currently Employed",
    value: "currently_employed",
  },
];

export { BANNER_PRESETS, PROFESSIONAL_STATUS_OPTIONS };
