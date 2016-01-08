/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react');
import MarkdownIt = require('markdown-it');
import fs = require('fs-extra');
import path = require('path');

export class Markdown extends React.Component {
  private template_filename: string = path.resolve(__dirname + '/../markdown-template');
  private md = new MarkdownIt();

  private template = null;
  private onChange;

  static propTypes = { path_name: React.PropTypes.string.isRequired, css: React.PropTypes.string };

  state = {path_name: ''}

  constructor(props){
    super(props);

    this.state.path_name = props.path_name;
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
    const text = fs.readFileSync(this.props.path_name, 'utf8');
    const html = this.md.render(text);

    return this.template({
      html: html,
      style: this.props.css,
      onClick: this.onClick.bind(this)
    });
  }
}
