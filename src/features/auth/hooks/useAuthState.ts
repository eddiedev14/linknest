//* React
import { useCallback, useEffect, useRef, useState } from "react";

//* Firebase
import { auth, githubProvider, googleProvider } from "@/firebase/config";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyPasswordResetCode,
  type AuthProvider,
} from "firebase/auth";
import { endAt, limit, orderBy, startAt, where } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";

// * Types & utils
import type { User, UserDoc, UserLogin, UserRegister } from "../types/user.type";
import {
  createBaseNewUser,
  getAuthErrorMessage,
  getUserId,
} from "@/firebase/utils/firebase.helper";
import { useImageKit } from "@/features/profile/hooks/useImageKit";
import { linknestApi } from "@/shared/api/linknest.api";
import axios from "axios";

const loginWithEmailAndPassword = async (credentials: UserLogin): Promise<string | null> => {
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return null;
  } catch (err) {
    return getAuthErrorMessage(err);
  }
};

const sendRecoveryPasswordEmail = async (email: string): Promise<string | null> => {
  try {
    await linknestApi.post("/reset-password", { email });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);

      return error.response?.data?.message ?? "Something went wrong.";
    }

    return "Something went wrong. Please try again.";
  }
};

const validatePasswordResetCode = async (oobCode: string) => {
  try {
    await verifyPasswordResetCode(auth, oobCode);
    return null;
  } catch (err) {
    return getAuthErrorMessage(err);
  }
};

const completePasswordReset = async (oobCode: string, newPassword: string) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return null;
  } catch (err) {
    return getAuthErrorMessage(err);
  }
};

const logout = async (): Promise<string | null> => {
  try {
    await signOut(auth);
    return null;
  } catch {
    return "Unable to log out. Please try again.";
  }
};

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Refs
  const isCreatingUserDoc = useRef(false);

  //* Custom hooks
  const { setById, suscribeById, find, getAll, update } = useCollection<User>("users");
  const { uploadProviderAvatar } = useImageKit();

  //* Effects
  useEffect(() => {
    let unsubscribeDoc = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // If there was a subscription to a previous document, we cancel it first
      unsubscribeDoc();

      if (!firebaseUser) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      setUserLoading(true);

      // Subscribe to changes in the document to update the state
      unsubscribeDoc = suscribeById(firebaseUser.uid, (userDoc) => {
        if (!userDoc && isCreatingUserDoc.current) return;
        setUser(userDoc);
        setUserLoading(false);
      });
    });

    return () => {
      unsubscribeDoc();
      unsubscribeAuth();
    };
  }, [suscribeById]);

  //* Functions
  const registerWithEmailAndPassword = async (user: UserRegister): Promise<string | null> => {
    let error: string | null = null;
    const { email, password, username } = user;

    // Validate if the username is unique
    const foundDocument = await find([where("username", "==", username)]);
    if (foundDocument) return "That username is already in use";

    // Proceed with the register in Firebase Auth
    isCreatingUserDoc.current = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setById(userCredential.user.uid, createBaseNewUser(user));
    } catch (err) {
      error = getAuthErrorMessage(err);
    }

    isCreatingUserDoc.current = false;
    return error;
  };

  const authWithProvider = async (provider: AuthProvider): Promise<string | null> => {
    let error: string | null = null;

    try {
      const result = await signInWithPopup(auth, provider);
      const userCredential = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser;

      if (isNewUser) {
        isCreatingUserDoc.current = true;
        const avatarResponse = userCredential.photoURL
          ? await uploadProviderAvatar(userCredential.photoURL)
          : null;
        const displayName = userCredential.displayName || "";

        await setById(
          userCredential.uid,
          createBaseNewUser({
            email: userCredential.email!,
            username: "",
            displayName,
            avatar: avatarResponse,
          }),
        );
      }
    } catch (err) {
      error = getAuthErrorMessage(err);
    }

    isCreatingUserDoc.current = false;
    return error;
  };

  const updateUserProfile = async (updatedFields: Partial<UserDoc>): Promise<string | null> => {
    const userId = getUserId();
    if (!userId) return "The user ID could not be retrieved";

    const success = await update(userId, updatedFields);
    if (!success) return "An error occurred while updating your profile";

    setUser((prev) =>
      prev
        ? {
            ...prev,
            ...updatedFields,
          }
        : prev,
    );

    return null;
  };

  const findUser = useCallback(
    async (username: string): Promise<UserDoc | null> => {
      return find([where("username", "==", username)]);
    },
    [find],
  );

  const filterUsersByUsername = useCallback(
    async (search: string): Promise<string[]> => {
      const users = await getAll([
        orderBy("username"),
        startAt(search),
        endAt(search + "\uf8ff"),
        limit(5),
      ]);

      return users.map((user) => user.username);
    },
    [getAll],
  );

  return {
    user,
    userLoading,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    authWithGoogle: () => authWithProvider(googleProvider),
    authWithGithub: () => authWithProvider(githubProvider),
    sendRecoveryPasswordEmail,
    validatePasswordResetCode,
    completePasswordReset,
    logout,
    updateUserProfile,
    findUser,
    filterUsersByUsername,
  };
}
