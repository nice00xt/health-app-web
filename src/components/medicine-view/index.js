import React, { useState } from 'react';
import { orderBy } from 'lodash';
import { Layout, List, Spin, Checkbox, Button } from 'antd';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { showMedication, editMedication } from '../../queries/medication';
import HeaderView from '../../components/header-view';
import ProgressBar from './ProgressBar';
const { Content } = Layout;

export const MedicineView = () => {
  const { loading, data } = useSubscription(showMedication);
  const [onEditMedication] = useMutation(editMedication);
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

  return (
    <HeaderView headerTitle="Formula">
      <Content>
        { loading ? <div className="load"><Spin tip="cargando..." /></div>: (
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
            <ProgressBar data={data.medication} loading={isCheckLOading}/>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', marginTop: 20 }}
            >
              Guardar
            </Button>
            <div className='hoal'></div>
          </div>
        )}
      </Content>
    </HeaderView>
  )
}

export default MedicineView;