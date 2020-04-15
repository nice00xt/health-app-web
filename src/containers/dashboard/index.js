import React from 'react';
import { Link } from '@reach/router';

import { List, Icon, notification, Spin } from 'antd';
import { useSubscription } from '@apollo/react-hooks';
import { showStatus } from '../../queries/status';
import './styles.scss';

const userData = [
  'Usuario 1',
];

const openNotification = (list) => {
  notification.open({
    message: 'Alerta',
    description: list.status[0].description,
    icon: <Icon type="warning" style={{ color: '#ffc107' }} />,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export const Dashboard = () => {
  const { loading, data } = useSubscription(showStatus);

  const iconStatus = (list) => {
    const status = list.status[0].name;

    if (status === '1') {
      return <Icon className="fade-in-scale check" type="check-circle" />
    } else if (status === '2') {
      return <Icon className="fade-in-scale alert" type="exclamation-circle" />
    } else if (status === '3') {
      openNotification(list);
      return <Icon className="fade-in-scale warning" type="warning" />
    }
  }

  if (loading) { return (<div className="load"><Spin tip="cargando..." /></div>) }
  return (
    <div>
      { loading
        ? (<div className="load"><Spin tip="cargando..." /></div>)
        : (<List
            header={<strong>Lista de usuarios</strong>}
            bordered
            dataSource={userData}
            renderItem={item => (
              <List.Item>
                <div className='list-content'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    { iconStatus(data) }
                    <span>{item}</span>
                  </div>
                  <Link to='user-view'>Ver</Link>
                </div>
              </List.Item>
            )}
          />
        )}
    </div>
  )
}

export default Dashboard;