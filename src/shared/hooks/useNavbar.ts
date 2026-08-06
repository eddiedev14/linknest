import { useState } from "react";

export const useNavbar = () => {
  //* States
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((prev) => !prev);
  };

  return {
    menuOpen,
    searchOpen,
    toggleMenu,
    toggleSearch,
    closeMenu: () => setMenuOpen(false),
  };
};
