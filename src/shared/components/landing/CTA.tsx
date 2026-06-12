import { FaArrowRight } from "react-icons/fa6";
import { Input } from "../shadcn/input";

export default function CTA() {
  return (
    <section className="pt-16 pb-24 bg-muted/40" aria-label="Call to action">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Get started
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground text-balance max-w-2xl">
            Your links deserve a{" "}
            <span className="text-primary">better home</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed text-balance">
            Create your free LinkNest page today. Share it everywhere. Know what
            works.
          </p>
        </div>

        {/* URL claim */}
        <div className="flex items-center bg-white rounded-2xl border border-border px-5 py-3.5 shadow-sm max-w-sm w-full">
          <span className="text-sm text-muted-foreground font-mono whitespace-nowrap select-none">
            linknest.app/u/
          </span>
          <Input
            type="text"
            defaultValue="yourname"
            aria-label="Choose your username"
            className="p-0 h-fit border-none font-mono font-semibold text-sm text-primary shadow-none"
          />
        </div>

        <a
          href="/signup"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20 text-base"
        >
          Claim your free page
          <FaArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
