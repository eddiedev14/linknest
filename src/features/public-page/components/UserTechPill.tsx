import { Badge } from "../../../shared/components/shadcn/badge";
import type { Tech } from "@/features/auth/types";
import { TECH_LABELS } from "@/features/auth/constants/techs.constant";

interface Props {
  tech: Tech;
}

export const UserTechPill = ({ tech }: Props) => {
  return (
    <Badge className="bg-accent/60 border-accent text-primary font-semibold">
      {TECH_LABELS[tech]}
    </Badge>
  );
};
