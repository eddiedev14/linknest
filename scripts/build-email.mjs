import { build } from "esbuild";

await build({
  entryPoints: ["emails/PasswordResetEmail.tsx"],
  outfile: "emails/PasswordResetEmail.js",
  bundle: true,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  packages: "external",
});
