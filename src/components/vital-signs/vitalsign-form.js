import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './validations';
import { Typography, Input, Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { addVitalSign, fetchList } from '../../queries/signs';
const { Text } = Typography;

const validations = Yup.object().shape({
  heartRate: Yup.string().required('required'),
  bloodPressure: Yup.string().required('required'),
  weight: Yup.string().required('required')
});

const success = () => {
  message.success('Los datos han sido guardados', 2.5);
};

export const VitalSignForm = () => {
  const [onAddVitalSign] = useMutation(addVitalSign);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ heartRate, bloodPressure, weight }, { setSubmitting }) => {
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
      });
    }
  });
  const { handleSubmit, isSubmitting, values, handleChange, handleBlur } = formik;

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default VitalSignForm;
