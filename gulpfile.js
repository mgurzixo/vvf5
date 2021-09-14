"use strict";
const gulp = require("gulp");
const insert = require("gulp-insert");
const rename = require("gulp-rename");
const template = require("gulp-template");

// Compile all *.ejs files to pre-compiled templates and append *.js to the filename.
gulp.task("templates", () =>
    gulp
        .src("./src/**/*.ejs")
        .pipe(
            template.precompile({
                evaluate: /\{%([\s\S]+?)%\}/g,
                interpolate: /\{\{([\s\S]+?)\}\}/g,
                escape: /\{\{\{([\s\S]+?)\}\}\}/g,
                variable: "ctx",
            })
        )
        .pipe(
            insert.transform(function (contents, file) {
                let arr = file.path.match(/\/([^\/]+)\/([^\/]+)\.ejs$/);
                if (!arr) throw `gulpfile: invalid file: '${file.path}'`;
                let comp = arr[1];
                let mode = arr[2];
                if (comp === "partials") {
                    return `export default {"${comp}":{"${mode}": ${contents}}}`;
                }
                return `export default { "${mode}": ${contents}}`;
            })
        )
        .pipe(
            rename({
                extname: ".ejs.js",
            })
        )
        .pipe(gulp.dest("lib"))
);
