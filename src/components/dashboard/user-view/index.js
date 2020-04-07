import React from 'react';
import { Link } from '@reach/router';
import { Card, Row, Col } from 'antd';
import MedicineList from '../medicine-list';

export const UserView = () => {
  return (
    <div>
      <Card title="Usuario 1">
        <Row gutter={24}>
          <Col span={12}>
            <Card type="inner" title="Informacion del paciente">
              <p><strong>Nombre:</strong> Usuario 1</p>
              <p><strong>Edad:</strong> 65</p>
              <p><strong>Genero:</strong> F</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              type="inner"
              title="Formula"
              extra={<Link to="/admin/list-view">Agreagar</Link>}
            >
            <MedicineList />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              style={{ marginTop: 20 }}
              type="inner"
              title="Graficas"
              // extra={<a href="#">More</a>}
            >
              Inner Card content
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default UserView;
