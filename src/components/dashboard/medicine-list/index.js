import React from 'react';
import { List, Button } from 'antd';
const data = [
  '-- -- -- -- -- --',
  '-- -- --',
  '-- -- -- -- --',
];

export const MedicineList = ({ actions }) => {
  const hasActions = actions ? [<span >Editar</span>, <span>Eliminar</span>] : null
  return (
    <div>
      <List
        bordered
        dataSource={data}
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item
            actions={hasActions}
          >
            <List.Item.Meta
              title={item}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
      <Button style={{ marginBottom: 20 }} type="primary">Nuevo</Button>
    </div>
  )
}

export default MedicineList;