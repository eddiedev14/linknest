import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/shadcn/badge";
import type { ProfessionalStatus } from "@/features/auth/types";
import { PROFESSIONAL_STATUS_PILL_COLORS } from "@/features/auth/constants/professionalStatus.constant";

interface Props {
  professionalStatus: Exclude<ProfessionalStatus, "">;
}

export const UserProfessionalStatusPill = ({ professionalStatus }: Props) => {
  return (
    <Badge variant="outline" className="shadow-sm font-semibold capitalize">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          PROFESSIONAL_STATUS_PILL_COLORS[professionalStatus],
        )}
        aria-hidden="true"
      />
      {professionalStatus.replaceAll("_", " ")}
    </Badge>
  );
};
