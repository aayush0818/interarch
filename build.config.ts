import { defineConfig } from "vite";
import { tanstackStartVitePlugin } from "@tanstack/react-start/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStartVitePlugin(),
    react(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: true,
  },
  build: {
    target: "node18",
    outDir: ".output",
  },
});
