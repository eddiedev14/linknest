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
  const [avatarPreviewURL, setAvatarPreviewURL] = useState<string | null>(null);

  //* Custom hooks
  const { isUploading, isDeleting, uploadFile, deleteFile } = useImageKit();

  //* Refs & Variables
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewURLRef = useRef<string | null>(null);

  //* Effects — solo revoca al desmontar, sin setState
  useEffect(() => {
    return () => {
      if (previewURLRef.current) {
        URL.revokeObjectURL(previewURLRef.current);
      }
    };
  }, []);

  //* Handlers
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    const input = fileInputRef.current;

    // Siempre revoca la URL anterior antes de crear una nueva (o de limpiar)
    if (previewURLRef.current) {
      URL.revokeObjectURL(previewURLRef.current);
      previewURLRef.current = null;
    }

    if (!input || !input.files || input.files.length === 0) {
      setAvatarPhoto(null);
      setAvatarPreviewURL(null);
      return;
    }

    const file = input.files[0];
    const imgErrorValidation = validateAvatarImg(file);

    if (imgErrorValidation) {
      toast.error(imgErrorValidation);
      return;
    }

    const url = URL.createObjectURL(file);
    previewURLRef.current = url;

    setAvatarPhoto(file);
    setAvatarPreviewURL(url);
  };

  const removeAvatar = async () => {
    if (!user) return;

    try {
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

    const avatar = await uploadFile(avatarPhoto);

    if (!avatar || !avatar.url || !avatar.fileId) {
      toast.error("Error retrieving the avatar URL");
      return;
    }

    const updatedUser = {
      ...user,
      avatar: { url: `${avatar.url}?v=${Date.now()}`, fileId: avatar.fileId },
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
