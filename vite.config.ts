import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (command === "serve") {
    return {
      base: env.VITE_BASE_URL,
      plugins: [react(), tailwindcss(), tsconfigPaths()],
    };
  }

  return {
    base: env.VITE_BASE_URL,
    plugins: [react(), tailwindcss(), tsconfigPaths()],
  };
});
