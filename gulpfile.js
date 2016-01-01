var gulp = require('gulp');
var typescript = require("gulp-typescript");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var exec = require("gulp-exec");
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

var dists = "bin/";

var typescriptProject = typescript.createProject({
    typescript: require("typescript"),
    target: "ES6",
    sortOutput: true
});

gulp.task("compile", function(){
    // 対象となるファイルをすべて指定
    gulp.src(['./src/*.ts'])
	.pipe(typescript(typescriptProject))
	.pipe(rename(function(p){
	    //p.dirname = p.dirname.replace('src', '');
	    p.dirname = "";
	    p;
	}))
	.pipe(babel())
	.pipe(gulp.dest(dists));
});

gulp.task("test:compile", function(){
	gulp.src(['./src/*.ts', './test/*.ts'])
	.pipe(typescript(typescriptProject))
	.pipe(gulp.dest(""));
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list'}))
    .on('error', gutil.log);
});


gulp.task('watch-mocha', function() {
    gulp.watch(['src/**.ts', 'test/**.ts'], ['test']);
});

gulp.task('test', ["test:compile", "mocha"]);
