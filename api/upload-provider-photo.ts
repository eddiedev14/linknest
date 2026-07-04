import type { VercelRequest, VercelResponse } from "@vercel/node";
import { auth } from "./firebaseAdmin";
import ImageKit from "imagekit";

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  throw new Error("Missing ImageKit environment variables");
}

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    // 1. Verificar Firebase
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedUser = await auth.verifyIdToken(idToken);

    if (!decodedUser.uid) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // 2. Obtener la URL de Google
    const { photoURL } = req.body;

    if (!photoURL) {
      return res.status(400).json({
        message: "photoURL is required",
      });
    }

    // 3. Subir a ImageKit
    const result = await imagekit.upload({
      file: photoURL,
      fileName: `${decodedUser.uid}.jpg`,
      folder: "/avatars",
      useUniqueFileName: false,
      overwriteFile: true,
    });

    return res.status(200).json({
      url: result.url,
      fileId: result.fileId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Upload failed",
    });
  }
}
