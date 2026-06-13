import { Route, Routes } from "react-router";
import { AuthPage, Landing, Profile } from "@/pages";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/shared/components/app/PageLoader";

export const AppRouter = () => {
  // * Esperar a que se compruebe si hay una sesión activa en toda la app.
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<AuthPage isSignup />} />

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
