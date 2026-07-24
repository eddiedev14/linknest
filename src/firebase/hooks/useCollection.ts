import { useCallback, useState } from "react";
import { db } from "../config";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import type { DocumentData, Query, QueryConstraint, Unsubscribe } from "firebase/firestore";
import type { FirestoreDoc } from "../types/firestore.types";

//? Se tipa el hook con un genérico para tipado de typescript.
export const useCollection = <T>(table: string) => {
  const [results, setResults] = useState<FirestoreDoc<T>[]>([]);
  const [isPending, setIsPending] = useState(false);

  const buildQuery = useCallback(
    (constraints: QueryConstraint[] = []): Query => {
      return query(collection(db, table), ...constraints);
    },
    [table],
  );

  //* 1. R -> READ
  const suscribe = useCallback(
    (constraints: QueryConstraint[] = []): Unsubscribe => {
      setIsPending(true);

      try {
        // Se hace una busqueda sobre la colección indicada
        const q = buildQuery(constraints);

        // Firebase responde con un “paquete” de documentos
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const docs: FirestoreDoc<T>[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as T),
            }));

            setResults(docs);
            setIsPending(false);
          },
          () => {
            setIsPending(false);
          },
        );

        return unsubscribe;
      } catch {
        setIsPending(false);
        return () => {};
      }
    },
    [buildQuery],
  );

  //* 1. R -> READ by id (real-time)
  const suscribeById = useCallback(
    (id: string, callback: (doc: FirestoreDoc<T> | null) => void): Unsubscribe => {
      setIsPending(true);

      const unsubscribe = onSnapshot(
        doc(db, table, id),
        (snapshot) => {
          if (snapshot.exists()) {
            callback({ id: snapshot.id, ...(snapshot.data() as T) });
          } else {
            callback(null);
          }

          setIsPending(false);
        },
        () => {
          setIsPending(false);
        },
      );

      return unsubscribe;
    },
    [table],
  );

  //* 1. R -> READ
  const getById = useCallback(
    async (id: string): Promise<FirestoreDoc<T> | null> => {
      setIsPending(true);

      try {
        const docRef = doc(db, table, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const result: FirestoreDoc<T> = {
            id: docSnap.id,
            ...(docSnap.data() as T),
          };

          setIsPending(false);
          return result;
        } else {
          setIsPending(false);
          return null;
        }
      } catch {
        setIsPending(false);
        return null;
      }
    },
    [table],
  );

  //* 1. R -> READ
  const find = useCallback(
    async (constraints: QueryConstraint[] = []): Promise<FirestoreDoc<T> | null> => {
      setIsPending(true);

      try {
        const q = buildQuery(constraints);

        const snapshot = await getDocs(q);
        setIsPending(false);

        if (snapshot.empty) {
          return null;
        }

        return {
          id: snapshot.docs[0].id,
          ...(snapshot.docs[0].data() as T),
        };
      } catch {
        setIsPending(false);
        return null;
      }
    },
    [buildQuery],
  );

  //* 2. C -> CREATE
  const add = useCallback(
    async (data: T): Promise<string | null> => {
      try {
        // Añadir el documento al firestore
        const ref = await addDoc(collection(db, table), {
          ...data,
          createdAt: serverTimestamp(),
        } as DocumentData);

        return ref.id; // Retornar el id del documento creado
      } catch {
        return null;
      }
    },
    [table],
  );

  //* 2. C -> CREATE
  const setById = useCallback(
    async (id: string, data: T): Promise<boolean> => {
      try {
        const docRef = doc(db, table, id);

        await setDoc(docRef, {
          ...data,
          createdAt: serverTimestamp(),
        });

        return true;
      } catch {
        return false;
      }
    },
    [table],
  );

  //* 3. U -> UPDATE
  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      try {
        await updateDoc(doc(db, table, id), {
          ...data,
          updatedAt: serverTimestamp(),
        });

        return true;
      } catch {
        return false;
      }
    },
    [table],
  );

  //* 3. U -> UPDATE
  const updateMany = useCallback(
    async (updates: { id: string; data: Partial<T> }[]): Promise<boolean> => {
      try {
        // Agrupa todas las actualizaciones en una sola operación atómica.
        const batch = writeBatch(db);

        updates.forEach(({ id, data }) => {
          batch.update(doc(db, table, id), {
            ...data,
            updatedAt: serverTimestamp(),
          });
        });

        await batch.commit();
        return true;
      } catch {
        return false;
      }
    },
    [table],
  );

  //* 4. D -> DELETE
  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteDoc(doc(db, table, id));
        return true;
      } catch {
        return false;
      }
    },
    [table],
  );

  return {
    results,
    isPending,
    suscribe,
    suscribeById,
    getById,
    find,
    add,
    setById,
    update,
    updateMany,
    remove,
  };
};
