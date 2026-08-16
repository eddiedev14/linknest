import { steps } from "@/data/landing.data";
import { StepItem } from "./StepItem";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 bg-muted/40" aria-label="How it works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-balance">
            Your profile in <span className="text-primary">4 simple steps</span>
          </h2>
          <p className="text-muted-foreground max-w-md leading-relaxed text-balance">
            Create your developer profile, connect your platforms, and start sharing it in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-6 lg:gap-x-8">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-border z-0"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <StepItem step={step} key={step.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
