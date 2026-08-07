import { Outlet, useMatch } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { ShareButton } from "./user/ShareButton";
import { getPublicURL } from "@/shared/utils/publicURL.helper";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PageLayout = () => {
  const { user } = useAuth();
  const publicURL = getPublicURL(user?.username);
  const isPublicProfile = useMatch("/u/:username") || useMatch("/404"); // Don't show the share button if is an user profile or error page.

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      <AppNavbar />
      <Outlet />
      {!isPublicProfile && user?.username && <ShareButton url={publicURL} />}
    </div>
  );
};
