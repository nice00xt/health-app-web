import React, { useContext, useEffect } from 'react';
import { Form, Icon, Input, Button, Layout, message, Alert } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate, Link } from '@reach/router';
import { createPatient } from '../queries/users';
import app from '../firebaseConfig';
import { Auth } from '../context/AuthContext';
import Logo from '../images/logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('required'),
  fullName: Yup.string().required('required'),
  city: Yup.string().required('required'),
  phone: Yup.string().required('required'),
  age: Yup.string().required('required'),
  password: Yup.string().required('required'),
  passwordConfirmation: Yup.string()
    .required('Por favor confirma tu contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas ingresadas no coinciden'),
});

const Signup = () => {
  const { Content } = Layout;
  const [onCreatePatient] = useMutation(createPatient);
  const { authState } = useContext(Auth);
  const isIn = authState.status === "in";

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      fullName: '',
      city: '',
      phone: '',
      age: ''
    },
    validationSchema,
    handleBlur: false,
    handleChange: false,
    onSubmit: (values, { setSubmitting }) => {
      handleAuth(values, setSubmitting);
    },
  });
  const {
    handleSubmit,
    isSubmitting,
    values,
    handleChange,
    handleBlur,
    errors
  } = formik;


  const handleAuth = (values, setSubmitting) => {
    const { email, password, fullName, city, phone, age} = values;
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        setSubmitting(false);
        message.success('Bienvenido', 0.9);
        // app.auth().currentUser.getIdToken(true).then((token) => {
        //   console.log(token, 'Auth token ---')
        // })
        // onCreatePatient({
        //   variables: {
        //     email,
        //     city,
        //     fullName,
        //     phone,
        //     age,
        //     uuid: result.user.uid
        //   }
        // })
        console.log(authState)
        navigate('/');
      })
      .catch((error) => {
        setSubmitting(false);
        message.error('Ocurrió un error en el registro', 1);
      });
  }
  const handleSubmitForm = (e) => {
    if (isEmpty(errors)) {
      handleSubmit(e)
    } else {
      console.log(errors)
      message.error('Por favor revisa si la informacion es correcta', 1);
      handleSubmit(e)
    }
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
        <Form onSubmit={handleSubmitForm}>
          <div className="form-group" style={{ width: '100%' }}>
            <div className="login-logo sign">
              <img className="logo" src={Logo} alt="" />
            </div>
            <Form.Item>
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                type='email'
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
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="fullName"
                placeholder="Nombre completo"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Input
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="age"
                placeholder="Edad"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Input
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="city"
                placeholder="Ciudad"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Input
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="phone"
                placeholder="Telefono"
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
              <Input
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="passwordConfirmation"
                type="password"
                placeholder="Confirmar contraseña"
              />
            </Form.Item>
            <span>{ isEmpty(errors.passwordConfirmation) ? '' : (
              <Alert message={errors.passwordConfirmation} type="error" />
            )}</span>
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block={isSubmitting}
                loading={isSubmitting}
                style={{ width: '100%', fontSize: 18 }}
              >
                Registrarse
              </Button>
              <div className='text-center'>
                <Link style={{ fontSize: 18 }} to='/login'>Ingresar</Link>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Content>
  );
};

export default Signup;
