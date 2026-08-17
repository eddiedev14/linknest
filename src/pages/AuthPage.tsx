import { Navigate } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { Loader } from "@/shared/components/app/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthLeftPanel } from "@/features/auth/components/AuthLeftPanel";
import { AuthRightPanel } from "@/features/auth/components/AuthRightPanel";

interface Props {
  isSignup?: boolean;
}

const AuthPage = ({ isSignup = false }: Props) => {
  const { user, userLoading } = useAuth();
  if (userLoading) return <Loader />;
  if (user) return <Navigate to="/profile" replace />;

  return (
    <>
      <SEO
        title={isSignup ? "Create your account" : "Log in"}
        description={
          isSignup
            ? "Sign up for LinkNest and create a professional link-in-bio page to share your links, showcase your profile, and build your online presence."
            : "Log in to LinkNest to manage your professional links, customize your profile, and track your link performance."
        }
        path={isSignup ? "/signup" : "/login"}
        noIndex
      />

      <main
        className="min-h-screen bg-background flex"
        aria-label={isSignup ? "Create your account" : "Sign in to LinkNest"}
      >
        <AuthLeftPanel isSignup={isSignup} />
        <AuthRightPanel isSignup={isSignup} />
      </main>
    </>
  );
};

export default AuthPage;
