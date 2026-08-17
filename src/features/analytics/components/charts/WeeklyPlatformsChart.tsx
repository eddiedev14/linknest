import { FaChartPie } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/shadcn/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/shadcn/chart";
import { PieChart, Pie } from "recharts";
import type { PlatformId } from "@/features/links/types/platform.type";
import type { ClicksByPlatformChart } from "../../types/stats.type";
import { LINK_PLATFORMS_MAP } from "@/shared/data/links.data";

interface ChartConfigValue {
  label: string;
  color: string;
}

type PieChartConfig = Partial<Record<PlatformId, ChartConfigValue>>;

interface Props {
  data: ClicksByPlatformChart[];
}

export const WeeklyPlatformsChart = ({ data }: Props) => {
  // * Objects for recharts
  const chartData = data.map((item) => ({
    ...item,
    fill: `var(--color-${item.platform})`,
  }));

  const chartConfig = data.reduce((acc, item) => {
    const { name, chartColor } = LINK_PLATFORMS_MAP[item.platform];

    acc[item.platform] = {
      label: name,
      color: chartColor,
    };

    return acc;
  }, {} as PieChartConfig);

  return (
    <Card
      className="p-5"
      aria-label="Pie chart showing the distribution of clicks by platform over the last 7 days"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FaChartPie size={16} className="text-primary" aria-hidden="true" />
          <CardTitle className="text-base font-semibold">
            Clicks by platform (Last 7 days)
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Distributions of clicks grouped by link platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-55">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="clicks" nameKey="platform" innerRadius={50} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
