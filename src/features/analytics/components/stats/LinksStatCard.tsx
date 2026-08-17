import { FaLink } from "react-icons/fa6";
import { Card, CardContent } from "@/shared/components/shadcn/card";

interface Props {
  totalLinks: number;
}

export const LinksStatCard = ({ totalLinks }: Props) => {
  return (
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
  );
};
