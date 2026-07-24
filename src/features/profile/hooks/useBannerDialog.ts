import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { BannerStyle } from "@/features/auth/types";

export const useBannerDialog = () => {
  //* Context
  const { user, updateUserProfile } = useAuth();

  //* States
  const [selectedColor, setSelectedColor] = useState<BannerStyle>(
    user?.bannerStyle || "banner-primary",
  );
  const [isSaving, setIsSaving] = useState(false);

  //* Refs
  const colorInputRef = useRef<HTMLInputElement>(null);

  //* Effects
  useEffect(() => {
    const inputElement = colorInputRef.current;
    if (!inputElement) return;

    // El evento 'change' nativo SOLO se dispara al cerrar el selector,
    const handleNativeChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setSelectedColor(target.value as `#${string}`);
    };

    inputElement.addEventListener("change", handleNativeChange);

    // Limpieza del listener
    return () => {
      inputElement.removeEventListener("change", handleNativeChange);
    };
  }, []);

  //* Computed
  const isCustomColor = selectedColor.startsWith("#");

  //* Handlers
  const handleCustomColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleBannerColorSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
    onSuccess?: () => void,
  ) => {
    e.preventDefault();
    if (!user) {
      onSuccess?.();
      return;
    }

    const updatedUser = {
      ...user,
      bannerStyle: selectedColor || "banner-primary",
    };

    setIsSaving(true);

    try {
      const error = await updateUserProfile(updatedUser);

      if (error) {
        toast.error(error);
        setIsSaving(false);
        return;
      }

      toast.success("Your banner style was updated");
      onSuccess?.();
      setIsSaving(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSaving(false);
    }
  };

  return {
    selectedColor,
    colorInputRef,
    isCustomColor,
    isSaving,
    setSelectedColor,
    handleCustomColorClick,
    handleBannerColorSubmit,
  };
};
