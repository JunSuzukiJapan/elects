/// <reference path="../../../typings/tsd.d.ts" />

const React = require('react');
const ReactDOM = require('react-dom');
const path = require('path');

const MainBody: typeof React.Component = require('./js/main-body').MainBody;
const element = React.createElement(MainBody);
const container = document.getElementById('container');

ReactDOM.render(element, container);
