'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel');

gulp.task('js', function (done) {
    return gulp.src('./*.js').pipe(babel({
        presets: ['es2015']
    })).pipe(gulp.dest('./js/'));
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/**/*.scss').pipe(sass().on('Error', sass.logError)).pipe(autoprefixer({
        browsers: ['last 2 versions']
    })).pipe(browserSync.stream()).pipe(gulp.dest('./css/'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('server', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./scss/**/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['js-watch']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('default', ['server']);