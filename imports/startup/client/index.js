import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import AppRoutes from './routes.js';

class App extends Component {
  render() {
    return (
      <div>React is Working!</div>
    )
  }
}

Meteor.startup( () => {
  render(<AppRoutes />, document.getElementById('app'));
});
