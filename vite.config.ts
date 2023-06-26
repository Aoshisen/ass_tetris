import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";
export default defineConfig({
  root: path.join(__dirname, "src"),
  resolve: {},
  build: {
    outDir: "dist",
  },
  plugins: [react],
});
