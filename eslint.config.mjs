import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "db/**",
    "drizzle/**",
    "examples/**",
    "worker/**",
    "app/_sites-preview/**",
    "vite.config.ts",
    "drizzle.config.ts",
    ".npm-cache/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
