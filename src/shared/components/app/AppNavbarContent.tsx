import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "../shadcn/button";
import { NAV_ITEMS } from "@/shared/data/app.data";

interface Props {
  mobile?: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const AppNavbarContent = ({ mobile = false, isAuthenticated, onLogout }: Props) => {
  if (!isAuthenticated) {
    return (
      <Button asChild className={mobile ? "w-full" : undefined}>
        <NavLink to="/signup">Create your public page</NavLink>
      </Button>
    );
  }

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              mobile
                ? "rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                : "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}

      <Button
        variant="destructive"
        className={mobile ? "mt-2 w-full" : undefined}
        onClick={onLogout}
      >
        Log out
      </Button>
    </>
  );
};
