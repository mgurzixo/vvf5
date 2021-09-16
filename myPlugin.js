const fileRegex = /\.(my-file-ext)$/;

export default function myPlugin() {
    return {
        name: "transform-file",

        // transform(src, id) {
        //     console.log(`[myPlugin] id=${id}Xid`);
        //     if (fileRegex.test(id)) {
        //         return {
        //             code: compileFileToJS(src),
        //             map: null, // provide source map if available
        //         };
        //     }
        // },
    };
}
