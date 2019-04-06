const gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  pug = require('gulp-pug'),
  // sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch')

const sassOptions = {
  outputStyle: 'nested'
}

const pugOptions = {
  pretty: true
}

// gulp.task('styles', () => {
//   gulp.src('./src/sass/*.scss')
//     .pipe(plumber())
//     .pipe(sass(sassOptions))
//     .pipe(autoprefixer({ version: ['> 1%, last 2 versions, Firefox ESR, Opera 12.1'] }))
//     .pipe(gulp.dest('./public/css'))
// });

gulp.task('pug', () => {
  gulp
    .src('./src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest('./public'))
})

gulp.task('default', () => {
  // gulp.watch(['src/pug/**/*.pug', 'src/sass/**/*.scss'], ['pug', 'styles'])
  // watch('./src/sass/**/*.scss', () => gulp.start('styles'));
  watch('./src/pug/**/*.pug', () => gulp.start('pug'))
})

// gulp.task('styles:prod', () => {
//   gulp.src('./src/sass/*.scss')
//     .pipe(plumber())
//     .pipe(sass(sassOptions))
//     .pipe(autoprefixer({ version: ['> 1%, last 2 versions, Firefox ESR, Opera 12.1'] }))
//     .pipe(gulp.dest('./docs/css'))
// });

gulp.task('pug:prod', () => {
  gulp
    .src('./src/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest('./docs'))
})

gulp.task('prod', () => {
  // gulp.watch(['src/pug/**/*.pug', 'src/sass/**/*.scss'], ['pug', 'styles'])
  // watch('./src/sass/**/*.scss', () => [gulp.start('styles'), gulp.start('styles:prod')]);
  watch('./src/pug/**/*.pug', () => [gulp.start('pug:prod'), gulp.start('pug')])
})
