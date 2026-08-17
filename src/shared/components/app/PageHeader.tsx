interface Props {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
};
