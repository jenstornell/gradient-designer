let gulp = require("gulp");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify-es").default;
let csso = require("gulp-csso");
let rename = require("gulp-rename");

var css = {
  src: "assets/css/src/**/*.scss",
  dest: "assets/css/dist",
  filename: "style.scss",
};

var js = {
  src: [
    "assets/js/src/**/store-*.js",
    "assets/js/src/**/store.js",
    "assets/js/src/**/*.js",
  ],
  dest: "assets/js/dist",
  filename: "script.js",
};

function style() {
  return gulp
    .src(css.src)
    .pipe(concat(css.filename))
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest(css.dest))
    .pipe(csso())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest(css.dest));
}

function script() {
  return gulp
    .src(js.src)
    .pipe(concat(js.filename))
    .pipe(gulp.dest(js.dest))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest(js.dest));
}

function watch() {
  //gulp.watch(css.src, style);
  gulp.watch(js.src, script);
}

exports.css = style;
exports.js = script;
exports.default = watch;
