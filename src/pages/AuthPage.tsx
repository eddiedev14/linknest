import { Link, Navigate } from "react-router-dom";
import Logo from "/logo.png";
import GoogleIcon from "@/assets/google-icon.svg";
import GithubIcon from "@/assets/github-icon.svg";
import SignupIllustration from "@/assets/signup-illustration.png";
import SigninIllustration from "@/assets/signin-illustration.png";
import { Button } from "@/shared/components/shadcn/button";
import { Separator } from "@/shared/components/shadcn/separator";
import { Loader } from "@/shared/components/app/Loader";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useAuthProviders } from "@/features/auth/hooks/useAuthProviders";
import { useDialog } from "@/shared/hooks/useDialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ResetPasswordDialog } from "@/features/auth/components/ResetPasswordDialog";

interface Props {
  isSignup?: boolean;
}

export const AuthPage = ({ isSignup = false }: Props) => {
  const { user, userLoading } = useAuth();
  const { handleProviderAuth } = useAuthProviders();
  const { open, onOpenChange, handleOpenDialog } = useDialog();

  if (userLoading) return <Loader />;
  if (user) return <Navigate to="/profile" replace />;

  return (
    <main className="min-h-screen bg-background flex" aria-label="Create your account">
      {/* ── Left panel: form ── */}
      <div className="flex-1 flex flex-col px-6 py-10 sm:px-8 md:px-16 lg:px-20 max-w-xl">
        <a href="/" className="flex items-center gap-2 group" aria-label="Linknest Home">
          <img src={Logo} alt="Linknest Logo" className="size-8" />
          <span className="font-heading font-bold text-xl text-foreground tracking-tight">
            Link <span className="text-primary">Nest</span>
          </span>
        </a>

        <div className="flex flex-col gap-8 pt-10">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-heading font-bold text-foreground text-3xl tracking-tight text-balance">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isSignup
                ? "Create your LinkNest profile and start sharing everything that matters from one place."
                : "Sign in to access your profile, update your links, and manage your developer presence."}
            </p>
          </div>
          <div className="flex flex-col gap-4 *:w-full *:h-11 *:rounded-xl *:font-medium *:text-foreground *:border-border *:gap-3">
            <Button
              variant="outline"
              size="lg"
              className=""
              aria-label="Sign in with Google"
              onClick={() => handleProviderAuth("google")}
            >
              <img src={GoogleIcon} alt="Google Icon" />
              {isSignup ? "Continue with Google" : "Sign in with Google"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              aria-label="Sign in with Github"
              onClick={() => handleProviderAuth("github")}
            >
              <img src={GithubIcon} alt="Github Icon" />
              {isSignup ? "Continue with GitHub" : "Sign in with GitHub"}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium px-1 select-none">
              {isSignup ? "or continue with email" : "or sign in with email"}
            </span>
            <Separator className="flex-1" />
          </div>
          {/* Auth Form */}
          <AuthForm isSignup={isSignup} />

          {/* Reset Password Dialog */}
          <ResetPasswordDialog openDialog={open} onOpenDialog={onOpenChange} />

          {/* Other actions */}
          <div className="flex flex-col gap-1 text-center *:text-sm *:text-muted-foreground">
            <span>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <Link
                to={isSignup ? "/login" : "/signup"}
                className="font-medium text-primary hover:underline transition-colors"
              >
                {isSignup ? "Sign in" : "Create one"}
              </Link>
            </span>
            {!isSignup && (
              <span>
                Did you forget your password? {""}
                <Button variant="link" size="sm" onClick={handleOpenDialog} className="p-0">
                  Reset Password
                </Button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right panel ── */}
      <aside className="hidden lg:flex flex-1 flex-col items-center justify-center bg-accent/30 px-14 py-12 overflow-hidden">
        <div className="w-full max-w-md">
          <img
            src={isSignup ? SignupIllustration : SigninIllustration}
            alt="Person creating his account in Linknest platform"
            className="w-full h-auto drop-shadow-md"
            draggable="false"
          />
        </div>

        <div className="text-center flex flex-col gap-3 max-w-md">
          <h2 className="font-heading text-2xl font-bold text-foreground leading-snug text-balance">
            {isSignup ? "Create your developer identity." : "Welcome back to LinkNest."}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isSignup
              ? "Build a professional profile, showcase your work, and share everything from one personalized page."
              : "Continue managing your profile, keep your links up to date, and grow your online developer presence."}
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
