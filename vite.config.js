/**
 * @type {import('vite').UserConfig}
 */

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginTemplates from "./vite-plugin-templates.ts";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        fs: {
            // strict: false,
        },
    },
    clearScreen: false,
    logLevel: "warn",
    // plugins: [vue(), myPlugin()],
    plugins: [vue(), vitePluginTemplates("src/templates", "src/templatesCompiled")],
    resolve: {
        alias: {
            "@": `${path.resolve(__dirname, "src")}/`,
        },
    },
});
