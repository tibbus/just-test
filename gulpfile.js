var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('ts', function () {
    var tsResult = gulp.src('src/dev/**/*')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('src/dist/'));
});

gulp.task('watch', ['ts', 'sass'], function () {
    gulp.watch('src/dev/**/*.ts', ['ts']);
    gulp.watch('src/dev/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    return gulp.src('src/dev/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/'] })
      .on('error', sass.logError))
      .pipe(gulp.dest('./src/dist'));
});

gulp.task('all', ['ts', 'sass']);