
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import electron from "vite-plugin-electron";

const path = require('path')

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      electron({
        // 指定electron 的入口
        entry: "electron/index.ts",
      }),
    ],
  };
});
