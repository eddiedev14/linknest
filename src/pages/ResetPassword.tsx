import Logo from "/logo.webp";
import ResetPasswordIllustration from "@/assets/reset-password-illustration.webp";
import { SEO } from "@/shared/components/SEO";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <SEO
        title="Reset your password"
        description="Reset your LinkNest account password securely and regain access to your professional profile and links."
        path="/reset-password"
        noIndex
      />

      <main className="min-h-screen bg-background flex" aria-label="Reset your password">
        {/* ── Left panel: form ── */}
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
                Reset Password
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reset your password using the form below so you can log back into Linknest
              </p>
            </div>

            {/* Reset Password Form */}
            <ResetPasswordForm />
          </div>
        </div>

        {/* Right panel ── */}
        <aside className="hidden lg:flex flex-1 flex-col items-center justify-center bg-accent/30 px-14 py-12 overflow-hidden">
          <div className="w-full max-w-md">
            <img
              src={ResetPasswordIllustration}
              alt="Person recovering his pasword account in Linknest platform"
              className="w-full h-auto drop-shadow-md"
              draggable="false"
            />
          </div>

          <div className="text-center flex flex-col gap-3 max-w-md">
            <h2 className="font-heading text-2xl font-bold text-foreground leading-snug text-balance">
              Your Password in Your Hands
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Linknest, we want to make sure you don't lose access to your account
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
    </>
  );
};

export default ResetPassword;
