import React, { useState, useContext } from 'react';
import { orderBy } from 'lodash';
import { List, Spin, Checkbox } from 'antd';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import {
  showMedication,
  editMedication,
  addMedicationStatus,
  medicationDefault } from '../../queries/medication';
import ProgressBar from './ProgressBar';

export const MedicineList = () => {
  const { loading, data } = useSubscription(showMedication);
  const [onEditMedication] = useMutation(editMedication);
  const [onMedicationDefault] = useMutation(medicationDefault);
  const [ onAddMedicationStatus ] = useMutation(addMedicationStatus);
  const [ isCheckLOading, setLoadingCheck ] = useState(false);

  const onChange = (e, idx) => {
    const taken = e.target.checked;
    const id = idx.toString();
    setLoadingCheck(true)
    onEditMedication({
      variables: { taken, id }
    }).then(() => {
      setLoadingCheck(false)
    })
  }
  // aderente
  // no aderente
  if (loading) {
    return <div className="load"><Spin tip="cargando..." /></div>
  }

  return (
      <div className='section fade-in--top'>
        <List
          bordered
          header={<strong>Formula Actual</strong>}
          className='fade-in-image'
          dataSource={orderBy(data.medication, ['id'], ['asc'])}
          itemLayout="horizontal"
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={item.name}
                description={[<span>{ item.quantity }</span>, <span> - {item.description}</span>]}
              />
              <Checkbox
                defaultChecked={item.taken}
                // disabled={item.taken}
                onChange={(e) => onChange(e, item.id)}/>
            </List.Item>
          )}
        />
        <ProgressBar
          data={data.medication} loading={isCheckLOading}
          addStatus={onAddMedicationStatus}
          medicationDefault={onMedicationDefault}
        />
        <div className='hoal'></div>
      </div>
  )
}

export default MedicineList;