var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

sass.compiler = require('node-sass')

gulp.task('sass', function () {
    return gulp.src(['scss/style.scss', 'scss/homepage.scss', 'scss/game.scss'])
    //return gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', function () {
    gulp.watch('./scss/*.scss',['sass'])
})