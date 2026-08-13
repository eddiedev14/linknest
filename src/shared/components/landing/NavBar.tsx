import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenuSharp, IoSearch } from "react-icons/io5";
import Logo from "/logo.png";
import { Button } from "../shadcn/button";
import { navMenuItems } from "@/data/landing.data";
import { ThemeToggle } from "../ThemeToggle";
import { SearchBar } from "../SearchBar";
import { useNavbar } from "@/shared/hooks/useNavbar";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, searchOpen, toggleMenu, toggleSearch, closeMenu } = useNavbar();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={Logo} alt="" aria-hidden="true" className="h-8 w-8" />
          <span className="font-bold text-lg">Link Nest</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {!user && (
            <a
              href="/login"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Log in
            </a>
          )}

          <a
            href={user ? "/links" : "/signup"}
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            {user ? "Continue to LinkNest" : "Get started free"}
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={toggleSearch}
            className="rounded-lg transition-colors"
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
          >
            {searchOpen ? <IoMdClose aria-hidden="true" /> : <IoSearch aria-hidden="true" />}
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={toggleMenu}
            className="rounded-lg transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <IoMdClose aria-hidden="true" /> : <IoMenuSharp aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Search */}
      {searchOpen && (
        <div id="mobile-search" className="md:hidden border-t border-border bg-background px-6 py-4">
          <SearchBar autoFocus />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile menu"
          className="md:hidden bg-background border-t border-border px-6 pb-6 pt-4 flex flex-col gap-4 shadow-lg"
        >
          {navMenuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}

          <hr className="border-border" />

          {!user && (
            <a href="/login" className="text-sm font-medium text-muted-foreground">
              Log in
            </a>
          )}

          <a
            href={user ? "/links" : "/signup"}
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-center hover:bg-primary/90 transition-colors"
          >
            {user ? "Continue to LinkNest" : "Get started free"}
          </a>
        </nav>
      )}
    </header>
  );
}
