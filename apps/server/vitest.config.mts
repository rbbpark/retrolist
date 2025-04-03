import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/__tests__/**/*.ts"],
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
