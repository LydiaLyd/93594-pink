"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var livereload = require("gulp-livereload");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var csscomb = require("gulp-csscomb");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var imagemin = require('gulp-imagemin');

gulp.task("style", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions", "ie 10"]})
    ]))
    .pipe(csso())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("css"))
    .pipe(livereload());
});

gulp.task("minify", function() {
  return gulp.src("css/style.css")
    .pipe(csso())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("css"))
});

gulp.task("comb", function() {
  return gulp.src("css/style.css")
    .pipe(csscomb())
    .pipe(gulp.dest("css"));
});

gulp.task("script", function() {
  return gulp.src("js/script.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("js"))
    .pipe(livereload());
});

gulp.task("images", function() {
  return gulp.src("img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("img"));
});

// TODO: разобраться, как добиться выполнения этой последовательности.
// похоже, эти задачи выполняются одновременно о_О поэтому получается не то
gulp.task("build", [
  "style",
  "minify",
  "comb",
  "script"
]);

gulp.task("start", ["style", "minify", "script"], function() {
  livereload.listen();
  gulp.watch("less/**/*.less", ["style", "minify"]);
  gulp.watch("js/script.js", ["script"]);
});



// Оставьте эту строку в самом конце файла
require("./.gosha");
