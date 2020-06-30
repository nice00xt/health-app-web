import React from 'react';
import HeaderView from '../../components/header-view';
import { Row, Col, Layout, Avatar, Descriptions } from 'antd';
const { Content } = Layout;

export const Profile = () => {
  return (
    <HeaderView headerTitle="Perfil">
      <Content>
        <div className='section'>
          <div className='profile'>
            <Row>
              <Col span={24}>
                <div className='profile__avatar'>
                  <Avatar size={64} icon="user"/>
                </div>
                <Descriptions title="Informacion de usuario">
                  <Descriptions.Item label="Nombre">Lorem ipsion</Descriptions.Item>
                  <Descriptions.Item label="Telefono">1810000000</Descriptions.Item>
                  <Descriptions.Item label="Direccion">
                    23123 1231231 123123
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </HeaderView>
  );
};

export default Profile;
