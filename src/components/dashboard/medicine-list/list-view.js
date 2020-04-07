import React from 'react';
import { Card } from 'antd';
import MedicineList from '../medicine-list';

export const ListView = () => {
  return (
    <Card title="Editar Formula">
      <span>Formula Actual</span>
      <MedicineList actions/>
      <Card type="inner" title="Historial">
        list
      </Card>
    </Card>
  )
}

export default ListView;
