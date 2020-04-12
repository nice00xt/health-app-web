import React, { Fragment } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import { useSubscription } from '@apollo/react-hooks';
import { fetchList } from '../../queries/signs';
import { List, Spin, Card } from 'antd';

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
  const { loading, data } = useSubscription(fetchList);

  return (
    <Fragment>
      <div className='scroll-list'>
        { loading ? <Spin /> : renderList(data) }
      </div>
    </Fragment>
  )
}

export default VitalSignsList;
