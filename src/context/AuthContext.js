import React, { useEffect, useState } from 'react';
import { Spin, Icon } from 'antd';
import app from '../firebaseConfig';
import Logo from '../images/logo.png'

const LoadingIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged(function (user) {
      setUsuario(user);
      setShowChild(true);
    });
  }, []);

  if (!showChild) {
    return (
      <div className='loading-screen fade-in'>
          <img className="logo" src={Logo} alt=''/>
          <Spin indicator={LoadingIcon} />
      </div>
    );
  } else {
    return <Auth.Provider value={{ usuario }}>{children}</Auth.Provider>;
  }
};
