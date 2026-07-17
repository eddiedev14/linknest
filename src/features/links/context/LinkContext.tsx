/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useLinkState } from "../hooks/useLinkState";

interface IProvider {
  children: ReactNode;
}

//* Crear context
export const LinkContext = createContext<null | ReturnType<typeof useLinkState>>(null);

//* Provider
export const LinkContextProvider = ({ children }: IProvider) => {
  //? Llamar al custom hook
  const contextData = useLinkState();
  return <LinkContext.Provider value={contextData}>{children}</LinkContext.Provider>;
};
