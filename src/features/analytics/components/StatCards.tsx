import { FaArrowDown, FaArrowUp, FaComputerMouse, FaLink } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/shared/components/shadcn/card";

interface Props {
  totalLinks: number;
  totalClicksYesterday: number;
  totalClicksToday: number;
}

export const StatCards = ({ totalLinks, totalClicksYesterday, totalClicksToday }: Props) => {
  //* Computed Values
  const deltaPercent =
    totalClicksYesterday === 0
      ? 0
      : Math.round(((totalClicksToday - totalClicksYesterday) / totalClicksYesterday) * 100);
  const absoluteDeltaPercent = Math.abs(deltaPercent);
  const isPositive = deltaPercent >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Total links */}
      <Card>
        <CardContent className="flex items-center gap-5 p-6">
          <div
            className="size-12 rounded-xl bg-accent flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <FaLink size={22} className="text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Total links
            </span>
            <span className="font-heading text-3xl font-bold text-foreground tabular-nums">
              {totalLinks}
            </span>
            <span className="text-xs text-muted-foreground">Active on your public page</span>
          </div>
        </CardContent>
      </Card>

      {/* Clicks today */}
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
                className={cn(
                  "flex items-center gap-0.5 text-xs font-semibold mb-1",
                  isPositive ? "text-emerald-500" : "text-destructive",
                )}
                aria-label={`${isPositive ? "up" : "down"} ${absoluteDeltaPercent}% from yesterday`}
              >
                {isPositive ? (
                  <FaArrowUp size={13} aria-hidden="true" />
                ) : (
                  <FaArrowDown size={13} aria-hidden="true" />
                )}
                {absoluteDeltaPercent}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              vs. {totalClicksYesterday} yesterday
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
