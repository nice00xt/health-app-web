import React, { useContext, useEffect } from 'react';
import { Icon, Input, Button, Layout, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from '@reach/router';
import app from '../firebaseConfig';
import { Auth } from '../context/AuthContext';
import Logo from '../images/logo.png';

const InputGroup = Input.Group;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().required('required'),
});

const Login = () => {
  const { Content } = Layout;
  const { usuario } = useContext(Auth);

  useEffect(() => {
    if (usuario) navigate('/');
  }, [usuario]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }, { setSubmitting }) => {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          setSubmitting(false);
          console.log(result);
          message.success('Bienvenido', 0.9);
          navigate('/');
        })
        .catch((error) => {
          setSubmitting(false);
          message.error('Email o contraseña invalidos', 1);
        });
    },
  });
  const {
    handleSubmit,
    isSubmitting,
    values,
    handleChange,
    handleBlur,
  } = formik;

  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        backgroundColor: 'white',
      }}
    >
      <div
        className="section ft fade-in--top"
        style={{
          width: '100%',
          height: '100%',
          boxShadow: 'none',
          padding: 40,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ width: '100%' }}>
            <div className="login-logo">
              <img className="logo" src={Logo} alt="" />
            </div>
            <InputGroup>
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="email"
                placeholder="Email"
                autoComplete="off"
              />
            </InputGroup>
            <br />
            <InputGroup>
              <Input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="password"
                type="password"
                placeholder="Contraseña"
              />
            </InputGroup>
            <br />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block={isSubmitting}
              loading={isSubmitting}
            >
              Ingresar
            </Button>
          </div>
        </form>
      </div>
    </Content>
  );
};
export default Login;
