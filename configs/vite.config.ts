import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

export default defineConfig({
  // 设置了根目录的话outDir 可以写成 "../dist"
  // 或者
  // outDir: path.join(__dirname, "dist"),
  root: path.join(__dirname),
  build: {
    outDir: path.join(__dirname, "dist"),
  },
  plugins: [react()],
});
