//* React
import { useEffect, useRef, useState } from "react";

//* Firebase
import { auth, googleProvider } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithPopup,
  type AuthProvider,
} from "firebase/auth";
import { useCollection } from "@/firebase/hooks/useCollection";

// * Types & utils
import type { UserDoc, UserRegister } from "../types/user.type";
import { createBaseNewUser, getAuthErrorMessage, getUserId } from "../utils/firebase.helper";
import { useImageKit } from "@/features/profile/hooks/useImageKit";

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Refs
  const isCreatingUserDoc = useRef(false);

  //* Custom hooks
  const { setById, suscribeById, find, update } = useCollection<UserDoc>("users");
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
    const { email, password, username } = user;

    // Validate if the username is unique
    const foundDocument = await find([["username", "==", username]]);
    if (foundDocument) return "That username is already in use";

    // Proceed with the register in Firebase Auth
    isCreatingUserDoc.current = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setById(userCredential.user.uid, createBaseNewUser(user));
      return null;
    } catch (err) {
      return getAuthErrorMessage(err);
    } finally {
      isCreatingUserDoc.current = false;
    }
  };

  const authWithProvider = async (provider: AuthProvider) => {
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

      return null;
    } catch (error) {
      return getAuthErrorMessage(error);
    } finally {
      isCreatingUserDoc.current = false;
    }
  };

  const updateUserProfile = async (updatedFields: Partial<UserDoc>): Promise<string | null> => {
    try {
      const userId = getUserId();
      if (!userId) return "The user ID could not be retrieved";

      await update(userId, updatedFields);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ...updatedFields,
            }
          : prev,
      );

      return null;
    } catch (error) {
      console.error(error);
      return "An error occurred while updating your profile";
    }
  };

  return {
    user,
    userLoading,
    registerWithEmailAndPassword,
    authWithGoogle: () => authWithProvider(googleProvider),
    updateUserProfile,
  };
}
