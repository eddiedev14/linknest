import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export const useAuthProviders = () => {
  const { authWithGoogle, authWithGithub } = useAuth();

  const handleGoogleAuth = async () => {
    const errorMessage = await authWithGoogle();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("¡Google sign-in complete!");
  };

  const handleGithubAuth = async () => {
    const errorMessage = await authWithGithub();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("Github sign-in complete!");
  };

  return {
    handleGoogleAuth,
    handleGithubAuth,
  };
};
