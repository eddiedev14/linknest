import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { ShareButton } from "./user/ShareButton";
import { getPublicURL } from "@/shared/utils/publicURL.helper";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PageLayout = () => {
  const { user } = useAuth();
  const publicURL = getPublicURL(user?.username);

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      <AppNavbar />
      <Outlet />
      {user?.username && <ShareButton url={publicURL} />}
    </div>
  );
};
