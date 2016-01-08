var gulp = require('gulp');
var fs = require('fs-extra');
var typescript = require("gulp-typescript");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var exec = require("gulp-exec");
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var electron = require('gulp-electron');
var exec = require('child_process').exec;
var jade = require('@mizchi/gulp-react-jade');
var sass = require('gulp-sass');
var less = require('gulp-less');

var packageJson = require('./src/package.json');

var config = {
    ts : {
        src: [
          './src/**/*.ts',
          '!./src/html/**'
        ],
        test: [
          './test/**/*.ts'
        ],
        html: './src/html',
        dst_html: './build/html',
        dst: './build',
        main: './build/app.js',
        electron: 'electron',
        electron_version: 'v0.36.2',
        templates: './lib',
        typings: './typings',
        options: { target: 'ES5', module: 'commonjs', jsx: 'react' },
    }
};

var typescriptProject = typescript.createProject(config.ts.options);
var htmlTypescriptProject = typescript.createProject(config.ts.options);

gulp.task('check-typings', function(callback){
  fs.access(config.ts.typings, fs.R_OK | fs.W_OK, function (err) {
    if(err){ // no 'typings/' folder
      console.log('Loading DefinitelyTyped...');
      var exec = require('child_process').exec;
      exec('tsd install', function(err, stdout, stderr){
        if(err){
          throw err;
        }
        process.stdout.write(stdout);
        process.stderr.write(stderr);

        console.log('done.');
        callback();
      });
    }else{
      callback();
    }
  });
});

gulp.task('clean', function(callback){
  fs.emptyDir(config.ts.dst, function(err){
    callback(err);
  });
});

gulp.task("compile-app", ['check-typings'], function(){
    // 対象となるファイルをすべて指定
  return gulp.src(config.ts.src)
    .pipe(typescript(typescriptProject))
//    .pipe(gulp.dest(config.ts.dst));
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.ts.dst));
});

gulp.task('compile-html-ts', ['check-typings'], function(){
  return gulp.src(config.ts.html + '/**/*.{ts,tsx,jsx}')
    .pipe(typescript(htmlTypescriptProject))
    .pipe(rename(function(path){
      var dirname = path.dirname;
      if(dirname == 'ts'){
        dirname = 'js';
      }else{
        dirname = dirname.replace(/\/ts$/, '/js');
      }
      //console.log(dirname);
      path.dirname = dirname;
    }))
    .pipe(gulp.dest(config.ts.dst_html));
});

gulp.task('compile-jade', function(){
  return gulp.src(config.ts.html + '/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(config.ts.dst_html));
});

gulp.task('scss', function() {
  return gulp.src(config.ts.html + '/**/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest(config.ts.dst_html))
});

gulp.task('less', function(){
    return gulp.src(config.ts.html + '/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(config.ts.dst_html))
});

gulp.task('compile', ['compile-app', 'compile-html-ts', 'scss', 'less']);

gulp.task("test:compile-source", ['check-typings'], function(){
  return gulp.src(config.ts.src)
    .pipe(typescript(config.ts.options))
    .js
    .pipe(babel())
    .pipe(gulp.dest("./test/temp/src"));
});

gulp.task("test:compile-test", ['check-typings'], function(){
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

gulp.task('copy-html', function(){
  return gulp.src(
    [config.ts.html + '/**/*.html', config.ts.html + '/**/*.js', config.ts.html + '/**/*.css'],
    {base: config.ts.html}
  )
  .pipe(gulp.dest(config.ts.dst_html));
});

gulp.task('copy-package.json', function(){
  if( ! fs.existsSync(config.ts.dst) ){
    fs.emptyDirSync(config.ts.dst);
  }
  return gulp.src('src/package.json')
    .pipe(gulp.dest(config.ts.dst));
});

gulp.task('npm-install', ['copy-package.json'], function(callback){
    var current_directory = process.cwd();
    process.chdir(config.ts.dst);
    exec('npm install', function(err, stdout, stderr){
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      callback(err);
    });
    process.chdir(current_directory);
});

gulp.task('copy-markdown', function(){
  return gulp.src('./src/markdown/*')
    .pipe(gulp.dest(config.ts.dst_html + '/md'));
});

gulp.task('run-app', function(callback){
  var cmd = config.ts.electron + ' ' + config.ts.dst;
  console.log('cmd: ', cmd);
  exec(cmd, function(err, stdout, stderr){
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    callback(err);
  });
});

gulp.task('run', function(callback){
  runSequence(
      'npm-install',
      'compile',
      'compile-jade',
      'copy-html',
      'copy-markdown',
      'run-app',
      callback
  );
});

gulp.task('pack', function() {
    gulp.src("")
    .pipe(electron({
        src: config.ts.dst,
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: config.ts.electron_version,
        packaging: true,
        platforms: ['win32-ia32', 'darwin-x64'],
        platformResources: {
            darwin: {
                CFBundleDisplayName: packageJson.name,
                CFBundleIdentifier: packageJson.name,
                CFBundleName: packageJson.name,
                CFBundleVersion: packageJson.version
//                icon: 'gulp-electron.icns'
            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version
//                "icon": 'gulp-electron.ico'
            }
        }
    }))
    .pipe(gulp.dest(""));
});

gulp.task('default', ['run']);
