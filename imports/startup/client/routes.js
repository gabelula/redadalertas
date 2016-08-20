import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from '../../ui/Home.js';

class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={Home} />
      </Router>

    )
  }
}

export default AppRoutes;
