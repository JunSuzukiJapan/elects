/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import fs = require('fs-extra');
import chai = require('chai');
import child_process = require('child_process');
import Generator from '../src/project_generator';

const execSync = child_process.execSync;
chai.should();

const test_project_name = 'mocha_test_project';
const cwd = process.cwd();
const templatePath = cwd + '/bin/templates/';
const basePath = cwd;
const subject = new Generator(test_project_name, templatePath, basePath);

const filelist = [
    'package.json',
    'gulpfile.js',
    'tsd.json',
    'tsconfig.json',
    'test/',
    'src/app.ts',
    'src/package.json',
    'src/ts/base_application.ts',
    'src/ts/base_browser_window.ts',
    'src/html/index.html',
    'src/html/ts/main.tsx'
];

execSync('gulp');

before((done) => {
    subject.make();
    done();
});

after((done) => {
    fs.exists(test_project_name, () => {
        fs.removeSync(test_project_name);
        done();
    });
});

describe('Generator', () => {
    filelist.forEach((filename) => {
        describe(filename, () => {
            it('is exists.', () => {
                const path = basePath + '/' + test_project_name + '/' + filename;
                fs.existsSync(path).should.equal(true);
            });
        });
    });
});
