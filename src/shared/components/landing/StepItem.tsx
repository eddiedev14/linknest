import type { IStepItem } from "@/shared/interfaces/landing.interfaces";

interface Props {
  step: IStepItem;
}

export const StepItem = ({ step }: Props) => {
  const { number, title, description } = step;

  return (
    <div className="relative z-10 flex flex-col items-center text-center gap-4">
      {/* Step number circle */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-base bg-white border-2 border-primary text-primary shadow-sm shadow-primary/10">
        {number}
      </div>
      <h3 className="font-heading font-bold text-base text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};
