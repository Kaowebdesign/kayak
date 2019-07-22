var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cleanCss= require('gulp-clean-css'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    del = require('del'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug');

gulp.task('sass', function() { //Таск для пошуку sass файлів
    return gulp.src('app/sass/**/*.scss') /*Обираємо всі файли з даним розширенням*/
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cleanCss())
        .pipe(gulp.dest('app/css')) /*Результат кладемо в папку css*/
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function() {
    gulp.src('app/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('clean', function() {
    return del.sync('dist');
});


gulp.task('watch', ['browser-sync', 'pug', 'build'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean','imagemin','sass','css-min','scripts'], function() {

    var buildMainCss = gulp.src('app/css/style.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildCommonJs = gulp.src('app/js/common.min.js')
        .pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});



gulp.task('default', ['watch']);