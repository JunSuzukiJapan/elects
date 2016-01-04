/// <reference path="../typings/tsd.d.ts" />

const fs = require('fs-extra');

export default class ProjectGenerator {
    srcPath: string = "templates/";

    constructor(private project_name: string){
    }

    make(){
        // 実行されたディレクトリからテンプレートのパスを求める。 
        const arg = process.argv[0];
        const match = arg.match('.*/(.*)$');
        const path = arg.replace(match[1], '');
        const src = path + this.srcPath;
        // テンプレートをコピー
        fs.copySync(src, this.project_name);
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
        const srcPath = this.project_name + '/src';
        const jsonFilename = srcPath + '/package.json';
        fs.writeFile(jsonFilename, JSON.stringify(json, null, '    '));
    }


}