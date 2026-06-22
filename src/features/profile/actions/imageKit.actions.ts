import { getFirebaseToken } from "@/features/auth/utils/firebase.helper";
import type { AuthResponse } from "../types/imageKit.response.type";

// ? Function to request the image's authentication parameters from the backend
const getAuth = async (): Promise<AuthResponse> => {
  const idToken = await getFirebaseToken();
  if (!idToken) throw new Error("The Firebase token could not be obtained");

  const res = await fetch("/api/imagekit-auth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unable to obtain ImageKit authentication");
  }

  return res.json();
};

const deleteImageKitFile = async (idToken: string, fileId: string) => {
  const res = await fetch("/api/imagekit-file", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ fileId }),
  });

  if (!res.ok) {
    throw new Error("Unable to delete ImageKit file");
  }
};

export { getAuth, deleteImageKitFile };
