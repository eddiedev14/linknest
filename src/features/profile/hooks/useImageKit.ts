import { useState } from "react";
import { upload } from "@imagekit/react";
import { getFirebaseToken, getUserId } from "@/features/auth/utils/firebase.helper";
import { deleteImageKitFile, getAuth } from "../actions/imageKit.actions";
import type { Avatar } from "@/features/auth/types/avatar.type";

export const useImageKit = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to upload a local profile photo
  const uploadFile = async (file: File): Promise<Avatar> => {
    setIsUploading(true);

    try {
      // Get credentials from backend
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

      return {
        url: result.url || "",
        fileId: result.fileId || "",
      };
    } finally {
      setIsUploading(false);
    }
  };

  // Function to upload Google avatar
  const uploadProviderAvatar = async (photoURL: string): Promise<Avatar> => {
    setIsUploading(true);
    let avatar: Avatar;

    try {
      const idToken = await getFirebaseToken();
      if (!idToken) {
        throw new Error("The Firebase token could not be obtained");
      }

      const response = await fetch("/api/upload-provider-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          photoURL,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload Google avatar");
      }

      avatar = await response.json();
    } catch (error) {
      setIsUploading(false);
      throw error;
    }

    setIsUploading(false);
    return avatar;
  };

  // Function to delete an image
  const deleteFile = async (fileId: string) => {
    setIsDeleting(true);

    try {
      const idToken = await getFirebaseToken();
      if (!idToken) {
        throw new Error("The Firebase token could not be obtained");
      }

      deleteImageKitFile(idToken, fileId);
    } finally {
      setIsDeleting(false);
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
