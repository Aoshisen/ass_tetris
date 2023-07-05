import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import path from "path";
const filePath = path.dirname(new URL("", import.meta.url).pathname);

const css_prefix = "Ass";

export default defineConfig({
  root: "./",
  build: {
    outDir: path.join(__dirname, "dist"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@components": path.resolve("./src/components"),
      "@unit": path.resolve("./src/unit"),
    },
  },
  css: {
    modules: {
      generateScopedName: `${css_prefix}_[local]_[hash:5]`,
    },
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${filePath}/src/assets/styles/mixin.scss";`,
      },
    },
  },
});
