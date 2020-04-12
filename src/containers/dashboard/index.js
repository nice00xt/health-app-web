import React from 'react';
import { Link } from '@reach/router';

import './styles.scss';

import { List } from 'antd';
const data = [
  'Usuario 1',
];

export const Dashboard = () => {
  return (
    <div>
    <List
      header={<strong>Lista de usuarios</strong>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <div className='list-content'>
            <span>{item}</span>
            <Link to='user-view'>Ver</Link>
          </div>
        </List.Item>
      )}
    />
    </div>
  )
}

export default Dashboard;