import React, { useState } from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import { Card, Row, Col, DatePicker } from 'antd';
import MedicineList from '../medicine-list';
import { fetchValorations } from '../../../queries/valorations';
import { fetchDepression } from '../../../queries/depression';
import { fetchList } from '../../../queries/signs';
import GraphView from '../../graph-view.js';
import LineChart from '../../graph-view.js/line-chart';
import MixLineChart from '../../graph-view.js/mix-line-chart';

const { MonthPicker } = DatePicker;

export const UserView = () => {
  const [ currentDate, useDate ] = useState({ date: moment().format('MMMM - YYYY') });

  const handleDate = (date, addMonth) => {
    const formatDate = date.format('MMMM - YYYY');
    addMonth({ date: formatDate });
  }

  return (
    <div>
      <Card title="Usuario 1">
        <Row gutter={24}>
          <Col span={12}>
            <Card type="inner" title="Informacion del paciente">
              <p><strong>Nombre:</strong> Usuario 1</p>
              <p><strong>Edad:</strong> 65</p>
              <p><strong>Genero:</strong> F</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              type="inner"
              title="Formula"
              extra={<Link to="/admin/list-view">Agregar</Link>}
            >
            <MedicineList />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              style={{ marginTop: 20 }}
              type="inner"
              title="Graficas"
              extra={
                <MonthPicker
                  onChange={(date) => handleDate(date, useDate)}
                  placeholder="Seleccionar Fecha"
                />}
            >
              <Row>
                <Col span={6}>
                  <GraphView
                    size={200}
                    type='valorations'
                    fetchData={fetchValorations}
                    currentDate={currentDate}
                    title='Resultados valoración'
                  />
                  <GraphView
                    size={200}
                    type='depression'
                    currentDate={currentDate}
                    fetchData={fetchDepression}
                    title='Resultados Depresión'
                  />
                </Col>
                <Col span={18}>
                  <LineChart
                    fetchData={fetchList}
                    currentDate={currentDate}
                    title='Frecuencia Cardiaca'
                    backgroundColor='rgba(255, 35, 80, 0.7)'
                    type='heart_rate'
                    measure='LPM'
                  />
                  <LineChart
                    fetchData={fetchList}
                    currentDate={currentDate}
                    title='Peso'
                    backgroundColor='rgba(24, 144, 255, 1)'
                    type='weight'
                    measure='Kg'
                  />
                  <MixLineChart
                    fetchData={fetchList}
                    currentDate={currentDate}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default UserView;
