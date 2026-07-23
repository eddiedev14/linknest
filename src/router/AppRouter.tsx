import { Navigate, Route, Routes } from "react-router";
import { AuthPage, Landing, Links, NotFound, Profile, PublicPage } from "@/pages";
import { PrivateRoute } from "./PrivateRoute";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { MyLinksContextProvider } from "@/features/links/context/MyLinksContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/shared/components/app/PageLoader";
import { PageLayout } from "@/shared/components/app/PageLayout";

export const AppRouter = () => {
  // * Esperar a que se compruebe si hay una sesión activa en toda la app.
  const { userLoading } = useAuth();

  if (userLoading) {
    return <PageLoader />;
  }

  return (
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
      </Route>

      {/* Private Pages */}
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <MyLinksContextProvider>
              <PageLayout />
            </MyLinksContextProvider>
          }
        >
          <Route path="/links" element={<Links />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Errors Pages */}
      <Route element={<PageLayout />}>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};
