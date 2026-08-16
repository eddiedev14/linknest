import { TygerAvatar } from "tyger-avatar";
import { FaArrowRight, FaLink, FaChartBar, FaPalette } from "react-icons/fa6";
import { Badge } from "../shadcn/badge";
import { mockAnalytics, mockLinks } from "@/data/landing.data";
import { Input } from "../shadcn/input";

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <Badge className="inline-flex items-center gap-2 self-start bg-background text-accent-foreground text-xs font-semibold p-3 rounded-full border border-primary/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Built for developers
          </Badge>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-foreground text-balance">
            Your dev profile. <span className="text-primary">One page.</span>
            <br />
            Real analytics.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            Centralize your professional presence in one place. Share your developer profile, coding
            platforms, social links, and contact channels with a single link.
          </p>

          {/* URL preview input */}
          <div className="flex items-center bg-muted rounded-xl border border-border px-4 py-3 max-w-sm w-full">
            <span className="text-sm text-muted-foreground font-mono whitespace-nowrap select-none shrink-0">
              getlinknest.vercel.app/u/
            </span>
            <Input
              type="text"
              defaultValue="yourname"
              readOnly
              aria-label="Choose your username"
              className="p-0 h-fit bg-transparent dark:bg-transparent border-none font-mono font-semibold text-sm text-primary shadow-none flex-1 min-w-0"
            />
            <a
              href="/signup"
              className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap shrink-0"
            >
              Claim it
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              Get started free
              <FaArrowRight />
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              See how it works →
            </a>
          </div>
        </div>

        {/* Right: Product mock-up */}
        <div className="relative flex justify-center">
          {/* Phone frame */}
          <div
            className="relative w-64 rounded-[2.5rem] border-2 border-border bg-background shadow-2xl overflow-hidden"
            style={{
              minHeight: "520px",
              boxShadow: "0 32px 80px -12px oklch(0.564 0.21 270.5 / 0.2), 0 0 0 1px var(--border)",
            }}
            role="img"
            aria-label="Product preview of a developer profile page"
          >
            {/* Phone notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-border z-10" />

            {/* Banner */}
            <div
              className="h-28 w-full relative"
              style={{ background: "oklch(0.564 0.21 270.5)" }}
              aria-hidden="true"
            ></div>
            {/* Avatar */}
            <div className="flex flex-col items-center mt-14 px-5 pb-6">
              <div className="absolute top-12">
                <TygerAvatar name="TrHarry" size="md" />
              </div>
              <p className="mt-2 font-heading font-bold text-sm text-foreground">Alex Johnson</p>
              <p className="text-xs text-muted-foreground mt-0.5">Frontend Developer</p>

              {/* Links */}
              <div className="mt-4 w-full flex flex-col gap-3">
                {mockLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <div
                      key={link.label}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="text-primary" />
                        <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {link.clicks}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating analytics card */}
          <div
            className="absolute -right-3 sm:-right-4 top-1/3 w-36 bg-background rounded-2xl shadow-xl border border-border p-3 flex flex-col gap-2"
            style={{ boxShadow: "0 8px 32px -4px oklch(0 0 0 / 0.1)" }}
            aria-hidden="true"
          >
            <div className="flex items-center gap-1.5">
              <FaChartBar className="text-primary" />
              <span className="text-[10px] font-semibold text-foreground">This week</span>
            </div>
            {mockAnalytics.map((bar) => (
              <div key={bar.label} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-muted-foreground">{bar.label}</span>
                  <span className="text-[9px] font-bold text-foreground">{bar.val}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full bg-primary ${bar.w}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Floating badge */}
          <Badge
            className="absolute -left-3 sm:-left-4 bottom-1/4 bg-background rounded-xl shadow-lg border border-border p-3 flex items-center gap-2"
            aria-hidden="true"
          >
            <FaLink className="text-primary" />
            <span className="text-[10px] font-semibold text-foreground">
              getlinknest.vercel.app/u/alex
            </span>
          </Badge>

          {/* Floating customise badge */}
          <Badge
            className="absolute -left-3 sm:-left-6 top-16 bg-primary text-primary-foreground rounded-xl shadow-lg p-3 flex items-center gap-2"
            aria-hidden="true"
          >
            <FaPalette />
            <span className="text-[10px] font-semibold">Fully customizable</span>
          </Badge>
        </div>
      </div>
    </section>
  );
};
