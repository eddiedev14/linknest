import { use } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
