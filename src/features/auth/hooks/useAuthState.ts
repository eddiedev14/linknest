//* React
import { useEffect, useState } from "react";

//* Firebase
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useCollection } from "@/firebase/hooks/useCollection";

// * Types & utils
import type { UserDoc, User } from "../types/user.type";
import {
  getAuthErrorMessage,
  getUserId,
  getUserWithoutPassword,
} from "../utils/firebase.helper";

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Custom hooks
  const { setById, getById, update, isPending } =
    useCollection<UserDoc>("users");

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
  const registerWithEmailAndPassword = async (
    user: User,
  ): Promise<string | null> => {
    const { email, password } = user;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Ahora se guarda en la colección "users", el usuario con esa misma id (para referencias) con los datos propios
      await setById(userCredential.user.uid, getUserWithoutPassword(user));
      return null;
    } catch (err) {
      return getAuthErrorMessage(err);
    }
  };

  const updateUserProfile = async (
    updatedUser: UserDoc,
  ): Promise<string | null> => {
    try {
      const userId = getUserId();
      if (!userId) return "The user ID could not be retrieved";

      await update(userId, updatedUser);
      setUser(updatedUser);
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
