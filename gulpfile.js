const gulp = require('gulp')
const clean = require('gulp-clean')
const ts = require('gulp-typescript')

const tsApp = ts.createProject('tsconfig.json')

gulp.task('scripts', ['static'], () => {
    const tsResult = tsApp.src()
        .pipe(tsApp())

    return tsResult.js
        .pipe(gulp.dest('dist'))
})

gulp.task('static', ['clean'], () => {
    return gulp
        .src(['src/**/*.js'])
        .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
    return gulp
        .src('dist')
        .pipe(clean())
})

gulp.task('build', ['scripts'])

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build'])
})

gulp.task('default', ['watch'])