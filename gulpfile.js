
const gulp = require('gulp'),
gutil = require('gulp-util'),
mocha = require('gulp-mocha');



gulp.task('mocha', async () => {
    return gulp.src([ 'tests/*.js', 'tests/**/*.js'], { read: false })
      .pipe(mocha({ reporter: 'list' }))
      .on('error', gutil.log);
  });