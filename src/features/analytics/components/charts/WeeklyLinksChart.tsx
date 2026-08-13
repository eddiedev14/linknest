import { LuMousePointer } from "react-icons/lu";
import { XAxis, YAxis, Bar, BarChart } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/shadcn/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/shadcn/chart";
import type { ClicksByLinkChart } from "../../types/stats.type";

interface Props {
  data: ClicksByLinkChart[];
}

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export const WeeklyLinksChart = ({ data }: Props) => {
  return (
    <Card className="p-5" aria-label="Bar chart showing the number of clicks for each link over the last 7 days">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <LuMousePointer size={16} className="text-primary" aria-hidden="true" />
          <CardTitle className="text-base font-semibold">Clicks by link (Last 7 Days)</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Individual performance of each published link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full">
          <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 10 }}>
            <XAxis type="number" dataKey="clicks" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="label"
              type="category"
              width={80}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="label" />}
            />
            <Bar dataKey="clicks" fill="var(--color-chart-1)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
