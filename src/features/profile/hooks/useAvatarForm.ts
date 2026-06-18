import { useState, useRef, useEffect, type SubmitEvent } from 'react';
import { toast } from 'react-toastify';
import { validateAvatarImg } from '../utils/avatar.helper';
import { useImageKitUpload } from './useImageKitUpload';

export const useAvatarDialog = () => {
  //* States
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);
  const [avatarPreviewURL, setAvatarPreviewURL] = useState<string | null>(null);

  //* Custom hooks
  const { isUploading, progress, uploadFile } = useImageKitUpload();

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
      setAvatarPhoto(null);
      return;
    }

    const file = input.files[0];

    try {
      validateAvatarImg(file);
      setAvatarPhoto(file);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleAvatarSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!avatarPhoto) return;

    try {
      const result = await uploadFile(avatarPhoto);
      console.log('Imagen subida:', result.url);
      alert('Upload exitoso!');
    } catch (error) {
      toast.error(`Error while uploading the photo: ${(error as Error).message}`);
    }
  };

  return {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    progress,
    handleFileClick,
    handleFileChange,
    handleAvatarSubmit,
  };
};
