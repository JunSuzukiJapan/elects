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
        var json = {
            "name": this.project_name,
            "version": "0.0.0",
            "description": this.project_name,
            "main": "app.js",
            "author": "",
            "license": "",
            "dependencies": {
                "fs-extra": "^0.26.3",
                "markdown-it": "^5.1.0",
                "normalize.css": "^3.0.3",
                "path": "^0.12.7",
                "react": "^0.14.5",
                "react-bootstrap": "^0.28.1",
                "react-dom": "^0.14.5"
            },
            "bugs": {
                "url": "https://github.com/Sample/sample/issues"
            }
        };
        const srcPath = this.basePath + '/' + this.project_name + '/src';
        const jsonFilename = srcPath + '/package.json';
        if(fs.existsSync(jsonFilename)){
            const tmpJson = fs.readJsonSync(jsonFilename);
            tmpJson.name = json.name;
            tmpJson.description = json.description;
            const depend = json['dependencies'];
            for(var key in depend){
                tmpJson['dependencies'][key] = depend[key];
            }
            json = tmpJson;
        }
        fs.writeFile(jsonFilename, JSON.stringify(json, null, '    '));
    }


}
