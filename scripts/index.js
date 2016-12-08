'use strict';

var Konami = require('./konami');

var HelloWorld = React.createClass({
  displayName: 'HelloWorld',

  updateName: function updateName(e) {
    this.setState({ name: e.target.value });
  },
  wellDone: function wellDone() {
    alert('Well done ' + this.state.name + '!');
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'label',
        null,
        'Enter your name :'
      ),
      React.createElement('input', { onChange: this.updateName }),
      React.createElement('br', null),
      React.createElement(
        'span',
        null,
        'Then type the secret code ;-)'
      ),
      React.createElement(Konami, { easterEgg: this.wellDone() })
    );
  }
});

React.render(React.createElement(HelloWorld, null), document.getElementById('app'));