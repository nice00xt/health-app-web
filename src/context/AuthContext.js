import React, { useEffect, useState } from 'react';
import { Spin, Icon } from 'antd';
import app from '../firebaseConfig';
import Logo from '../images/logo.png'

const LoadingIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [authState, setAuthState] = useState({ status: "loading" });
  const [usuario, setUsuario] = useState(null);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged(async user => {
      setUsuario(user);
      setShowChild(true);

      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          const metadataRef = app
            .database()
            .ref("metadata/" + user.uid + "/refreshTime");
          metadataRef.on("value", async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
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
    return <Auth.Provider value={{ usuario, authState, setAuthState }}>{children}</Auth.Provider>;
  }
};
