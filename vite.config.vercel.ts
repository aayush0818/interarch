import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel-specific build: disable the Cloudflare adapter so the SSR
// bundle is portable Node code that api/index.mjs can import.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
});
