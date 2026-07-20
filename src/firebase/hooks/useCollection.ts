import { useState } from "react";
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
} from "firebase/firestore";
import type { DocumentData, Query, QueryConstraint, Unsubscribe } from "firebase/firestore";

//? Se tipa el hook con un genérico para tipado de typescript.
export const useCollection = <T>(table: string) => {
  // Tipo base de documento
  type Doc<T> = {
    id: string;
  } & T;

  const [results, setResults] = useState<Doc<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildQuery = (constraints: QueryConstraint[] = []): Query => {
    return query(collection(db, table), ...constraints);
  };

  //* 1. R -> READ
  const suscribe = (constraints: QueryConstraint[] = []): Unsubscribe => {
    // Cargando y no hay errores
    setIsPending(true);
    setError(null);

    try {
      // Se hace una busqueda sobre la colección indicada
      let q = buildQuery(constraints);

      // Firebase responde con un “paquete” de documentos
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs: Doc<T>[] = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as T),
          }));

          setResults(docs);
          setIsPending(false);
        },
        () => {
          setError(`Error al suscribirse a ${table}`);
          setIsPending(false);
        },
      );

      return unsubscribe;
    } catch {
      setError(`Error al consultar los registros solicitados de la colección ${table}`);
      setIsPending(false);
      return () => {};
    }
  };

  //* 1. R -> READ by id (real-time)
  const suscribeById = (id: string, callback: (doc: Doc<T> | null) => void): Unsubscribe => {
    setIsPending(true);
    setError(null);

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
        setError(`Error al suscribirse al documento ${table}/${id}`);
        setIsPending(false);
      },
    );

    return unsubscribe;
  };

  //* 1. R -> READ
  const getById = async (id: string): Promise<Doc<T> | null> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result: Doc<T> = {
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
      setError(`Error al obtener el registro solcitado de la colección ${table}`);
      return null;
    }
  };

  //* 1. R -> READ
  const find = async (constraints: QueryConstraint[] = []): Promise<Doc<T> | null> => {
    setIsPending(true);
    setError(null);

    try {
      let q = buildQuery(constraints);

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
      setError(`Error al consultar el registro solicitado de la colección ${table}`);
      return null;
    }
  };

  //* 2. C -> CREATE
  const add = async (data: T): Promise<string | null> => {
    setIsPending(true);
    setError(null);

    try {
      // Añadir el documento al firestore
      const ref = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp(),
      } as DocumentData);

      setIsPending(false);
      return ref.id; // Retornar el id del documento creado
    } catch {
      setIsPending(false);
      setError(`Error al agregar un nuevo registro en la colección ${table}`);
      return null;
    }
  };

  //* 2. C -> CREATE
  const setById = async (id: string, data: T): Promise<boolean> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);

      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setError(`Error al crear el documento en ${table} con id ${id}`);
      setIsPending(false);
      return false;
    }
  };

  //* 3. U -> UPDATE
  const update = async (id: string, data: DocumentData) => {
    setIsPending(true);
    setError(null);

    try {
      // Busca el documento con ese id y lo actualiza
      // con doc(db, table, id), se obtiene un documento específico de esa colección por su id
      // updateDoc, recibe el documento a reemplazar y el nuevo documento
      await updateDoc(doc(db, table, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setIsPending(false);
      setError(`Error al actualizar el registro solicitado de la colección ${table}`);
      return false;
    }
  };

  //* 4. D -> DELETE
  const remove = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;
    } catch {
      setError(`Error al eliminar el registro solicitado de la colección ${table}`);
      setIsPending(false);
      return false;
    }
  };

  return {
    results,
    isPending,
    error,
    suscribe,
    suscribeById,
    getById,
    find,
    add,
    setById,
    update,
    remove,
  };
};
