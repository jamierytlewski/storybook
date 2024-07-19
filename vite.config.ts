import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    macrosPlugin(),
    svgr(),
    dts({
      exclude: ["**/*.stories.{ts,tsx}", "**/*.test.tsx", "**/*.spec.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: [resolve(__dirname, "src/index.ts")],
      name: "genesis-storybook",
      formats: ["es", "umd"],
      fileName: (format) => {
        return format !== "es"
          ? `genesis-storybook.${format}.cjs`
          : `genesis-storybook.${format}.js`;
      },
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          taiwindcss: "taiwindcss",
        },
      },
    },
  },
});
