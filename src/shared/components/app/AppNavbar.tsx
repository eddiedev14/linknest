import { IoMdClose, IoMdMenu } from "react-icons/io";
import Logo from "@/assets/logo.png";
import { Button } from "../shadcn/button";
import { ConfirmDialog } from "../forms/ConfirmDialog";
import { AppNavbarContent } from "./AppNavbarContent";
import { useAppNavbar } from "@/shared/hooks/useAppNavbar";
import { SearchBar } from "../SearchBar";

export const AppNavbar = () => {
  const { isOpen, confirmOpen, isAuthenticated, setIsOpen, setConfirmOpen, handleLogout } =
    useAppNavbar();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={Logo} alt="Linknest Logo" className="size-8" />
            <span className="font-heading text-lg font-bold tracking-tight">
              Link <span className="text-primary">Nest</span>
            </span>
          </a>

          {/* Search bar */}
          <SearchBar />

          <div className="hidden items-center gap-4 md:flex">
            <AppNavbarContent
              isAuthenticated={isAuthenticated}
              onLogout={() => setConfirmOpen(true)}
            />
          </div>

          {/* Mobile button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose className="size-5" /> : <IoMdMenu className="size-5" />}
          </Button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="absolute left-0 top-14 z-50 w-full border-t border-border bg-background shadow-lg md:hidden">
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
