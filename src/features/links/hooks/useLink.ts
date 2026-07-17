import { use } from "react";
import { LinkContext } from "../context/LinkContext";

export const useLink = () => {
  const context = use(LinkContext);

  if (!context) {
    throw new Error("useLink must be used inside AuthProvider");
  }

  return context;
};
