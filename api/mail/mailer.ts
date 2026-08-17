import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error("Missing mail environment variables");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});
