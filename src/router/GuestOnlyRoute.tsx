import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const GuestOnlyRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/links" /> : <Outlet />;
};
