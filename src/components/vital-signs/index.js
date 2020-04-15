import React from 'react';
import { Tabs, Icon, Layout, Spin, Result } from 'antd';
import { useSubscription } from '@apollo/react-hooks';
import { reverse } from 'lodash';
import moment from 'moment';
import { fetchList } from '../../queries/signs';
import HeaderView from '../../components/header-view';
import VitalSignsList from './list';
import VitalSignForm from './vitalsign-form';

const { TabPane } = Tabs;
const { Content } = Layout;
export const VitalSigns = () => {
  const { loading, data } = useSubscription(fetchList);
  const renderForm = (list) => {
    const currentDate = moment().format('MMMM/DD/YYYY')
    const dataList = reverse(list);
    const validDate = moment(dataList[0].created_at).format('MMMM/DD/YYYY') === currentDate;
    if (validDate) {
      return (
        <div className="section fade-in--top">
          <Result
            status="success"
            title="Formulario enviado"
            subTitle="Continua los hábitos de estilo de vida saludable en curso"
          />
        </div>
      )
    } else {
      return <VitalSignForm />
    }
  }

  return (
    <HeaderView headerTitle="Signos Vitales">
    <Tabs defaultActiveKey="1" size="large">
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
          { loading ? (
              <div className="load"><Spin /></div>
            ) : renderForm(data.vitalsigns) }
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
          <VitalSignsList loading={loading} data={data} />
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