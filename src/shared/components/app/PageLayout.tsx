import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";

export const PageLayout = () => {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      <AppNavbar />
      <Outlet />
    </div>
  );
};
