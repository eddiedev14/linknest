import { linknestApi } from "@/shared/api/linknest.api";
import { getFirebaseToken } from "@/firebase/utils/firebase.helper";
import type { AuthResponse } from "../types/imageKit.response.type";
import type { Avatar } from "@/features/auth/types";

// ? Function to request the image's authentication parameters from the backend
const getAuth = async (): Promise<AuthResponse> => {
  const idToken = await getFirebaseToken();
  if (!idToken) throw new Error("The Firebase token could not be obtained");

  const response = await linknestApi.get("/imagekit-auth", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
};

const uploadFromProvider = async (photoURL: string) => {
  const idToken = await getFirebaseToken();
  if (!idToken) {
    throw new Error("The Firebase token could not be obtained");
  }

  const response = await linknestApi.post<Avatar>(
    "/upload-provider-photo",
    { photoURL },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  return response.data;
};

const deleteImageKitFile = async (fileId: string) => {
  const idToken = await getFirebaseToken();
  if (!idToken) {
    throw new Error("The Firebase token could not be obtained");
  }

  await linknestApi.delete("/remove-photo", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    data: {
      fileId,
    },
  });
};

export { getAuth, uploadFromProvider, deleteImageKitFile };
