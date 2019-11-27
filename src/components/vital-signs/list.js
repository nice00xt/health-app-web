import React, { Fragment } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import { navigate } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { fetchList } from '../../queries/signs';
import { Layout, PageHeader, List, Spin, Card } from 'antd';
const { Content } = Layout;

const renderList = ({ vitalsigns }) => {
  const orderDate = orderBy(vitalsigns, e => new Date(e.created_at), ['desc']);
  return (
    <List
      bordered
      dataSource={orderDate}
      renderItem={({ blood_pressure, heart_rate, weight, created_at }) => (
          <List.Item>
              <Card title={`${ moment(created_at).format('MMMM DD YYYY') }`} style={{ width: 300 }}>
                <p>Frecuencia cardíaca: {blood_pressure} /ppm</p>
                <p>Tensión Arterial: {heart_rate} /mm</p>
                <p>Peso: {weight} /kgm</p>
              </Card>
          </List.Item>
        )}
      />
  )
}

export const VitalSignsList = () => {
  const { loading, data } = useQuery(fetchList);

  return (
    <Fragment>
      <div className="header">
        <div className="fade-in">
          <PageHeader
            onBack={() => navigate('/')}
            title="Historial > Signos Vitales"
          />
        </div>
      </div>
      <Content className="fade-in">
        <div className='scroll-list'>
          { loading ? <Spin /> : renderList(data) }
        </div>
      </Content>
    </Fragment>
  )
}

export default VitalSignsList;
