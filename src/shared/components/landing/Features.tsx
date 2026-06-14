import { features } from "@/data/landing.data";
import { FeatureCard } from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white" aria-label="Features">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-balance">
            Everything developers need,{" "}
            <span className="text-primary">in one place</span>
          </h2>
          <p className="text-muted-foreground max-w-lg leading-relaxed text-balance">
            Centralize your professional links, coding platforms, content, and
            contact channels from a single developer profile.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <FeatureCard feature={feat} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
