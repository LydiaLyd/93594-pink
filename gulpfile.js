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

gulp.task("style", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(csso())
    .pipe(gulp.dest("css"))
    .pipe(livereload());
});

gulp.task("csscomb", function() {
  gulp.src("css/style.css")
  .pipe(csscomb())
  .pipe(gulp.dest("./style.css"));
});

gulp.task("start", ["style"], function() {
  livereload.listen();
  gulp.watch("less/**/*.less", ["style"]);
});



// Оставьте эту строку в самом конце файла
require("./.gosha");
