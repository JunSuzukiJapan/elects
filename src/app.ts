#!/usr/bin/env node

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/typings/tsd.d.ts" />

const program = require('commander');
const colors = require('colors');

// node.jsから実行された場合には、argv[0]を削除する。
const arg1 = process.argv[0];
if(arg1.match( '/node$' )){
    process.argv.shift();
}

program
    .version('0.0.1')
//    .option('-h, --help', 'show help')

program
    .command('new <name>', 'create new project')
    .action( (name) => {
        console.log("Creating new project '" + name + "'.");
        const Generator = require('./project_generator').default;
        const gen = new Generator(name);
        gen.make();
        console.log('done.');
    });

program.parse(process.argv);

if(!process.argv.slice(2).length){
    program._name = 'elects';
    program.outputHelp(make_red);
}

function make_red(txt){
    return colors.red(txt);
}