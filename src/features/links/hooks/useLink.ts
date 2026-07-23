import { use } from "react";
import { MyLinksContext } from "../context/MyLinksContext";

export const useMyLinks = () => {
  const context = use(MyLinksContext);

  if (!context) {
    throw new Error("useMyLinks must be used inside AuthProvider");
  }

  return context;
};
