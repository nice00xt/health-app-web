import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, navigate } from '@reach/router';
import { Row, Col, Layout, PageHeader, Typography, Input, Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { addVitalSign, fetchList } from '../../queries/signs';
const { Content } = Layout;
const { Text } = Typography;

const validations = Yup.object().shape({
  heartRate: Yup.string().required('required'),
  bloodPressure: Yup.string().required('required'),
  weight: Yup.string().required('required')
});

const success = () => {
  message.success('Los datos han sido guardados', 2.5);
};

export const VitalSigns = () => {
  const [onAddVitalSign] = useMutation(addVitalSign);

  return (
    <Fragment>
      <div className="header">
        <div className="fade-in">
          <PageHeader
            onBack={() => navigate('/')}
            title="Signos Vitales"
          />
        </div>
      </div>
      <Content className="fade-in">
        <Row>
          <Col span={24}>
            <Link
              to="/vital-signs-list"
              className='ant-btn'
            >
              <span>Historial</span>
            </Link>
            <Formik
              initialValues={{
                heartRate: '',
                bloodPressure: '',
                weight: ''
              }}
              validationSchema={validations}
              onSubmit={({ heartRate, bloodPressure, weight }, { setSubmitting }) => {
                const attr = {
                  heart_rate: heartRate,
                  blood_pressure: bloodPressure,
                  weight
                }

                onAddVitalSign({
                  variables: { ...attr },
                  refetchQueries: [{ query: fetchList }]
                }).then(() => {
                  setSubmitting(false);
                  success();
                  navigate('/vital-signs-list')
                });
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
                  <div className="section-header">
                    <Text>Ingresa tus resultados</Text>
                  </div>
                  <div className="section ft">
                    <div className="form-group">
                      <Text>Frecuencia cardíaca</Text>
                      <Input
                        value={values.heartRate}
                        placeholder="Basic usage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="heartRate"
                        type="text"
                        id="heartRate"
                      />
                    </div>
                    <div className="form-group">
                      <Text>Tensión Arterial</Text>
                      <Input
                        value={values.bloodPressure}
                        placeholder="Basic usage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="bloodPressure"
                        id="bloodPressure"
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <Text>Peso</Text>
                      <Input
                        value={values.weight}
                        placeholder="Basic usage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="weight"
                        id="weight"
                        type="text"
                      />
                    </div>
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
  );
};

export default VitalSigns;
