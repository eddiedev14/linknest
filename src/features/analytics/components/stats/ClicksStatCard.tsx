import { cn } from "@/lib/utils";
import { FaComputerMouse } from "react-icons/fa6";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { getDeltaClicksInfo } from "../../utils/analytics.helper";

interface Props {
  totalClicksToday: number;
  totalClicksYesterday: number;
}

export const ClicksStatCard = ({ totalClicksToday, totalClicksYesterday }: Props) => {
  const deltaClicks = totalClicksToday - totalClicksYesterday;
  const absoluteDeltaClicks = Math.abs(deltaClicks);
  const { classname, Icon, ariaLabel, value } = getDeltaClicksInfo(
    deltaClicks,
    absoluteDeltaClicks,
  );

  return (
    <Card>
      <CardContent className="flex items-center gap-5 p-6">
        <div
          className="size-12 rounded-xl bg-accent flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <FaComputerMouse size={22} className="text-primary" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Clicks today
          </span>
          <div className="flex items-end gap-2">
            <span className="font-heading text-3xl font-bold text-foreground tabular-nums">
              {totalClicksToday}
            </span>
            <span
              className={cn("flex items-center gap-0.5 text-xs font-semibold mb-1", classname)}
              aria-label={ariaLabel}
            >
              <Icon size={13} aria-hidden="true" />
              {value}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            vs. {totalClicksYesterday} yesterday
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
