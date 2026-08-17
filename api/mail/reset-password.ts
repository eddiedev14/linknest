import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createElement } from "react";
import { render } from "react-email";
import { auth } from "../firebase/firebaseAdmin.js";
import { transporter } from "./mailer.js";
import PasswordResetEmail from "../../emails/PasswordResetEmail.js";

const { APP_URL, GMAIL_USER } = process.env;

if (!APP_URL || !GMAIL_USER) {
  throw new Error("Missing environment variables");
}

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
    // 2. Generate a valid link with firebase
    const firebaseLink = await auth.generatePasswordResetLink(email);
    const firebaseURL = new URL(firebaseLink);
    const oobCode = firebaseURL.searchParams.get("oobCode");

    if (!oobCode) {
      throw new Error("Could not generate password reset code");
    }

    // 3. Create our own reset password link
    const resetUrl = new URL("/reset-password", APP_URL);
    resetUrl.searchParams.set("oobCode", oobCode);

    // 3. Render React Email component to HTML
    const emailHtml = await render(
      createElement(PasswordResetEmail, {
        companyName: "LinkNest",
        url: resetUrl.href,
      }),
    );

    // 4. Send email with nodemailer
    await transporter.sendMail({
      from: `"LinkNest" <${GMAIL_USER}>`,
      to: email,
      subject: "Reset your password in Linknest",
      html: emailHtml,
    });

    return res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Could not send password reset email",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
