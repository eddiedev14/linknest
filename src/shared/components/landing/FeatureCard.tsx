import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import type { IFeatureItem } from "@/shared/interfaces/landing.interfaces";

interface Props {
  feature: IFeatureItem;
}

export const FeatureCard = ({ feature }: Props) => {
  const { icon: Icon, title, description } = feature;

  return (
    <Card className="border border-border bg-card p-4 cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
          <Icon className="text-primary group-hover/card:text-primary-foreground transition-colors duration-300" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
