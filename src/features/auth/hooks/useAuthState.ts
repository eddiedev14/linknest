//* React
import { useEffect, useState } from "react";

//* Firebase
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useCollection } from "@/firebase/hooks/useCollection";

// * Types & utils
import type { UserDoc, User } from "../types/user.type";
import { getAuthErrorMessage, getUserId, getUserWithoutPassword } from "../utils/firebase.helper";

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Custom hooks
  const { setById, getById, find, update, isPending } = useCollection<UserDoc>("users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      const userDoc = await getById(firebaseUser.uid);
      setUser(userDoc);
      setUserLoading(false);
    });

    return unsubscribe;
  }, [getById]);

  //* Functions
  const registerWithEmailAndPassword = async (user: User): Promise<string | null> => {
    const { email, password, username } = user;

    // Validate if the username is unique
    const foundDocument = await find([["username", "==", username]]);
    if (foundDocument) return "That username is already in use";

    // Proceed with the register in Firebase Auth
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setById(userCredential.user.uid, getUserWithoutPassword(user));
      return null;
    } catch (err) {
      return getAuthErrorMessage(err);
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
    isPending,
    registerWithEmailAndPassword,
    updateUserProfile,
  };
}
