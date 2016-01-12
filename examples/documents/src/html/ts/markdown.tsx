/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react');
import MarkdownIt = require('markdown-it');
import fs = require('fs-extra');
import path = require('path');
import cheerio = require('cheerio');

import TranslatorModule = require('./translator');
//console.log('module ', TranslatorModule);
const Translator = TranslatorModule.default;

export class Markdown extends React.Component {
  private template_filename: string = path.resolve(__dirname + '/../markdown-template');
  private md = new MarkdownIt();

  private template = null;
  private onChange;
  private translator;
  private html;
  private translated = false;

  static propTypes = { path_name: React.PropTypes.string.isRequired, css: React.PropTypes.string, lang: React.PropTypes.string };

  state = {
      path_name: '',
      lang: 'ja',
      translating_path_name: ''
  }

  constructor(props){
    super(props);

    this.state.path_name = props.path_name;
    console.log('props lang = ', props.lang);
    if(props.lang){
        this.state.lang = props.lang;
    }
    this.template = require(this.template_filename);
    this.onChange = props.onChange;
  }

  onClick(e){
    if(this.props.css === 'miniframe'){
      this.setState({path_name: this.props.path_name});
      this.onChange(true, this.props.path_name);
    }
  }

  render(){
    const self = this;
    const text = fs.readFileSync(this.props.path_name, 'utf8');
    var html = this.md.render(text);
    if(this.translated){
        html = this.html;
        this.translated = false;
    }

    console.log('lang ', this.state.lang);
    console.log('props.lang ', this.props.lang)
    const to = this.props.lang
    if(this.props.lang && (this.props.lang != this.state.lang)){
        console.log('translating to ', this.props.lang)

        //const $ = cheerio.load(html);
        //console.log('cheerio: ', $);

        if(!self.translator){
            //const filename = path.resolve(process.cwd() + '/translate.secret'));
            //self.translator = new Translator(filename);
            self.translator = new Translator();
        }
        self.translator.translate(html, 'ja', to, (result) => {
            //console.log('result ', result);
            result = result.replace( /\\u000a/g, '\n');
            result = result.replace(/\s*&gt;/g, '>');
            result = result.replace( /\s*\\\/\s*/g, '\/');
            result = result.replace(/<\\\//g, '<');

            result = result.replace(/<\s*([A-Za-z]+)\s*>/g, "<$1>");
            result = result.replace(/<\s+([A-Za-z]+\s+)/g, "<$1");
            result = result.replace(/<pre>\s*.*\s*<code>/g, '<pre><code>');
            result = result.replace(/\\"/g, '"');


            console.log('after: ', result);
            self.html = result;
            self.translated = true;

            self.setState({lang: this.props.lang});
        }));
    }

    return this.template({
      html: html,
      style: this.props.css,
      onClick: this.onClick.bind(this)
    });
  }
}
