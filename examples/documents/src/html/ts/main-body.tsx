/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react');
import fs = require('fs-extra');
import path = require('path');

export class MainBody extends React.Component {
    private template_filename: string = path.resolve(__dirname + '/../body-template');
    private template = null;

    private markdown_list_filename: string = path.resolve(__dirname + '/../md/markdown_list.txt');
    private markdown_list = fs.readJsonSync(this.markdown_list_filename);

    private lang:string = 'ja';

    state = {
        maximize: false,
        selectedFilename: '',
        lang: 'ja'
    }

    constructor(props){
        super(props);

        this.template = require(this.template_filename);
    }

    maximizeContent(maximize:boolean, selectedFilename: string){
        this.setState({maximize: maximize, selectedFilename: selectedFilename});
    }

    minimizeContent(e){

    }

    onClickIndex(e){
        const filename = e.target.name;
        this.setState({maximize: true, selectedFilename: filename});
    }

    onClickGotoTop(e){
        this.setState({maximize: false});
    }

    onChangeLanguage(e){
        console.log('change lang ', e.target.value)
        this.lang = e.target.value;
    }

    doTranslate(e){
        console.log('do translate');
        this.setState({lang: this.lang})
    }

    render(){
        console.log('mai-body render');
        return this.template({
            list: this.markdown_list,
            maximize: this.state.maximize,
            filename: this.state.selectedFilename,
            onMaximize: this.maximizeContent.bind(this),
            onMinimize: this.minimizeContent.bind(this),
            onClickIndex: this.onClickIndex.bind(this),
            onClickGotoTop: this.onClickGotoTop.bind(this),
            onChangeLanguage: this.onChangeLanguage.bind(this),
            doTranslate: this.doTranslate.bind(this),
            lang: this.state.lang
        });
    }
}
