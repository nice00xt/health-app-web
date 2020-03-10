import React from 'react';
import { Router } from '@reach/router';

import LayoutContent from '../components/layout';
import Home from '../containers/home';
import Profile from '../containers/profile';
import CheckValoration from '../components/check-valoration';
import Depression from '../components/depression';
import DepressionSecond from '../components/depression/question-part';
import VitalSigns from '../components/vital-signs';
import VitalSignsList from '../components/vital-signs/list';
import ChartView from '../components/chart-view';
import ChartDetail from '../components/chart-view/chart-detail'


export const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <LayoutContent path="/">
        <Profile path="/profile" />
        <CheckValoration path="check-valoration"/>
        <Depression path='depression' />
        <DepressionSecond path='second-part'/>
        <VitalSigns path="vital-signs"/>
        <VitalSignsList path="vital-signs-list"/>
        <ChartView path="chart-view" />
        <ChartDetail path="chart-detail"/>
      </LayoutContent>
    </Router>
  )
}

export default Routes;