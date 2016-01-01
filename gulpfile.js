var gulp = require('gulp');
var typescript = require("gulp-typescript");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var exec = require("gulp-exec");
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

var config = {
    ts : {
        src: [
          './src/**/*.ts',
        ],
        test: [
          './test/**/*.ts'
        ],
        dst: './build',
        options: { target: 'ES5', module: 'commonjs' }
    }
};

var typescriptProject = typescript.createProject(config.ts.options);


gulp.task("compile", function(){
    // 対象となるファイルをすべて指定
  gulp.src(config.ts.src)
    .pipe(typescript(typescriptProject))
    .js
//  .pipe(babel())
  	.pipe(gulp.dest(config.ts.dst));
});

gulp.task("test:compile-source", function(){
  return gulp.src(config.ts.src)
    .pipe(typescript(config.ts.options))
    .js
//  .pipe(babel())
    .pipe(gulp.dest("./test/temp/src"));
});

gulp.task("test:compile-test", function(){
  return gulp.src(config.ts.test)
  .pipe(typescript(config.ts.options))
  .pipe(babel())
  .pipe(gulp.dest("./test/temp/test"));
});

gulp.task("test-compile", function(callback){
  return runSequence(
    "test:compile-source",
    "test:compile-test",
    callback
  );
});

gulp.task('mocha', function() {
  return gulp.src(['./test/temp/test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list'}))
    .on('error', gutil.log);
});


gulp.task('watch-mocha', function() {
    gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['test']);
});

gulp.task('test', function(callback) {
  runSequence(
    "test:compile-source",
    "test:compile-test",
    "mocha",
    callback
  );
});
