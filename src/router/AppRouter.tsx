import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Landing from "@/pages/Landing";
import { PrivateRoute } from "./PrivateRoute";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { MyLinksContextProvider } from "@/features/links/context/MyLinksContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/shared/components/app/PageLoader";
import { PageLayout } from "@/shared/components/app/PageLayout";

// * Imports Dinámicos
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Profile = lazy(() => import("@/pages/Profile"));
const Links = lazy(() => import("@/pages/Links"));
const PublicPage = lazy(() => import("@/pages/PublicPage"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const AppRouter = () => {
  // * Esperar a que se compruebe si hay una sesión activa en toda la app.
  const { userLoading } = useAuth();

  if (userLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Pages with PageLayout */}
        <Route element={<PageLayout />}>
          <Route path="/u/:username" element={<PublicPage />} />
        </Route>

        {/* Auth Pages */}
        <Route element={<GuestOnlyRoute />}>
          <Route path="/signup" element={<AuthPage isSignup />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Private Pages */}
        <Route element={<PrivateRoute />}>
          <Route element={<PageLayout />}>
            <Route
              path="/links"
              element={
                <MyLinksContextProvider>
                  <Links />
                </MyLinksContextProvider>
              }
            />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Errors Pages */}
        <Route element={<PageLayout />}>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
