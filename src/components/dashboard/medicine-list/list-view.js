import React from 'react';
import { Card } from 'antd';
import MedicineList from '../medicine-list';
import { Link } from '@reach/router';

export const ListView = () => {
  return (
    <Card title={'Usuario 1'} extra={<Link to='/admin/user-view'>Volver</Link>}>
      <MedicineList actions/>
      <Card type="inner" title="Historial">
        list
      </Card>
    </Card>
  )
}

export default ListView;
