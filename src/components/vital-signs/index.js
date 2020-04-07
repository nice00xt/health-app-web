import React from 'react';
import { Tabs, Icon, Layout } from 'antd';
import HeaderView from '../../components/header-view';
import VitalSignsList from './list';
import VitalSignForm from './vitalsign-form';

const { TabPane } = Tabs;
const { Content } = Layout;
export const VitalSigns = () => {

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
        <Content>
          <VitalSignForm />
        </Content>
      </TabPane>
      <TabPane
        key="2"
        tab={
          <div>
            <Icon type="bars" />
            Historial
          </div>
        }
      >
        <Content>
          <VitalSignsList />
        </Content>
      </TabPane>
      {/* <TabPane
        key="3"
        tab={
          <span>
            <Icon type="pie-chart" />
            Grafica
          </span>
        }
      >
        <Content>
          <span>Grafica</span>
        </Content>
      </TabPane> */}
    </Tabs>
    </HeaderView>
  )
}

export default VitalSigns;