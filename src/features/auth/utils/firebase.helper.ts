import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase/config";
import type { User } from "../types/user.type";
import type { Avatar } from "../types/avatar.type";

// Función para obtener el mensaje de error de firebase a la hora de autenticarse
const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use";

      case "auth/account-exists-with-different-credential":
        return "An account with this email already exists. Please sign in using your original sign-in method.";

      case "auth/invalid-email":
        return "Invalid email address";

      case "auth/weak-password":
        return "Password must be at least 6 characters long";

      case "auth/invalid-credential":
        return "Incorrect email or password. If you signed up with Google, use Google to sign in.";

      case "auth/popup-closed-by-user":
        return "The authentication window was closed";

      case "auth/network-request-failed":
        return "Connection error. Please check your internet connection";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later";

      default:
        return error.code;
    }
  }

  return "An unexpected error occurred";
};

// Función para crear un usuario base a partir del email, username y password
type CreateBaseUserParams = {
  email: string;
  username: string;
  displayName?: string;
  avatar?: Avatar | null;
};

const createBaseNewUser = ({
  email,
  username,
  displayName = "",
  avatar,
}: CreateBaseUserParams): User => {
  return {
    email,
    username,
    displayName,
    bio: "",
    professionalRole: "",
    professionalStatus: "",
    location: { country: "", city: "" },
    techStack: [],
    languages: [],
    avatar: {
      url: avatar?.url ? `${avatar?.url}?v=${Date.now()}` : "",
      fileId: avatar?.fileId || "",
    },
    bannerStyle: "bg-primary",
  };
};

// Función para obtener la id del usuario logueado
const getUserId = (): string | undefined => {
  return auth.currentUser?.uid;
};

// Función para obtener el firebaseToken del usuario logueado
const getFirebaseToken = async (): Promise<string | undefined> => {
  const tokenId = await auth.currentUser?.getIdToken();
  return tokenId;
};

export { getAuthErrorMessage, createBaseNewUser, getUserId, getFirebaseToken };
