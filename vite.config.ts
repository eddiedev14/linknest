import { createLogger, defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  const logger = isDev ? createLogger() : undefined;

  if (logger) {
    const originalError = logger.error;
    logger.error = (msg, options) => {
      // Hide the index.html error when running 'vercel dev' due to the production settings in vercel.json
      if (msg.includes("Failed to parse source for import analysis")) {
        return;
      }

      originalError(msg, options);
    };
  }

  return {
    plugins: [
      babel({ presets: [reactCompilerPreset()] }),
      react(),
      tailwindcss(),
      visualizer({
        open: true,
        gzipSize: true,
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    ...(isDev && {
      server: {
        proxy: {
          // Connect bun run dev with vercel dev (Serverless functions)
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
          },
        },
      },
    }),

    ...(logger && {
      customLogger: logger,
    }),
  };
});
