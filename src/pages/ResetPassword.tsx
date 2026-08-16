import { SEO } from "@/shared/components/SEO";
import { AuthLeftPanel } from "@/features/auth/components/AuthLeftPanel";
import { AuthRightPanel } from "@/features/auth/components/AuthRightPanel";

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
        <AuthLeftPanel isResetPassword />
        <AuthRightPanel isResetPassword />
      </main>
    </>
  );
};

export default ResetPassword;
