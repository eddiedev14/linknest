/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { validateAvatarImg } from '../utils/avatar.helper';
import { useImageKit } from './useImageKit';

export const useAvatarDialog = () => {
  //* Context
  const { user, isPending, updateUserProfile } = useAuth();

  //* States
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);
  const [avatarPreviewURL, setAvatarPreviewURL] = useState<string | null>(null);

  //* Custom hooks
  const { isUploading, isDeleting, uploadFile, deleteFile } = useImageKit();

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

  const removeAvatar = async () => {
    if (!user) return;

    try {
      // Delete the photo from ImageKit
      await deleteFile(user.avatar.fileId);

      const updatedUser = {
        ...user,
        avatar: { url: '', fileId: '' },
      };

      const error = await updateUserProfile(updatedUser);
      if (error) throw new Error(error);
      toast.success('Your avatar photo was deleted');
    } catch (error) {
      toast.error(`Error while deleting the photo: ${(error as Error).message}`);
    }
  };

  const handleAvatarSubmit = async (e: React.SubmitEvent<HTMLFormElement>, onSuccess?: () => void) => {
    e.preventDefault();
    if (!user || !avatarPhoto) {
      onSuccess?.();
      return;
    }

    try {
      const result = await uploadFile(avatarPhoto);
      if (!result.url || !result.fileId) throw new Error('Error retrieving the avatar URL');

      const updatedUser = {
        ...user,
        avatar: { url: `${result.url}?v=${Date.now()}`, fileId: result.fileId },
      };

      const error = await updateUserProfile(updatedUser);
      if (error) throw new Error(error);
      toast.success('Your avatar photo was updated');
      onSuccess?.();
    } catch (error) {
      toast.error(`Error while uploading the photo: ${(error as Error).message}`);
    }
  };

  return {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    isDeleting,
    isPending,
    handleFileClick,
    handleFileChange,
    removeAvatar,
    handleAvatarSubmit,
  };
};
