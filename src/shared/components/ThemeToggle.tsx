import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "./shadcn/button";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button size="icon" variant="ghost" className="text-foreground" onClick={toggleTheme}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </Button>
  );
}
