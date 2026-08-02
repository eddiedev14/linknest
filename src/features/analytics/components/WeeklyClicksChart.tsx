import { IoTrendingUp } from "react-icons/io5";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
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
import type { ClicksPerDay } from "../types/stats.type";

interface Props {
  data: ClicksPerDay[];
}

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export const WeeklyClicksChart = ({ data }: Props) => {
  return (
    <Card className="p-5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <IoTrendingUp size={16} className="text-primary" aria-hidden="true" />
          <CardTitle className="text-base font-semibold">Clicks over the last 7 days</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Daily click activity across all your published links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full">
          <AreaChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="var(--color-clicks)"
              strokeWidth={2.5}
              fill="url(#clicksGrad)"
              dot={{ r: 3.5, fill: "var(--color-clicks)", strokeWidth: 0 }}
              activeDot={{
                r: 5.5,
                strokeWidth: 2,
                stroke: "var(--color-clicks)",
                fill: "var(--background)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
