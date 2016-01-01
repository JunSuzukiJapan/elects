var gulp = require('gulp');
var typescript = require("gulp-typescript");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var exec = require("gulp-exec");
var karma = require('gulp-karma');

var dists = "bin/";

var typescriptProject = typescript.createProject({
    typescript: require("typescript"),
    target: "ES6",
    sortOutput: true
});

var testFiles = [
    'src/*.ts',
    'spec/*.ts'
];

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

gulp.task('karma', function(){
    gulp.src(testFiles)
	.pipe(karma({
	    configFile: 'karma.conf.js',
	    action: 'watch'
	}));
});

