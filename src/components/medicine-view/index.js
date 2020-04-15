import React from 'react';
import { Layout, List, Spin } from 'antd';
import { useSubscription } from '@apollo/react-hooks';
import { showMedication } from '../../queries/medication';
import HeaderView from '../../components/header-view';
const { Content } = Layout;

export const MedicineView = () => {
  const { loading, data } = useSubscription(showMedication);
  return (
    <HeaderView headerTitle="Formula">
      <Content>
        <div className='section fade-in--top'>
        { loading ? <div className="load"><Spin tip="cargando..." /></div>: (
          <List
            bordered
            header={<strong>Formula Actual</strong>}
            className='fade-in-image'
            dataSource={data.medication}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={[<span>{ item.quantity }</span>, <span> - {item.description}</span>]}
                />
              </List.Item>
            )}
          />
        ) }
        </div>
      </Content>
    </HeaderView>
  )
}

export default MedicineView;
