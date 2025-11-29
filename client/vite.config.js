import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ⭐ BẮT BUỘC để Electron load asset đúng qua file://
});
