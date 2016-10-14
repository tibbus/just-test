'use strict'

const watch = require('watch');
const del = require('delete');
const gulp = require('gulp');
const cpx = require('cpx');
const child_process = require('child_process');

const filter = fileName => fileName.indexOf('.js') > -1 ? false : true;

gulp.task('watch:new', (onComplete) => {
    watch.createMonitor('src/dev', { interval: 1, filter }, monitor => {
        onComplete();

        monitor.on("changed", (f, curr, prev) => {
            gulp.start('ts:new');
        })
    })
});

gulp.task('ts:new', onComplete => {
    child_process.exec('npm run tsc', (error, stdout, stderr) => {
        cpx.copySync('src/dev/**/*{js,map,html}', 'src/dist');

        del(['src/dev/**/*.js*'], err => {
            if (err) {
                throw err;
            } else {
                onComplete();
            }
        });
    });
});