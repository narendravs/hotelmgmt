import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
//import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(() => {
  return {
    //plugins: [react(), TanStackRouterVite()],
    plugins: [react(), tailwindcss()],
  };
});
