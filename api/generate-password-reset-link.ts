import type { VercelRequest, VercelResponse } from "@vercel/node";
import { auth } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  // 1. Get the email and validate it.
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    // 2. Generate a valid link and return it
    const link = await auth.generatePasswordResetLink(email, {
      url: `${process.env.APP_URL}/login`,
    });

    return res.status(200).json({
      link,
    });
  } catch {
    return res.status(400).json({
      message: "Could not generate password reset link",
    });
  }
}
