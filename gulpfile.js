"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    livereload = require("gulp-livereload"),
    csso = require("gulp-csso"),
    rename = require("gulp-rename"),
    csscomb = require("gulp-csscomb"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    combineMq = require("gulp-combine-mq"),
    clean = require("gulp-clean"),
    runSequence = require("run-sequence"),
    htmlmin = require("gulp-htmlmin");

gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions", "ie 10"]})
    ]))
    .pipe(combineMq({
        beautify: true
    }))
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
});

gulp.task("script", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat("all.js"))
    .pipe(rename("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(livereload());
});

gulp.task("vendors", function() {
  return gulp.src("source/js/vendors/*")
    .pipe(gulp.dest("build/js/vendors"));
});

gulp.task("images", function() {
  return gulp.src("source/img/*.{png,jpg,gif,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function() {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("fonts", function() {
  return gulp.src("source/font/*")
    .pipe(gulp.dest("build/font"));
});

gulp.task("build", function(callback) {
  runSequence("clean",
              ["style", "script", "vendors", "html", "images", "fonts"],
              callback);
});

gulp.task("start", ["style", "script"], function() {
  livereload.listen();
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("js/script.js", ["script"]);
});



// Оставьте эту строку в самом конце файла
require("./.gosha");
