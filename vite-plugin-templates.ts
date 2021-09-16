import { resolve, relative, normalize } from "path";
import { green, dim } from "chalk";
import picomatch from "picomatch";
import type { PluginOption, ViteDevServer } from "vite";

/**
 * Configuration for the watched paths.
 */
interface Config {
    /**
     * Whether full reload should happen regardless of the file path.
     * @default true
     */
    always?: boolean;

    /**
     * How many milliseconds to wait before reloading the page after a file change.
     * @default 0
     */
    delay?: number;

    /**
     * Whether to log when a file change triggers a full reload.
     * @default true
     */
    log?: boolean;

    /**
     * Files will be resolved against this path.
     * @default process.cwd()
     */
    root?: string;
}

/**
 * Allows to automatically reload the page when a watched file changes.
 */

export default (
    srcDir: string,
    destDir: string,
    config: Config = {}
): PluginOption => ({
    name: "vite-plugin-templates",

    apply: "serve",

    // NOTE: Enable globbing so that Vite keeps track of the template files.
    config: () => ({
        server: { watch: { disableGlobbing: false } },
    }),

    configureServer({ watcher }: ViteDevServer) {
        // console.log(`Coucou`);
        const {
            root = process.cwd(),
            // log = true,
            // always = true,
            delay = 0,
        } = config;
        const fullSrcDir = normalize(resolve(root, srcDir));
        const glob = `${fullSrcDir}/**/*.ejs`;
        // console.log(
        //     `[vite-plugin-templates.configureServer] root=${root} srcDir:${srcDir} dest:${destDir} glob=${glob}`
        // );
        const shouldCompile = picomatch(glob);
        const checkCompile = (src: string) => {
            if (!shouldCompile(src)) {
                console.log(`[vite-plugin-templates.checkCompile]  NOTOK`);
                return;
            }
            console.log(`[vite-plugin-templates.checkCompile]  src=${src}`);
            dest = normalize(
                resolve(root, `${destDir}/${relative(fullSrcDir, src)}`)
            );
            console.log(`[vite-plugin-templates.checkCompile]  dest=${dest}`);
        };
        watcher.on("add", checkCompile);
        watcher.on("change", checkCompile);
    },
});
