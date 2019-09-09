import React, { Component } from 'react';
import { Router } from '@reach/router';

import LayoutContent from '../components/layout';
import Home from '../containers/home';
import Profile from '../containers/profile';
import CheckValoration from '../components/check-valoration';
import VitalSigns from '../components/vital-signs';

export class Routes extends Component {
  render () {
    return (
    <Router>
      <Home path="/" />
      <LayoutContent path="/">
        <Profile path="/profile" />
        <CheckValoration path="check-valoration"/>
        <VitalSigns path="vital-signs"/>
      </LayoutContent>
    </Router>
    )
  }
}

export default Routes;