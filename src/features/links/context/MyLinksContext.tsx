/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useMyLinksState } from "../hooks/useMyLinksState";

interface IProvider {
  children: ReactNode;
}

//* Crear context
export const MyLinksContext = createContext<null | ReturnType<typeof useMyLinksState>>(null);

//* Provider
export const MyLinksContextProvider = ({ children }: IProvider) => {
  //? Llamar al custom hook
  const contextData = useMyLinksState();
  return <MyLinksContext.Provider value={contextData}>{children}</MyLinksContext.Provider>;
};
