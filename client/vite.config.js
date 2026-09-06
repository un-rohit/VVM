import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "icons-vendor": ["lucide-react"],
        },
      },
    },
    assetsInlineLimit: 8192,
    cssCodeSplit: true,
    cssMinify: true,
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    host: true,
  },
});
