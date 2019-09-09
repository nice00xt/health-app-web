import React, { Component } from 'react';
import { Router } from '@reach/router';

import LayoutContent from '../components/layout';
import Home from '../containers/home';
import Profile from '../containers/profile';
import CheckValoration from '../components/check-valoration';

export class Routes extends Component {
  render () {
    return (
    <Router>
      <Home path="/" />
      <LayoutContent path="/">
        <Profile path="/profile" />
        <CheckValoration path="check-valoration"/>
      </LayoutContent>
    </Router>
    )
  }
}

export default Routes;