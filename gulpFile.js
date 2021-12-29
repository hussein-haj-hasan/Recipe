"use strict";
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  del = require("del"),
  usemin = require("gulp-usemin"),
  uglify = require("gulp-uglify"),
  htmlmin = require("gulp-htmlmin"),
  cleancss = require("gulp-clean-css"),
  rev = require("gulp-rev"),
  flatmap = require("gulp-flatmap"),
  imagemin = require("gulp-imagemin");

gulp.task("sass", function () {
  return gulp
    .src("./css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});
gulp.task("watch:sass", function () {
  gulp.watch("./css/*.scss", gulp.series("sass"));
});
gulp.task("browserSync", function () {
  var file = ["./*.html", "./css/*.css", "./js/*.js", "./img/*.{jpg,gif,png}"];
  browserSync.init(file, {
    server: {
      baseDir: "./",
    },
  });
});
gulp.task("default", gulp.parallel("browserSync", "watch:sass"));
gulp.task("del", function () {
  return del(["dist"]);
});
gulp.task("imagemin", function () {
  return gulp
    .src("./img/*.{jpg,gif,png}")
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/img"));
});
gulp.task("copyFonts",function(){
  return gulp
  .src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}")
  .pipe(gulp.dest("./dist/fonts"))
})
gulp.task("usemin", function () {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap(function (stream, file) {
        return stream.pipe(
          usemin({
            css: [rev],
            html: [ 
              function () {
                return htmlmin({
                  collapseWhitespace: true,
                });
              },
            ],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleancss(), "concat"],
          })
        );
      })
    )
    .pipe(gulp.dest("dist/"));
});
gulp.task("clean", gulp.series("del", gulp.parallel("imagemin","copyFonts", "usemin")));
