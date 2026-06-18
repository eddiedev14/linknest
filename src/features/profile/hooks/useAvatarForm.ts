import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { validateAvatarImg } from '../utils/avatar.helper';

export const useAvatarDialog = () => {
  //* States
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);
  const [avatarPreviewURL, setAvatarPreviewURL] = useState<string | null>(null);

  //* Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  //* Effects
  useEffect(() => {
    if (!avatarPhoto) return;
    const url = URL.createObjectURL(avatarPhoto);
    setAvatarPreviewURL(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarPhoto]);

  //* Handlers
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    const input = fileInputRef.current;

    if (!input || !input.files || input.files.length === 0) {
      toast.error('No files were selected');
      setAvatarPhoto(null);
      return;
    }

    const file = input.files[0];

    try {
      // Validate the uploaded image file
      validateAvatarImg(file);
      setAvatarPhoto(file);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    handleFileClick,
    handleFileChange,
  };
};
