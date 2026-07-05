import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/shared/components/app/PageLoader";

export const PrivateRoute = () => {
  const { user, userLoading } = useAuth();
  if (userLoading) return <PageLoader />;
  return user ? <Outlet /> : <Navigate to="/login" />;
};
