import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export const useAuthProviders = () => {
  const { authWithGoogle } = useAuth();

  const handleGoogleAuth = async () => {
    const errorMessage = await authWithGoogle();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("¡Google sign-in complete!");
  };

  return {
    handleGoogleAuth,
  };
};
