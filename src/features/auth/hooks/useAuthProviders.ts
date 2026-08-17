import { useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

type Provider = "google" | "github";

export const useAuthProviders = () => {
  const { authWithGoogle, authWithGithub } = useAuth();
  const PROVIDERS_MAP = useRef<Record<Provider, () => Promise<string | null>>>({
    google: authWithGoogle,
    github: authWithGithub,
  });

  const handleProviderAuth = async (provider: Provider) => {
    const capitalizedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);
    const errorMessage = await PROVIDERS_MAP.current[provider]();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success(`¡${capitalizedProvider} sign-in complete!`);
  };

  return {
    handleProviderAuth,
  };
};
