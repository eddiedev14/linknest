import { ClicksStatCard } from "./ClicksStatCard";
import { LinksStatCard } from "./LinksStatCard";

interface Props {
  totalLinks: number;
  totalClicksYesterday: number;
  totalClicksToday: number;
}

export const StatCards = ({ totalLinks, totalClicksYesterday, totalClicksToday }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <LinksStatCard totalLinks={totalLinks} />
      <ClicksStatCard
        totalClicksToday={totalClicksToday}
        totalClicksYesterday={totalClicksYesterday}
      />
    </div>
  );
};
