import { useState } from "react";
import { upload } from "@imagekit/react";
import { getFirebaseToken, getUserId } from "@/firebase/utils/firebase.helper";
import { deleteImageKitFile, getAuth } from "../actions/imageKit.actions";
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
      const idToken = await getFirebaseToken();
      if (!idToken) {
        setIsUploading(false);
        return null;
      }

      const response = await fetch("/api/upload-provider-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ photoURL }),
      });

      if (!response.ok) {
        setIsUploading(false);
        return null;
      }

      const avatar = await response.json();
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
      const idToken = await getFirebaseToken();
      if (!idToken) {
        setIsDeleting(false);
        return "The Firebase token could not be obtained";
      }

      deleteImageKitFile(idToken, fileId);
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
