import { useState, useRef, useEffect, type SubmitEvent } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { validateAvatarImg } from '../utils/avatar.helper';
import { useImageKitUpload } from './useImageKitUpload';

export const useAvatarDialog = () => {
  //* Context
  const { user, isPending, updateUserProfile } = useAuth();

  //* States
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);
  const [avatarPreviewURL, setAvatarPreviewURL] = useState<string | null>(null);

  //* Custom hooks
  const { isUploading, uploadFile } = useImageKitUpload();

  //* Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  //* Effects
  useEffect(() => {
    if (!avatarPhoto) {
      setAvatarPreviewURL(null);
      return;
    }

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
    if (!user || !avatarPhoto) return;

    try {
      const result = await uploadFile(avatarPhoto);
      if (!result.url) throw new Error('Error retrieving the avatar URL');

      const updatedUser = {
        ...user,
        avatarUrl: `${result.url}?v=${Date.now()}`,
      };

      const error = await updateUserProfile(updatedUser);
      if (error) throw new Error(error);
      toast.success('Your avatar photo was updated');
    } catch (error) {
      toast.error(`Error while uploading the photo: ${(error as Error).message}`);
    }
  };

  return {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    isPending,
    handleFileClick,
    handleFileChange,
    handleAvatarSubmit,
  };
};
