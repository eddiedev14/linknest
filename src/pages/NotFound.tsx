import NotFoundIllustration from "@/assets/404-scene.png";
import { FaArrowLeft } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12 text-center">
        {/* Illustration */}
        <div className="w-full max-w-sm select-none pointer-events-none">
          <img
            src={NotFoundIllustration}
            alt="A confused person standing next to a broken 404 sign"
            className="w-full"
          />
        </div>

        {/* Headline */}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance leading-tight mb-4">
          This page got lost
          <br className="hidden sm:block" /> in the internet
        </h1>

        {/* Subtext */}
        <p className="text-base text-muted-foreground leading-relaxed max-w-sm mb-5 text-balance">
          The link you followed might be broken, or the page may have been removed. Either way,
          there&apos;s a whole lot more to explore.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            <LuSparkles />
            Create your LinkNest
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-foreground border border-border font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-primary/20"
          >
            <FaArrowLeft />
            Back to home
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
