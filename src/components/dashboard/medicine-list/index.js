import React, { useState } from 'react';
import moment from 'moment';
import { List, Spin, Typography } from 'antd';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { showMedication, deleteMedication } from '../../../queries/medication';
import FormMedication from './form';
import './styles.scss';
const { Text } = Typography;

export const MedicineList = ({ actions }) => {
  const [ onDeleteMedication ] = useMutation(deleteMedication);
  const [ loadingList, onLoadList ] = useState(false);
  const { loading, data } = useSubscription(showMedication);
  const handleDelete = ({ id }) => {
    if (actions) {
      return (
        <span
          className="deleted"
          onClick={() => {
            onLoadList(true);
            onDeleteMedication({
              variables: { id }
            }).then(() => {
              onLoadList(false);
            }).catch(() => {
              onLoadList(false)
            })
          }}
        >
          Eliminar
        </span>
      )
    }
  };

  if (loading) { return <div className="load"><Spin tip="cargando..." /></div> }

  return (
    <div className="fade-in-image">
      <List
        bordered
        header={<strong>Formula Actual</strong>}
        footer={actions ? <FormMedication /> : null }
        dataSource={data.medication}
        loading={loadingList}
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item actions={[handleDelete(item)]}>
            <List.Item.Meta
              title={item.name}
              description={[<span>{ item.quantity }</span>, <span> - {item.description}</span>]}
            />
            <Text
              style={{ fontSize: 11, color: '#d7d7d7', textTransform: 'capitalize' }}
              type="secondary">
              {moment(item.created_at).format('MMM D - YY')}
            </Text>
          </List.Item>
        )}
      />
    </div>
  )
}

export default MedicineList;