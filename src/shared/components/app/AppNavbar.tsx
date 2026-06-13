import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/app.data";
import Logo from "@/assets/logo.png";

export const AppNavbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-background border-b border-border h-14 flex items-center px-6">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <img src={Logo} alt="Linknest Logo" className="size-8" />
          <span className="font-heading font-bold text-lg text-foreground tracking-tight">
            Link <span className="text-primary">Nest</span>
          </span>
        </a>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
