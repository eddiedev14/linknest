import { useState, useRef, useEffect, type SubmitEvent } from "react";
import type { BANNER_PRESETS } from "@/data/profile.data";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "react-toastify";

export const useBannerDialog = () => {
  //* Context
  const { user, isPending, updateUserProfile } = useAuth();

  //* States
  const [selectedColor, setSelectedColor] = useState<
    (typeof BANNER_PRESETS)[number] | `#${string}`
  >(user?.bannerStyle || "banner-primary");

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
  }, [isPending]);

  //* Computed
  const isCustomColor = selectedColor.startsWith("#");

  //* Handlers
  const handleCustomColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleBannerColorSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser = {
      ...user,
      bannerStyle: selectedColor || "banner-primary",
    };

    const error = await updateUserProfile(updatedUser);
    if (error) {
      toast.error(error);
    }

    toast.success("Your banner style was updated");
  };

  return {
    selectedColor,
    colorInputRef,
    isCustomColor,
    isPending,
    setSelectedColor,
    handleCustomColorClick,
    handleBannerColorSubmit,
  };
};
