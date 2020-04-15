import React, { Fragment } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import { List, Spin, Card, Typography } from 'antd';

const { Text } = Typography;

const renderList = ({ vitalsigns }) => {
  const orderDate = orderBy(vitalsigns, e => new Date(e.created_at), ['desc']);
  return (
    <List
      bordered
      dataSource={orderDate}
      renderItem={({ systolic, diastolic, heart_rate, weight, created_at }) => (
        <List.Item>
          <div className='fade-in-image'>
            <Card title={`${ moment(created_at).format('MMMM DD YYYY') }`} style={{ width: 300 }}>
              <Text style={{ fontSize: 18 }}>Frecuencia cardíaca: <br /><Text code><b>{heart_rate}</b> Lpm</Text></Text>
              <br/>
              <br/>
              <Text style={{ fontSize: 18 }}>Tensión Arterial: <br /><Text code><b>{`${systolic}/${diastolic}`}</b> mm/hg</Text></Text>
              <br/>
              <br/>
              <Text style={{ fontSize: 18 }}>Peso: <br /><Text code><b>{weight}</b> Kg</Text></Text>
            </Card>
          </div>
        </List.Item>
      )}
    />
  )
}

export const VitalSignsList = ({ loading, data }) => {
  return (
    <Fragment>
      <div className='scroll-list'>
        { loading ? <div className="load"><Spin tip="cargando..."/></div> : renderList(data) }
      </div>
    </Fragment>
  )
}

export default VitalSignsList;
