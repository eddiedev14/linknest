import { Button } from "@/shared/components/shadcn/button";
import { Separator } from "@/shared/components/shadcn/separator";

import { AuthForm } from "@/features/auth/components/AuthForm";

import Logo from "@/assets/logo.png";
import GoogleIcon from "@/assets/google-icon.svg";
import AuthIllustration from "@/assets/auth-illustration.png";

interface Props {
  isSignup: boolean;
}

export const AuthPage = ({ isSignup }: Props) => {
  return (
    <main
      className="min-h-screen bg-background flex"
      aria-label="Create your account"
    >
      {/* ── Left panel: form ── */}
      <div className="flex-1 flex flex-col px-8 py-10 md:px-16 lg:px-20 max-w-xl">
        <a
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Linknest Home"
        >
          <img src={Logo} alt="Linknest Logo" className="size-8" />
          <span className="font-heading font-bold text-xl text-foreground tracking-tight">
            Link <span className="text-primary">Nest</span>
          </span>
        </a>

        <div className="flex flex-col gap-8 pt-10">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-heading font-bold text-foreground text-3xl tracking-tight text-balance">
              Create your account
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get your public link page live in under 2 minutes.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full h-11 rounded-xl font-medium text-foreground border-border gap-3"
            aria-label="Sign in with Google"
          >
            <img src={GoogleIcon} alt="Google Icon" />
            Sign up with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium px-1 select-none">
              or sign up with email
            </span>
            <Separator className="flex-1" />
          </div>

          <AuthForm isSignup={isSignup} />
        </div>
      </div>

      {/* Right panel ── */}
      <aside
        className="hidden lg:flex flex-1 flex-col items-center justify-center bg-accent/30 px-14 py-12 overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full max-w-md">
          <img
            src={AuthIllustration}
            alt="Person creating his account in Linknest platform"
            className="w-full h-auto drop-shadow-md"
            draggable="false"
          />
        </div>

        <div className="text-center flex flex-col gap-3 max-w-md">
          <h2 className="font-heading text-2xl font-bold text-foreground leading-snug text-balance">
            One link for everything you create
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Share your portfolio, socials, store and more — and see exactly
            which links your audience clicks.
          </p>
          <span className="text-sm text-muted-foreground leading-relaxed">
            Illustration by{" "}
            <a
              href="https://storyset.com/user"
              target="_blank"
              className="underline hover:text-primary"
            >
              Storyset
            </a>
          </span>
        </div>
      </aside>
    </main>
  );
};
