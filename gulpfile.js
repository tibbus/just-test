var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ncp = require('ncp').ncp;
var autoprefixer = require('gulp-autoprefixer');
require('./task');

gulp.task('ts', function() {
    var tsResult = gulp.src('src/dev/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('src/dist/'));
});

gulp.task('watch', ['ts', 'sass', 'copy:html'], function() {
    gulp.watch('src/dev/**/*.ts', ['ts']);
    gulp.watch('src/dev/**/*.html', ['copy:html']);
    gulp.watch('src/dev/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/', 'src/styles/'] })
      .on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
});

// Use this task only if necessary (currently not needed)
gulp.task('copy:css', function () {
    return gulp.src('src/dist/**/*.css')
      .pipe(autoprefixer())
      .pipe(gulp.dest('./src/dist'));
});

gulp.task('copy:html', function () {
    return gulp.src('src/dev/**/*.html')
      .pipe(gulp.dest('./src/dist'));
});

gulp.task('copy:fonts', function () {
    console.log('copy fonts to dist');

    ncp('node_modules/bootstrap-sass/assets/fonts', 'src/dist/fonts/', function (err) {
        if (err) {
            return console.error(err);
        }
    });
});

gulp.task('all', ['ts', 'copy:html', 'sass'], function () {
    // dist folder does not exists, therefore run the `fonts` task after the `ts` one
    gulp.start('copy:fonts');
});