import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from '../../ui/Home.js';
import MainLayout from '../../ui/MainLayout.js';

class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={MainLayout} >
          <Route path='/' component={Home} />
        </Route>
      </Router>

    )
  }
}

export default AppRoutes;
