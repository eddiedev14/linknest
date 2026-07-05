import { Route, Routes } from "react-router";
import { AuthPage, Landing, Links, Profile } from "@/pages";
import { PrivateRoute } from "./PrivateRoute";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
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

      <Route element={<GuestOnlyRoute />}>
        <Route path="/signup" element={<AuthPage isSignup />} />
        <Route path="/login" element={<AuthPage />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        {/* Layout común para todas las rutas privadas */}
        <Route element={<PageLayout />}>
          <Route path="/links" element={<Links />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};
