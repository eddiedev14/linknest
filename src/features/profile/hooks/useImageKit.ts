import { useState } from "react";
import { upload } from "@imagekit/react";
import { getUserId } from "@/firebase/utils/firebase.helper";
import { getAuth, uploadFromProvider, deleteImageKitFile } from "../actions/imageKit.actions";
import type { Avatar } from "@/features/auth/types/avatar.type";

export const useImageKit = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to upload a local profile photo
  const uploadFile = async (file: File): Promise<Avatar | null> => {
    setIsUploading(true);

    try {
      const auth = await getAuth();

      const result = await upload({
        file,
        fileName: `${getUserId()}.jpg`,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey,
        folder: "/avatars",
        overwriteFile: true,
        useUniqueFileName: false,
      });

      setIsUploading(false);

      return {
        url: result.url || "",
        fileId: result.fileId || "",
      };
    } catch {
      setIsUploading(false);
      return null;
    }
  };

  // Function to upload Google avatar
  const uploadProviderAvatar = async (photoURL: string): Promise<Avatar | null> => {
    setIsUploading(true);

    try {
      const avatar = await uploadFromProvider(photoURL);
      setIsUploading(false);
      return avatar;
    } catch {
      setIsUploading(false);
      return null;
    }
  };

  // Function to delete an image
  const deleteFile = async (fileId: string) => {
    setIsDeleting(true);

    try {
      deleteImageKitFile(fileId);
      setIsDeleting(false);
    } catch {
      setIsDeleting(false);
      return "Something went wrong. Please try again.";
    }
  };

  return {
    isUploading,
    isDeleting,
    uploadFile,
    uploadProviderAvatar,
    deleteFile,
  };
};
