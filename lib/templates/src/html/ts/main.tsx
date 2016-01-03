/// <reference path="../../../typings/tsd.d.ts" />

var React = require('react');

var HelloMessage = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

React.render(
    <HelloMessage name="ElecTS" />,
    document.getElementById('container')
);