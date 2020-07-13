import React from 'react';
import { Layout, Result } from 'antd';
import { useSubscription } from '@apollo/react-hooks';
import { getMedStatus } from '../../queries/medication';
import HeaderView from '../../components/header-view';
import { validateDate } from '../../libs/helpers';
import MedicineList from './medication-list';
const { Content } = Layout;

export const MedicineView = () => {
  const { loading, data } = useSubscription(getMedStatus);
  const renderContent = () => {
  const validate = validateDate(data.medication_status);
  if (validate) {
    return (
      <div className="section fade-in--top">
        <Result
          status="success"
          title="Estado Guardado"
          subTitle="Continua los hábitos de estilo de vida saludable en curso"
        />
      </div>
    )
  }

    return <MedicineList />
  }

  return (
    <HeaderView headerTitle="Formula">
      <Content>
        { loading ? '' : renderContent() }
      </Content>
    </HeaderView>
  )
}

export default MedicineView;