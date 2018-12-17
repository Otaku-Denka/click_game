var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var customMedia = require('postcss-custom-media');
var lost = require('lost');
var rucksackCss = require('rucksack-css');

var paths = {
  cssSource: 'sass/',
  cssOutput: 'css/',
};
gulp.watch('scss/*.scss', ['sass']);

gulp.task('sass', function() {
  var processors = [
    autoprefixer({ browsers: ['last 5 version'] }),
    customMedia(),
    lost(),
    rucksackCss(),
  ];

  return gulp
    .src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/'));
});

gulp.task('default', ['sass']);
