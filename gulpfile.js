const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");

function compileSass() {
  return gulp.src("./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssSorter({
      order: "smacss"
    }
    )]))
    .pipe(mmq())
    .pipe(gulp.dest("./dist/css/"))
}

function watch() {
  gulp.watch("./src/sass/**/*.scss", gulp.series(compileSass, browserReload))
  gulp.watch("./dist/js/**/*.js", browserReload)
}

function browserInit(done) {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function minImage() {
  return gulp.src("./src/img/**/*").pipe(imagemin([
    imagemin.gifsicle({ interlaced: false, optimizationLevel: 1, }),
    imagemin.mozjpeg({ quality: 85, optimizationLevel: 2 }),
    imageminPngquant({ quality: [0.65, 0.8] }),
    imagemin.svgo()
  ]))
    .pipe(gulp.dest("./dist/img/"))
}

exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.minImage = minImage;
exports.dev = gulp.parallel(browserInit, watch)
exports.build = gulp.parallel(compileSass, minImage);