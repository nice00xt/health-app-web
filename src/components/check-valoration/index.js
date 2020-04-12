import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { Tabs, Icon, Layout } from 'antd';

import { fetchValorations } from '../../queries/valorations';
import HeaderView from '../../components/header-view';
import CheckValorationForm from './valoration-form';
import GraphView from './graph';

const { TabPane } = Tabs;
const  { Content } = Layout;
export const CheckValoration = () => {
  const { loading, data } = useSubscription(fetchValorations);

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
            Preguntas
          </span>
        }
      >
        <Content>
          <CheckValorationForm />
        </Content>
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
        <Content>
          <GraphView loading={loading} data={data}/>
        </Content>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default CheckValoration;