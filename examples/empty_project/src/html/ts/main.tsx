/// <reference path="../../../typings/tsd.d.ts" />

var React = require('../node_modules/react/dist/react.min.js');

var HelloMessage = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

React.render(
    <HelloMessage name="ElecTS" />,
    document.getElementById('container')
);