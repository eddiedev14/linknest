import { Link } from "react-router-dom";
import Logo from "/logo.webp";
import GoogleIcon from "@/assets/google-icon.svg";
import GithubIcon from "@/assets/github-icon.svg";
import { Button } from "@/shared/components/shadcn/button";
import { Separator } from "@/shared/components/shadcn/separator";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { ResetPasswordDialog } from "@/features/auth/components/ResetPasswordDialog";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { useAuthProviders } from "@/features/auth/hooks/useAuthProviders";
import { useDialog } from "@/shared/hooks/useDialog";

interface Props {
  isSignup?: boolean;
  isResetPassword?: boolean;
}

export const AuthLeftPanel = ({ isSignup = false, isResetPassword = false }: Props) => {
  const { handleProviderAuth } = useAuthProviders();
  const { open, onOpenChange, handleOpenDialog } = useDialog();

  const CONTENT = {
    title: isResetPassword ? "Reset Password" : isSignup ? "Create your account" : "Welcome back",
    paragraph: isResetPassword
      ? "Reset your password using the form below so you can log back into Linknest"
      : isSignup
        ? "Create your LinkNest profile and start sharing everything that matters from one place."
        : "Sign in to access your profile, update your links, and manage your developer presence.",
    google: isSignup ? "Continue with Google" : "Sign in with Google",
    github: isSignup ? "Continue with Github" : "Sign in with Github",
    separator: isSignup ? "or continue with email" : "or sign in with email",
    oppositePageSpanText: isSignup ? "Already have an account? " : "Don't have an account? ",
    oppositePageLinkText: isSignup ? "Sign in" : "Create one",
    oppositePageLink: isSignup ? "/login" : "/signup",
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-10 sm:px-8 md:px-16 lg:px-20 max-w-xl">
      <a href="/" className="flex items-center gap-2 group" aria-label="Linknest Home">
        <img src={Logo} alt="" aria-hidden="true" className="size-8" />
        <span className="font-heading font-bold text-xl text-foreground tracking-tight">
          Link <span className="text-primary">Nest</span>
        </span>
      </a>

      <div className="flex flex-col gap-8 pt-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-heading font-bold text-foreground text-3xl tracking-tight text-balance">
            {CONTENT.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">{CONTENT.paragraph}</p>
        </div>

        {/* Auth Providers */}
        {!isResetPassword && (
          <div className="flex flex-col gap-4 *:w-full *:h-11 *:rounded-xl *:font-medium *:text-foreground *:border-border *:gap-3">
            <Button
              variant="outline"
              size="lg"
              className=""
              aria-label={CONTENT.google}
              onClick={() => handleProviderAuth("google")}
            >
              <img src={GoogleIcon} alt="" aria-hidden="true" />
              {CONTENT.google}
            </Button>

            <Button
              variant="outline"
              size="lg"
              aria-label={CONTENT.github}
              onClick={() => handleProviderAuth("github")}
            >
              <img src={GithubIcon} alt="" aria-hidden="true" />
              {CONTENT.github}
            </Button>
          </div>
        )}

        {/* Separator between providers and form */}
        {!isResetPassword && (
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium px-1 select-none">
              {CONTENT.separator}
            </span>
            <Separator className="flex-1" />
          </div>
        )}

        {/* Sign up / Sign in content */}
        {!isResetPassword && (
          <>
            <AuthForm isSignup={isSignup} />
            <ResetPasswordDialog openDialog={open} onOpenDialog={onOpenChange} />

            <div className="flex flex-col gap-1 text-center *:text-sm *:text-muted-foreground">
              <span>
                {CONTENT.oppositePageSpanText}
                <Link
                  to={CONTENT.oppositePageLink}
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  {CONTENT.oppositePageLinkText}
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
          </>
        )}

        {/* Reset Password Content */}
        {isResetPassword && <ResetPasswordForm />}
      </div>
    </div>
  );
};
