import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { fetchValorations } from '../../queries/valorations';
import { Tabs, Icon } from 'antd';
import HeaderView from '../../components/header-view';
import VitalSignsList from './list';
import VitalSignForm from './vitalsign-form';

const { TabPane } = Tabs;
export const VitalSigns = () => {
  // const { loading, data } = useQuery(fetchValorations);

  return (
    <HeaderView headerTitle="Signos Vitales">
    <Tabs defaultActiveKey="1">
      <TabPane
        key="1"
        tab={
          <span>
            <Icon type="snippets" />
            Formulario
          </span>
        }
      >
        <VitalSignForm />
      </TabPane>
      <TabPane
        key="2"
        tab={
          <span>
            <Icon type="bars" />
            Historial
          </span>
        }
      >
        <VitalSignsList />
      </TabPane>
      <TabPane
        key="3"
        tab={
          <span>
            <Icon type="pie-chart" />
            Grafica
          </span>
        }
      >
        <span>Grafica</span>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default VitalSigns;