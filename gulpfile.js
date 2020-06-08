const gulp = require('gulp')
const clean = require('gulp-clean')
const ts = require('gulp-typescript')

const tsApp = ts.createProject('tsconfig.json')

gulp.task('scripts', () => {
    const tsResult = tsApp.src()
        .pipe(tsApp())

    return tsResult.js
        .pipe(gulp.dest('dist'))
})