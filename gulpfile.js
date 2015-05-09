'use strict'

const es6moduleTranspiler = require('gulp-es6-module-transpiler')
const gulp = require('gulp')

gulp.task('module', function() {
  return gulp.src('example/*.js')
    .pipe(es6moduleTranspiler({
      formatter: 'bundle'
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/'))
})

gulp.task('default', ['module'])
