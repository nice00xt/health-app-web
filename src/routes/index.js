import React, { Component } from 'react';
import { Router } from '@reach/router';

import LayoutContent from '../components/layout';
import Home from '../containers/home';
import Profile from '../containers/profile';

export class Routes extends Component {
  render () {
    return (
    <Router>
      <Home path="/" />
      <LayoutContent path="/">
        <Profile path="/profile" />
      </LayoutContent>
    </Router>
    )
  }
}

export default Routes;