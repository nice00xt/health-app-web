import React, { useState } from 'react';
import { Tabs, Layout, DatePicker } from 'antd';
import moment from 'moment';
import { fetchValorations } from '../../queries/valorations';
import { fetchDepression } from '../../queries/depression';
import { getMedStatus } from '../../queries/medication';

import HeaderView from '../../components/header-view';
import GraphView from '../../components/graph-view';
import MedicationGraph from '../../components/graph-view/medication-graph';

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
      <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'center' }}>
        <MonthPicker
          onChange={(date) => handleDate(date, useDate)}
          placeholder="Seleccionar Fecha"
          size='large'
        />
      </div>
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
          <div className='section' style={{ marginBottom: 15 }}>
            <MedicationGraph
              size={500}
              type='medication_status'
              fetchData={getMedStatus}
              currentDate={currentDate}
              title='Resultados valoración'
            />
          </div>
        </Content>
      </TabPane>
    </Tabs>
    </HeaderView>
  )
}

export default GraphsView;