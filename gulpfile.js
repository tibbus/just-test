const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cpx = require('cpx');
require('./tasks');

gulp.task('ts', () => {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () => {
    return gulp.src('src/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/', 'src/styles/'] })
      .on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['ts', 'sass', 'copy:html'], () => {
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('src/**/*.html', ['copy:html']);
    gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('copy:fonts', () => {
    console.log('copy fonts to dist');

    cpx.copySync('node_modules/bootstrap-sass/assets/fonts/**/*', 'dist/fonts/');
});

gulp.task('copy:html', () => {
    cpx.copySync('src/**/*.html', 'dist');
});

gulp.task('all', ['ts', 'copy:html', 'sass', 'copy:fonts']);