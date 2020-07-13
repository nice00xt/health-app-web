import React, { useContext, useEffect } from 'react';
import { Form, Icon, Input, Button, Layout, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate, Link } from '@reach/router';
import app from '../firebaseConfig';
import { Auth } from '../context/AuthContext';
import Logo from '../images/logo.png';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('required'),
  password: Yup.string().required('required'),
});

const Login = () => {
  const { Content } = Layout;
  const { authState } = useContext(Auth);
  const isIn = authState.status === "in";

  useEffect(() => {
    if (isIn) navigate('/');
  }, [isIn]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }, { setSubmitting }) => {
      handleAuth(email, password, setSubmitting);
    }
  });
  const {
    handleSubmit,
    isSubmitting,
    values,
    handleChange,
    handleBlur,
  } = formik;

  const handleAuth = (email, password, setSubmitting) => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setSubmitting(false);
        message.success('Bienvenido', 0.9);
        console.log(result)
        navigate('/');
        // app.auth().currentUser.getIdToken(true).then((token) => {
        //   console.log(token, 'Auth token ---')
        // })
      })
      .catch((error) => {
        setSubmitting(false);
        message.error('Email o contraseña invalidos', 1);
      });
  }

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
        <Form onSubmit={handleSubmit}>
          <div className="form-group" style={{ width: '100%' }}>
            <div className="login-logo">
              <img className="logo" src={Logo} alt="" />
            </div>
            <Form.Item >
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="email"
                placeholder="Email"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
            <Form.Item>
              <br />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block={isSubmitting}
                loading={isSubmitting}
                style={{ width: '100%', fontSize: 18 }}
              >
                Ingresar
              </Button>
              <div className='text-center'>
                <Link style={{ fontSize: 18 }} to='/sign-up'>Registrarse</Link>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Content>
  );
};

export default Login;
