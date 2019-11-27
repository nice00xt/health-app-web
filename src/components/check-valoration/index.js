import React, { Fragment } from 'react';
import { map } from 'lodash';
import { Formik } from 'formik';
// import { Link, navigate } from '@reach/router';
import { questions, validations, initialValues } from './validation';
import { useMutation } from '@apollo/react-hooks';
import { ADDvaloration } from '../../queries/valorations';
import {
  Row,
  Col,
  Layout,
  PageHeader,
  Typography,
  Checkbox,
  Button,
  message
} from 'antd';
const { Content } = Layout;
const { Text } = Typography;

const success = () => {
  message.success('Los datos han sido guardados', 2.5);
};

export const CheckValoration = () => {
  const [hadnleAddValorations] = useMutation(ADDvaloration);

  const renderQuestions = (
    questions,
    values,
    handleChange,
    handleBlur,
  ) => {
    return map(questions, ({ text, name }, idx) => {
      return (
        <div className="form-group" key={idx}>
          <Checkbox
            checked={values[name]}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            { text }
          </Checkbox>
        </div>
      )
    })
  }

  return (
    <Fragment>
      <div className='header'>
        <div className="fade-in">
          <PageHeader
            onBack={() => window.history.back()}
            title="Auto Valoración"
          />
        </div>
      </div>
      <Content className="fade-in">
        <Row>
          <Col span={24}>
          <Formik
              initialValues={initialValues}
              validationSchema={validations}
              onSubmit={(values, { setSubmitting }) => {
                hadnleAddValorations({
                  variables: { ...values }
                }).then(() => {
                  setSubmitting(false)
                  success()
                })
              }}
            >
              {({
                handleSubmit,
                values,
                handleChange,
                handleBlur,
                isSubmitting
              }) => (
            <form onSubmit={handleSubmit}>
              <div className='section-header'>
                <Text >Como te sientes hoy?</Text>
              </div>
              <div className='section ft'>
                { renderQuestions(
                  questions,
                  values,
                  handleChange,
                  handleBlur,
                )}
                <br />
              </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  block={isSubmitting}
                  loading={isSubmitting}
                >
                  Guardar
                </Button>
            </form>
            )}
            </Formik>
          </Col>
        </Row>
      </Content>
    </Fragment>
  )
}

export default CheckValoration;