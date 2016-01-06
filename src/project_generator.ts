/// <reference path="../typings/tsd.d.ts" />

const fs = require('fs-extra');

export default class ProjectGenerator {
//    srcPath: string = "templates/";

    constructor(private project_name: string, private templatePath: string, private basePath: string){
    }

    make(){
        // テンプレートをコピー
        fs.copySync(this.templatePath, this.project_name);
        // package.jsonを作成
        const json = {
            "name": this.project_name,
            "version": "0.0.0",
            "description": this.project_name,
            "main": "app.js",
            "author": "",
            "license": "",
            "dependencies": {
                "react": "^0.14.5"
            },
            "bugs": {
                "url": "https://github.com/Sample/sample/issues"
            }
        };
        const srcPath = this.basePath + '/' + this.project_name + '/src';
        const jsonFilename = srcPath + '/package.json';
        fs.writeFile(jsonFilename, JSON.stringify(json, null, '    '));
    }


}