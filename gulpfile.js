const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const cleanCSS = require("gulp-clean-css")
const plumber = require("gulp-plumber")
const concat = require("gulp-concat")

const sassDir = "sass/**/*.scss";

// Gulp Task - Build the css minified file
gulp.task("build-minify", function () {
    return gulp
        .src(sassDir)
        .pipe(plumber())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("minish.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("css"));
});

// Gulp Task - Build all CSS files transpiled by SCSS
gulp.task("build-css", function () {
    return gulp
        .src(sassDir)
        .pipe(plumber())
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("css"));
})

// Gulp Task - Build all CSS files and the minified one
gulp.task("build", gulp.series("build-css", "build-minify"));

//Gulp Task - Watch SCSS files
gulp.task("watch", function () {
    gulp.watch(sassDir, gulp.series("build-css", "build-minify"));
});

