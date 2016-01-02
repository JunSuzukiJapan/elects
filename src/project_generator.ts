/// <reference path="../typings/tsd.d.ts" />

const fs = require('fs-extra');

export class ProjectGenerator {
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
    }


}