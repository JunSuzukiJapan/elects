var gulp = require('gulp');
var typescript = require("gulp-typescript");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var exec = require("gulp-exec");
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var fs = require('fs-extra');


var config = {
    ts : {
        src: [
          './src/**/*.ts',
        ],
        test: [
          './test/**/*.ts'
        ],
        dst: './build',
        main: './build/app.js',
        templates: './lib',
        options: { target: 'ES5', module: 'commonjs' }
    }
};

var typescriptProject = typescript.createProject(config.ts.options);


gulp.task("compile", function(){
    // 対象となるファイルをすべて指定
  return gulp.src(config.ts.src)
    .pipe(typescript(typescriptProject))
    .js
    .pipe(babel())
    .pipe(gulp.dest(config.ts.dst));
});

gulp.task("test:compile-source", function(){
  return gulp.src(config.ts.src)
    .pipe(typescript(config.ts.options))
    .js
    .pipe(babel())
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

gulp.task('copy-templates', function(){
  fs.copySync(config.ts.templates, config.ts.dst);
  return true;
});

gulp.task('run-app', function(){
  var exec = require('child_process').exec;
  exec('node ' + config.ts.main, function(err, stdout, stderr){
    if(err){
      throw err;
    }
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  });
});

gulp.task('run', function(callback){
  runSequence(
      'compile',
      'copy-templates',
      'run-app',
      callback
  );
});

gulp.task('default', ['compile']);
