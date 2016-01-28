var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('src/dist/'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/dev/**/*', ['default']);
});