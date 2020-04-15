import React, { useState } from 'react';
import { Tabs, Icon, Layout, DatePicker } from 'antd';
import moment from 'moment';
import { fetchValorations } from '../../queries/valorations';
import { fetchDepression } from '../../queries/depression';
import { showStatus } from '../../queries/status';

import HeaderView from '../../components/header-view';
import CheckValorationForm from './valoration-form';
import GraphView from '../graph-view.js';

const { TabPane } = Tabs;
const  { Content } = Layout;
const { MonthPicker } = DatePicker;

export const CheckValoration = () => {
  const [ currentDate, useDate ] = useState({ date: moment().format('MMMM - YYYY') });
  const handleDate = (date, addMonth) => {
    const formatDate = date.format('MMMM - YYYY');
    addMonth({ date: formatDate });
  }

  return (
    <HeaderView
      headerTitle="Auto Valoración"
      contentTitle="Como te sientes hoy?"
    >
    <Tabs defaultActiveKey="1" size='large'>
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
          <CheckValorationForm fetchData={showStatus}/>
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
          <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'flex-start' }}>
            <MonthPicker
              onChange={(date) => handleDate(date, useDate)}
              placeholder="Seleccionar Fecha"
              size='large'
            />
          </div>
          <div className='section' style={{ marginBottom: 15 }}>
            <GraphView
              size={500}
              type='valorations'
              fetchData={fetchValorations}
              currentDate={currentDate}
              title='Resultados valoración'
            />
          </div>
          <div className='section'>
            <GraphView
              size={200}
              type='depression'
              currentDate={currentDate}
              fetchData={fetchDepression}
              title='Resultados Depresión'
            />
          </div>
        </Content>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default CheckValoration;