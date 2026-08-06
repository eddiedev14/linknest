import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import Logo from "@/assets/logo.png";
import { Button } from "../shadcn/button";
import { ConfirmDialog } from "../forms/ConfirmDialog";
import { SearchBar } from "../SearchBar";
import { ThemeToggle } from "../ThemeToggle";
import { AppNavbarContent } from "./AppNavbarContent";
import { useNavbar } from "@/shared/hooks/useNavbar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IoSearch, IoMenuSharp } from "react-icons/io5";

export const AppNavbar = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { menuOpen, searchOpen, toggleMenu, toggleSearch } = useNavbar();
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  //* Handlers
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
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={Logo} alt="Linknest Logo" className="size-8" />
            <span className="font-heading text-lg font-bold tracking-tight">
              Link <span className="text-primary">Nest</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <AppNavbarContent
              isAuthenticated={isAuthenticated}
              onLogout={() => setConfirmOpen(true)}
            />
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleSearch}
              className="rounded-lg transition-colors md:hidden"
              aria-label="Search"
            >
              {searchOpen ? <IoMdClose /> : <IoSearch />}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleMenu}
              className="rounded-lg transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IoMdClose /> : <IoMenuSharp />}
            </Button>
          </div>
        </nav>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4">
            <SearchBar autoFocus />
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="absolute left-0 top-14 z-50 w-full border-t border-border bg-background shadow-lg lg:hidden">
            <div className="flex flex-col gap-2 p-4">
              <AppNavbarContent
                mobile
                isAuthenticated={isAuthenticated}
                onLogout={() => setConfirmOpen(true)}
              />
            </div>
          </nav>
        )}
      </header>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Log Out?"
        text="If you continue, your Linknest account will be closed and you will need to log in again."
        actionText="Log out"
        onConfirm={handleLogout}
      />
    </>
  );
};
