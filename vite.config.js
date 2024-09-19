import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    rollupOptions: {
      external: ["axios"], // Explicitly mark Axios as an external dependency
    },
  },
});
