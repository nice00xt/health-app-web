import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Tabs, Icon } from 'antd';

import { fetchValorations } from '../../queries/valorations';
import HeaderView from '../../components/header-view';
import CheckValorationForm from './valoration-form';
import GraphView from './graph';

const { TabPane } = Tabs;
export const CheckValoration = () => {
  const { loading, data } = useQuery(fetchValorations);

  return (
    <HeaderView
      headerTitle="Auto Valoración"
      contentTitle="Como te sientes hoy?"
    >
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
        <CheckValorationForm />
      </TabPane>
      <TabPane
        key="2"
        tab={
          <span>
            <Icon type="pie-chart" />
            Grafica
          </span>
        }
      >
        <GraphView loading={loading} data={data}/>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default CheckValoration;