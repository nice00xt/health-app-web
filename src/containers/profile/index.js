import React, { Fragment } from 'react';
import { Row, Col, Layout, PageHeader, Descriptions } from 'antd';
const { Content } = Layout;

export const Profile = () => {
  return (
    <Fragment>
      <PageHeader title="Perfil" />
      <Content>
        <Row>
          <Col span={24}>
            <Descriptions title="Informacion de usuario">
              <Descriptions.Item label="Nombre">Lorem ipsion</Descriptions.Item>
              <Descriptions.Item label="Telefono">1810000000</Descriptions.Item>
              <Descriptions.Item label="Direccion">
                23123 1231231 123123
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Fragment>
  );
};

export default Profile;
