import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    setupFiles: "./tests/vitest.setup.ts",
  },
});
