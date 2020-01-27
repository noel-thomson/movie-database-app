var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

// compile scss into css
function style(){
  // 1. locate scss file
  return gulp.src('./src/scss/**/*.scss')
  // 2. convert to css file through sass compiler
    .pipe(sass().on('error', sass.logError))
  // 2.1 pass through autoprefixer
    .pipe(autoprefixer())
  // 3. location to save compiled css
    .pipe(gulp.dest('./dist/css'))
  // 4. stream changes to browsers
    .pipe(browserSync.stream());
}

function js(){
  return gulp.src('./src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'));
}

// browser sync
function watch(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./**/*html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.js = js;
exports.style = style;
exports.watch = watch;
