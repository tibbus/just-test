'use strict'

const watch = require('watch');
const del = require('delete');
const gulp = require('gulp');
const cpx = require('cpx');
const child_process = require('child_process');

const filter = fileName => fileName.indexOf('.js') > -1 ? false : true;

gulp.task('watch:new', onComplete => {
    watch.createMonitor('src', { interval: 1, filter }, monitor => {
       onComplete();

        monitor.on("changed", (file, curr, prev) => {
            if (file.indexOf('.ts') > -1) {
                console.log(`${file} changed --> Compiling Typescript...`);
                gulp.start('ts:new');
            } else if (file.indexOf('.html') > -1) {
                console.log(`${file} changed --> Copying HTML...`);
                gulp.start('copy:html');
            } else if (file.indexOf('.scss') > -1) {
                console.log(`${file} changed --> Compiling SASS...`);
                gulp.start('sass');
            }
            
        })
    })
});

gulp.task('ts:new', onComplete => {
    child_process.exec('npm run tsc', (error, stdout, stderr) => {
        cpx.copySync('src/**/*{js,map,html,ts}', 'dist');

        del(['src/**/*.js*'], err => {
            if (err) {
                throw err;
            } else {
                onComplete();
            }
        });
    });
});