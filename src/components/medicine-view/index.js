import React from 'react';
import { Layout, List } from 'antd';
import { useSubscription } from '@apollo/react-hooks';
import { showMedication } from '../../queries/medication';
import HeaderView from '../../components/header-view';
const { Content } = Layout;

export const MedicineView = () => {
  const { loading, data } = useSubscription(showMedication);
  if (loading) { return <span>loading... </span> }
  return (
    <HeaderView headerTitle="Formula">
      <Content>
        <div className='section fade-in--top'>
        <List
          bordered
          header={<strong>Formula Actual</strong>}

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
        </div>
      </Content>
    </HeaderView>
  )
}

export default MedicineView;
