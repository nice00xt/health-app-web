import React, { useEffect, useContext, useState } from "react";
import { navigate } from "@reach/router";
import { Auth } from "../context/AuthContext";
import app from '../firebaseConfig'

const AuthRequired = ({ children }) => {
  const { authState } = useContext(Auth);
  const [allowed, setAllowed] = useState(null);
  const isIn = authState.status === 'in';

  useEffect(() => {
    isIn
      ? setAllowed(true)
      : navigate('/login');
  }, [isIn]);

  return (
    <>
      { allowed ? children : null }
    </>
  );
};
export default AuthRequired;