/// <reference path="../../../typings/tsd.d.ts" />

const React = require('react');
const ReactDOM = require('react-dom');
const path = require('path');

//const Markdown: typeof React.Component = require('./js/markdown').Markdown;
//const filename = path.resolve(__dirname + '/md/index.md');
//const element = React.createElement(Markdown, {path: filename});

const MainBody: typeof React.Component = require('./js/main-body').MainBody;
const element = React.createElement(MainBody);

const container = document.getElementById('container');

ReactDOM.render(element, container);
