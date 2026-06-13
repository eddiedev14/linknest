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

export { getAuthErrorMessage, getUserWithoutPassword };
