import { useState, useRef } from "react";

export const useAvatarDialog = () => {
  //* States
  const [avatarPhoto] = useState<File | null>(null);

  //* Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  //* Handlers
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return {
    avatarPhoto,
    fileInputRef,
    handleFileClick,
  };
};
