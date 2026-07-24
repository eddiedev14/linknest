import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { validateAvatarImg } from "../utils/avatar.helper";
import { useImageKit } from "./useImageKit";

export const useAvatarForm = () => {
  //* Context
  const { user, updateUserProfile } = useAuth();

  //* States
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);

  //* Custom hooks
  const { isUploading, isDeleting, uploadFile, deleteFile } = useImageKit();

  //* Refs & Variables
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarPreviewURL = avatarPhoto ? URL.createObjectURL(avatarPhoto) : null;

  //* Effects
  useEffect(() => {
    if (!avatarPreviewURL) return;
    return () => URL.revokeObjectURL(avatarPreviewURL);
  }, [avatarPreviewURL]);

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
    const imgErrorValidation = validateAvatarImg(file);

    if (imgErrorValidation) {
      toast.error(imgErrorValidation);
      return;
    }

    setAvatarPhoto(file);
  };

  const removeAvatar = async () => {
    if (!user) return;

    try {
      // Delete the photo from ImageKit
      const imageKitError = await deleteFile(user.avatar.fileId);

      if (imageKitError) {
        toast.error("Error while removing your profile photo from our file system");
        return;
      }

      const updatedUser = {
        ...user,
        avatar: { url: "", fileId: "" },
      };

      const firestoreError = await updateUserProfile(updatedUser);

      if (firestoreError) {
        toast.error("Error while removing your profile photo from our database");
        return;
      }

      toast.success("Your avatar photo was deleted");
    } catch (error) {
      toast.error(`Error while deleting the photo: ${(error as Error).message}`);
    }
  };

  const handleAvatarSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
    onSuccess?: () => void,
  ) => {
    e.preventDefault();
    if (!user || !avatarPhoto) {
      onSuccess?.();
      return;
    }

    const { url, fileId } = await uploadFile(avatarPhoto);
    if (!url || !fileId) {
      toast.error("Error retrieving the avatar URL");
      return;
    }

    const updatedUser = {
      ...user,
      avatar: { url: `${url}?v=${Date.now()}`, fileId },
    };

    const error = await updateUserProfile(updatedUser);

    if (error) {
      toast.error(`Error while uploading the photo: ${error}`);
      return;
    }

    toast.success("Your avatar photo was updated");
    onSuccess?.();
  };

  return {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    isDeleting,
    handleFileClick,
    handleFileChange,
    removeAvatar,
    handleAvatarSubmit,
  };
};
