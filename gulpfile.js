'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require("gulp-rename"),
webserver = require('gulp-webserver'),
clean = require('gulp-clean'),
cleanCSS = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
uglify = require('gulp-uglify'),
Server = require('karma').Server;

 
/*===== Clean Dist Folder =====*/
gulp.task('clean', function () {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

/*===== Pipe HTML =====*/
gulp.task('html', ['clean'], function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

/*===== Pipe SASS to CSS =====*/
gulp.task('css', ['clean'], function() {
    return gulp.src('src/app/assets/sass/index.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({ basename: "index", suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
});

/*===== Pipe JS =====*/
gulp.task('js', ['clean'], function() {
    return gulp.src('src/app/**/**.js')
	    .pipe(sourcemaps.init())
	    .pipe(uglify())
    	.pipe(rename({ basename: "index", suffix: '.min' }))
    	.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

/*===== Run Unit Tests =====*/
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/*===== Start Web Server =====*/
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

/*===== Build Task =====*/
gulp.task('default', ['clean', 'html', 'css', 'js', 'webserver']);
