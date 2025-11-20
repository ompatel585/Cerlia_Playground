// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss(),
//     { nocompatible: true }
//   ]
// })



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: ".",              // ensure Vercel understands root
  base: "/",              // required for Vercel, avoids 404
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",       // Vercel expects dist folder
    emptyOutDir: true
  },
  publicDir: "public"     // required so Vercel copies assets
});
