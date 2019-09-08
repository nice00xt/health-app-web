import React, { Component } from 'react';
import { Router } from '@reach/router';

import LayoutContent from '../components/layout';
import Home from '../containers/home';

export class Routes extends Component {
  render () {
    return (
    <Router>
      <LayoutContent path="/">
        <Home path="/" />
      </LayoutContent>
    </Router>
    )
  }
}

export default Routes;