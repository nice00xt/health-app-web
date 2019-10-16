import React, { Fragment } from 'react';

import {
  Row,
  Col,
  Layout,
  PageHeader,
  Typography,
  Input,
  Button,
} from 'antd';
const { Content } = Layout;
const { Text } = Typography;

export const VitalSigns = () => {
  return (
    <Fragment>
      <div className='header'>
        <div className="fade-in">
          <PageHeader
            onBack={() => window.history.back()}
            title="Signos Vitales"
          />
        </div>
      </div>
      <Content className="fade-in">
        <Row>
          <Col span={24}>
            <form>
              <div className='section-header'>
                <Text>Ingresa tus resultados</Text>
              </div>
              <div className='section ft'>
                  <div className="form-group">
                    <Text>Frecuencia cardíaca</Text>
                    <Input placeholder="Basic usage" />
                  </div>
                  <div className="form-group">
                    <Text>Tensión Arterial</Text>
                    <Input placeholder="Basic usage" />
                  </div>
                  <div className="form-group">
                    <Text>Peso</Text>
                    <Input placeholder="Basic usage" />
                  </div>
                <br />
              </div>
                <Button type="primary" block>Guardar</Button>
            </form>
          </Col>
        </Row>
      </Content>
    </Fragment>
  )
}

export default VitalSigns;