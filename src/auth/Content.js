import React, { useEffect, useContext, useState } from "react";
import { Layout, Button } from "antd";
import { navigate } from "@reach/router";
import { Auth } from "../context/AuthContext";
import app from '../firebaseConfig'

const Content = () => {
  const { Content } = Layout;
  const { usuario } = useContext(Auth);
  const [nombre, setnombre] = useState(null);


  useEffect(() => {
    if (usuario === null) { navigate("login"); }

    usuario
      ? usuario.displayName
        ? setnombre(usuario.displayName)
        : setnombre(usuario.email)
      : setnombre(null);
  }, [ usuario]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 40 }}>
        <Button onClick={() => app.auth().signOut()} key="logout" type="primary">Cerrar Sesión</Button>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "80vh",
          }}
        >
          Hola {nombre} :)
        </div>
      </Content>
    </Layout>
  );
};
export default Content;
