const gulp = require('gulp');
const ghPages = require('gh-pages');
const path = require('path');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');

const { STYLE_LIBS, JS_LIBS } = require('./gulp.config');

gulp.task('default', function () {
  return (
    gulp
      .src('src/**/*')
      // exclude files defined in .gitignore
      .pipe(gitignore())
      .pipe(gulp.dest('dist'))
  );
});

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'dist',
    },
    open: true,
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles-vendor', function () {
  return gulp
    .src([...STYLE_LIBS])
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});
gulp.task('styles-main', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles-main'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
  gulp.watch('src/html-pages/parts/**/*.html').on('change', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts-main'));
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('html-pages', function () {
  return gulp
    .src('src/html-pages/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/html-pages'));
});

gulp.task('scripts-main', function () {
  return gulp
    .src(['src/js/**/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-vendor', function () {
  return gulp
    .src([...JS_LIBS])
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function () {
  return gulp.src('src/assets/icons/**/*').pipe(gulp.dest('dist/assets/icons'));
});

gulp.task('images', function () {
  return gulp.src('src/media/images/**/*').pipe(gulp.dest('dist/media/images'));
});

gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'server',
    'styles-main',
    'styles-vendor',
    'scripts-main',
    'scripts-vendor',
    'fonts',
    'icons',
    'images',
    'html',
    'html-pages'
  )
);

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './dist'), cb);
}
exports.deploy = deploy;
