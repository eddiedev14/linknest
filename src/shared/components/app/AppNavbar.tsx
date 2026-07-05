import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/app.data";
import { Button } from "../shadcn/button";
import { ConfirmDialog } from "../forms/ConfirmDialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Logo from "@/assets/logo.png";
import { IoMdClose, IoMdMenu } from "react-icons/io";

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    const error = await logout();
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Session closed successfully");
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={Logo} alt="Linknest Logo" className="size-8" />
            <span className="font-heading text-lg font-bold tracking-tight">
              Link <span className="text-primary">Nest</span>
            </span>
          </a>

          {/* Desktop */}
          <nav className="hidden items-center gap-4 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Button type="button" onClick={() => setConfirmOpen(true)} variant="destructive">
              Cerrar Sesión
            </Button>
          </nav>

          {/* Mobile button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose className="size-5" /> : <IoMdMenu className="size-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="absolute left-0 top-14 z-50 w-full border-t border-border bg-background shadow-lg md:hidden">
            <div className="flex flex-col gap-2 p-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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
                type="button"
                onClick={() => setConfirmOpen(true)}
                variant="destructive"
                className="mt-2 w-full"
              >
                Cerrar Sesión
              </Button>
            </div>
          </nav>
        )}
      </header>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Log Out?"
        text="If you continue, your Linknest account will be closed and you will need to log in again."
        actionText="Cerrar Sesión"
        onConfirm={handleLogout}
      />
    </>
  );
};
