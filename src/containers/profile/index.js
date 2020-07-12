import React, { useEffect, useContext, useState } from "react";
import { navigate } from "@reach/router";
import { Row, Col, Layout, Avatar, Descriptions, Button } from 'antd';
import HeaderView from '../../components/header-view';
import { Auth } from '../../context/AuthContext';
import app from '../../firebaseConfig';

const { Content } = Layout;

export const Profile = () => {
  const { usuario, setAuthState } = useContext(Auth);
  const [nombre, setnombre] = useState(null);
  useEffect(() => {
    if (usuario === null) { navigate("login"); }

    usuario
      ? usuario.displayName
        ? setnombre(usuario.displayName)
        : setnombre(usuario.email)
      : setnombre(null);
  }, [ usuario]);

  const handleSignOut = () => {
    setAuthState({ status: "loading" });
    app.auth().signOut().then(() =>{
      setAuthState({ status: "out" });
    })
  }

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
                  <Descriptions.Item label="Email">{ nombre }</Descriptions.Item>
                  {/* <Descriptions.Item label="Telefono">1810000000</Descriptions.Item>
                  <Descriptions.Item label="Direccion">
                    23123 1231231 123123
                  </Descriptions.Item> */}
                </Descriptions>
                <Button onClick={() => handleSignOut()} key="logout" type="primary">Cerrar Sesión</Button>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </HeaderView>
  );
};

export default Profile;
