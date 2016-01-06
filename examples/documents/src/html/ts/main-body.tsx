/// <reference path="../../../typings/tsd.d.ts" />

//import React = require('../../node_modules/react/dist/react.min.js');
import React = require('react');
import fs = require('fs-extra');
import path = require('path');


export class MainBody extends React.Component {
    private template_filename: string = path.resolve(__dirname + '/../body-template');
    private template = null;

    private markdown_list_filename: string = path.resolve(__dirname + '/../md/markdown_list.txt');
    private markdown_list = fs.readJsonSync(this.markdown_list_filename);

    state = {
        maximize: false,
        selectedFilename: ''
    }

    constructor(props){
        super(props);

        this.template = require(this.template_filename);
    }

    maximizeContent(maximize:boolean, selectedFilename: string){
        //console.log('maximize: ', maximize, ', filename: ', selectedFilename);
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

    render(){
        return this.template({
            list: this.markdown_list,
            maximize: this.state.maximize,
            filename: this.state.selectedFilename,
            onMaximize: this.maximizeContent.bind(this),
            onMinimize: this.minimizeContent.bind(this),
            onClickIndex: this.onClickIndex.bind(this),
            onClickGotoTop: this.onClickGotoTop.bind(this)
        });
    }
}