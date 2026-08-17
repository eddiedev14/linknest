/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useThemeState } from "../hooks/useThemeState";

interface IProvider {
  children: ReactNode;
}

//* Crear context
export const ThemeContext = createContext<null | ReturnType<typeof useThemeState>>(null);

//* Provider
export const ThemeContextProvider = ({ children }: IProvider) => {
  const contextData = useThemeState();
  return <ThemeContext.Provider value={contextData}>{children}</ThemeContext.Provider>;
};
