import { TygerAvatar } from "tyger-avatar";
import { FaArrowRight, FaLink, FaChartBar, FaPalette } from "react-icons/fa6";
import { Badge } from "../shadcn/badge";
import { mockAnalytics, mockLinks } from "@/data/landing.data";
import { Input } from "../shadcn/input";

export default function Hero() {
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
            "linear-gradient(to right, oklch(0.9 0 0 / 0.6) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <Badge className="inline-flex items-center gap-2 self-start bg-accent text-accent-foreground text-xs font-semibold p-3 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            The smarter way to manage your links
          </Badge>

          <h1 className="font-heading text-5xl md:text-6xl font-bold leading-[1.1] text-foreground text-balance">
            All your links. <span className="text-primary">One page.</span>
            <br />
            Real analytics.
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            Create your personalized public page in minutes. Share your
            portfolio, socials, store and more — and actually know which links
            your audience clicks.
          </p>

          {/* URL preview input */}
          <div className="flex items-center bg-muted rounded-xl border border-border px-4 py-3 max-w-sm">
            <span className="text-sm text-muted-foreground font-mono whitespace-nowrap select-none">
              getlinknest.vercel.app/u/
            </span>
            <Input
              type="text"
              defaultValue="yourname"
              aria-label="Choose your username"
              className="p-0 h-fit border-none font-mono font-semibold text-sm text-primary shadow-none"
            />
            <a
              href="/signup"
              className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
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
              <FaArrowRight size={16} />
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
            className="relative w-64 rounded-[2.5rem] border-2 border-border bg-white shadow-2xl overflow-hidden"
            style={{
              minHeight: "520px",
              boxShadow:
                "0 32px 80px -12px oklch(0.564 0.21 270.5 / 0.2), 0 0 0 1px oklch(0.9 0 0)",
            }}
            aria-label="Product preview"
          >
            {/* Phone notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-border z-10" />

            {/* Banner */}
            <div
              className="h-28 w-full relative"
              style={{ background: "oklch(0.564 0.21 270.5)" }}
            ></div>
            {/* Avatar */}
            <div className="flex flex-col items-center mt-14 px-5 pb-6">
              <div className="absolute top-12">
                <TygerAvatar name="TrHarry" size="md" />
              </div>
              <p className="mt-2 font-heading font-bold text-sm text-foreground">
                Alex Johnson
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Designer & Creator
              </p>

              {/* Links */}
              <div className="mt-4 w-full flex flex-col gap-3">
                {mockLinks.map((link, i) => {
                  const Icon = link.icon;

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-white hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-primary" />
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
            className="absolute -right-4 top-1/3 w-36 bg-white rounded-2xl shadow-xl border border-border p-3 flex flex-col gap-2"
            style={{ boxShadow: "0 8px 32px -4px oklch(0 0 0 / 0.1)" }}
            aria-hidden="true"
          >
            <div className="flex items-center gap-1.5">
              <FaChartBar size={12} className="text-primary" />
              <span className="text-[10px] font-semibold text-foreground">
                This week
              </span>
            </div>
            {mockAnalytics.map((bar) => (
              <div key={bar.label} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-muted-foreground">
                    {bar.label}
                  </span>
                  <span className="text-[9px] font-bold text-foreground">
                    {bar.val}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full bg-primary ${bar.w}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Floating badge */}
          <Badge className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-lg border border-border p-3 flex items-center gap-2">
            <FaLink size={12} className="text-primary" />
            <span className="text-[10px] font-semibold text-foreground">
              getlinknest.vercel.app/u/alex
            </span>
          </Badge>

          {/* Floating customise badge */}
          <Badge className="absolute -left-6 top-16 bg-primary text-primary-foreground rounded-xl shadow-lg p-3 flex items-center gap-2">
            <FaPalette size={11} />
            <span className="text-[10px] font-semibold">
              Fully customizable
            </span>
          </Badge>
        </div>
      </div>
    </section>
  );
}
