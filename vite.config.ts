import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Default config: Cloudflare adapter ON for Lovable deployment.
// Vercel uses vite.config.vercel.ts via the buildCommand in vercel.json,
// so this file is dedicated to the Lovable (Cloudflare Worker) build.
export default defineConfig({});
