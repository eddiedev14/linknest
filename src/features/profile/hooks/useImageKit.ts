import { useState } from "react";
import { upload } from "@imagekit/react";
import { getFirebaseToken, getUserId } from "@/features/auth/utils/firebase.helper";
import { deleteImageKitFile, getAuth } from "../actions/imageKit.actions";

export const useImageKit = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to upload profile photo
  const uploadFile = async (file: File) => {
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

      return result;
    } finally {
      setIsUploading(false);
    }
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
    deleteFile,
  };
};
