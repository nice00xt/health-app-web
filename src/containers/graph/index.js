import React, { useState } from 'react';
import { Tabs, Layout, DatePicker } from 'antd';
import moment from 'moment';
import { fetchValorations } from '../../queries/valorations';
import { fetchDepression } from '../../queries/depression';

import HeaderView from '../../components/header-view';
import GraphView from '../../components/graph-view';

const { TabPane } = Tabs;
const  { Content } = Layout;
const { MonthPicker } = DatePicker;

export const GraphsView = () => {
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
            Auto Valoración
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
        </Content>
      </TabPane>
      <TabPane
        key="2"
        tab={
          <span>
            Depresión
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
              size={200}
              type='depression'
              currentDate={currentDate}
              fetchData={fetchDepression}
              title='Resultados Depresión'
            />
          </div>
        </Content>
      </TabPane>
      <TabPane
        key="3"
        tab={
          <span>
            Formula
          </span>
        }
      >
        <Content>
          <span>depresion</span>
        </Content>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default GraphsView;