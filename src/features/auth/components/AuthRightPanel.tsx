import SignupIllustration from "@/assets/signup-illustration.webp";
import SigninIllustration from "@/assets/signin-illustration.webp";
import ResetPasswordIllustration from "@/assets/reset-password-illustration.webp";

interface Props {
  isSignup?: boolean;
  isResetPassword?: boolean;
}

export const AuthRightPanel = ({ isSignup = false, isResetPassword = false }: Props) => {
  const CONTENT = {
    imageSrc: isResetPassword
      ? ResetPasswordIllustration
      : isSignup
        ? SignupIllustration
        : SigninIllustration,
    title: isResetPassword
      ? "Your Password in Your Hands."
      : isSignup
        ? "Create your developer identity."
        : "Welcome back to LinkNest.",
    paragraph: isResetPassword
      ? "At Linknest, we want to make sure you don't lose access to your account"
      : isSignup
        ? "Build a professional profile, showcase your work, and share everything from one personalized page."
        : "Continue managing your profile, keep your links up to date, and grow your online developer presence.",
  };

  return (
    <aside className="hidden lg:flex flex-1 flex-col items-center justify-center bg-accent/30 px-14 py-12 overflow-hidden">
      <div className="w-full max-w-md">
        <img
          src={CONTENT.imageSrc}
          alt="Person creating his account in Linknest platform"
          className="w-full h-auto drop-shadow-md"
          draggable="false"
        />
      </div>

      <div className="text-center flex flex-col gap-3 max-w-md">
        <h2 className="font-heading text-2xl font-bold text-foreground leading-snug text-balance">
          {CONTENT.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{CONTENT.paragraph}</p>
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
  );
};
