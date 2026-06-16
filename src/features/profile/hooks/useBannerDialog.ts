import type { BANNER_PRESETS } from "@/data/profile.data";
import { useState, useRef, useEffect } from "react";

export const useBannerDialog = () => {
  //* States
  const [selectedColor, setSelectedColor] = useState<
    (typeof BANNER_PRESETS)[number] | `#${string}`
  >("banner-primary");

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

  return {
    selectedColor,
    colorInputRef,
    isCustomColor,
    setSelectedColor,
    handleCustomColorClick,
  };
};
