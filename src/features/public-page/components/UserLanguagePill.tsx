import type { Language } from "@/features/auth/types";
import { Badge } from "../../../shared/components/shadcn/badge";
import { LANGUAGE_LABELS } from "@/features/auth/constants/languages.constant";

interface Props {
  language: Language;
}

export const UserLanguagePill = ({ language }: Props) => {
  return <Badge variant="outline">{LANGUAGE_LABELS[language]}</Badge>;
};
