import React from "react";
import { Router } from "@reach/router";

import LayoutContent from "../components/layout";
import Home from "../containers/home";
import Profile from "../containers/profile";
import Dashboard from "../containers/dashboard";
import GraphsView from "../containers/graph";
import CheckValoration from "../components/check-valoration";
import Depression from "../components/depression";
import DepressionSecond from "../components/depression/question-part";
import VitalSigns from "../components/vital-signs";
import VitalSignsList from "../components/vital-signs/list";
import ChartView from "../components/chart-view";
import ChartDetail from "../components/chart-view/chart-detail";

import DashboardLayout from "../components/layout/dashboard-layout";
import UserView from "../components/dashboard/user-view";
import ListView from "../components/dashboard/medicine-list/list-view";
import MedicineView from "../components/medicine-view";

import Login from '../auth/Login';
import SignUp from '../auth/Signup';
import Error from '../auth/Error';

import AuthRequired from '../auth/AuthRequired';

export const Routes = () => {
  return (
    <Router>
      <LayoutContent path="/">
        <AuthRequired path='/'>
          <Home path="/" /> 
          <Login path='login' />
          <Profile path="/profile" />
          <CheckValoration path="check-valoration" />
          <Depression path="depression" />
          <DepressionSecond path="second-part" />
          <VitalSigns path="vital-signs" />
          <VitalSignsList path="vital-signs-list" />
          <ChartView path="chart-view" />
          <ChartDetail path="chart-detail" />
          <MedicineView path="medicine-view" />
          <GraphsView path="graph-view" />
        </AuthRequired>
        <Login path="login" />
        <SignUp path='sign-up' />
        <Error path='*' />
      </LayoutContent>
        <DashboardLayout path="admin">
          <Dashboard path="/" />
          <UserView path="user-view" />
          <ListView path="list-view" />
        </DashboardLayout>
    </Router>
  );
};

export default Routes;
