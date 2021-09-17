import { resolve, relative, normalize, dirname } from "path";
import { green, dim } from "chalk";
import picomatch from "picomatch";
import type { PluginOption, ViteDevServer } from "vite";
import _ from "lodash";
import { readFile, writeFile, mkdir } from "fs/promises";
import glob from "glob";

("use strict");

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

// Compiles a formio template
async function compileTemplate(src, dest) {
    // console.log(`[vite-plugin-templates.compileTemplate]  src=${src}`);
    // console.log(`[vite-plugin-templates.compileTemplate]  dest=${dest}`);
    let tmpl = await readFile(src).then((tmpl) => {
        // console.log(`[vite-plugin-templates.compileTemplate]  tmpl=${tmpl}`);
        let contents = _.template(tmpl, {
            evaluate: /\{%([\s\S]+?)%\}/g,
            interpolate: /\{\{([\s\S]+?)\}\}/g,
            escape: /\{\{\{([\s\S]+?)\}\}\}/g,
            variable: "ctx",
        }).toString();
        // console.log(`[vite-plugin-templates.compileTemplate] contents=${contents}`);
        let arr = src.match(/\/([^\/]+)\/([^\/]+)\.ejs$/);
        if (!arr)
            throw `[vite-plugin-templates.compileTemplate] invalid file: '${file.path}'`;
        let comp = arr[1];
        let mode = arr[2];
        let res = "";
        // console.log(
        //     `[vite-plugin-templates.compileTemplate]  comp=${comp} mode=${mode}`
        // );
        if (comp === "partials") {
            res = `export default {"${comp}":{"${mode}": ${contents}}}`;
        } else {
            res = `export default { "${mode}": ${contents}}`;
        }
        // console.log(`[vite-plugin-templates.compileTemplate]  res=${res}`);
        mkdir(dirname(dest), { recursive: true }).then(() =>
            writeFile(dest, res)
        );
    });
}

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
        const {
            root = process.cwd(),
            // log = true,
            // always = true,
            delay = 0,
        } = config;
        const fullSrcDir = normalize(resolve(root, srcDir));
        const srcGlob = `${fullSrcDir}/**/*.ejs`;
        glob(srcGlob, (err, srcs) => {
            // Recompile all templates when reloading page. Could be smarter???
            if (err) throw `[vite-plugin-templates.configureServer] ${err}'`;
            for (src of srcs) {
                let dest = normalize(
                    resolve(root, `${destDir}/${relative(fullSrcDir, src)}.js`)
                );
                compileTemplate(src, dest);
            }
        });

        // console.log(
        //     `[vite-plugin-templates.configureServer] root=${root} srcDir:${srcDir} dest:${destDir} srcGlob=${srcGlob}`
        // );
        const shouldCompile = picomatch(srcGlob);
        const checkCompile = (src: string) => {
            if (!shouldCompile(src)) {
                // console.log(
                //     `[vite-plugin-templates.checkCompile]  NOTOK: ${src}`
                // );
                return;
            }
            let dest = normalize(
                resolve(root, `${destDir}/${relative(fullSrcDir, src)}.js`)
            );
            compileTemplate(src, dest);
        };
        watcher.on("add", checkCompile);
        watcher.on("change", checkCompile);
    },
});
