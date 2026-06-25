import { auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import type { User } from "../types/user.type";

// Función para obtener el mensaje de error de firebase a la hora de autenticarse
const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use";

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
        return "Authentication error";
    }
  }

  return "An unexpected error occurred";
};

// Función para obtener el User sin la password
const getUserWithoutPassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Función para crear un usuario base a partir del email, username y password
type CreateBaseUserParams = {
  email: string;
  username: string;
  password: string;
};

const createBaseNewUser = ({ email, username, password }: CreateBaseUserParams): User => {
  return {
    email,
    username,
    password,
    displayName: "",
    bio: "",
    professionalRole: "",
    professionalStatus: undefined,
    location: { country: "", city: "" },
    techStack: [],
    languages: [],
    avatar: { url: "", fileId: "" },
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

export {
  getAuthErrorMessage,
  getUserWithoutPassword,
  createBaseNewUser,
  getUserId,
  getFirebaseToken,
};
