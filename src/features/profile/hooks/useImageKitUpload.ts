import { useState } from 'react';
import { upload } from '@imagekit/react';
import { getFirebaseToken, getUserId } from '@/features/auth/utils/firebase.helper';

type AuthResponse = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

export const useImageKitUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  // Function to request the image's authentication parameters from the backend
  const getAuth = async (): Promise<AuthResponse> => {
    const idToken = await getFirebaseToken();
    if (!idToken) throw new Error('The Firebase token could not be obtained');

    const res = await fetch('/api/imagekit-auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Unable to obtain ImageKit authentication');
    }

    return res.json();
  };

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
        folder: '/avatars',
        overwriteFile: true,
        useUniqueFileName: false,
      });

      return result;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFile,
  };
};
