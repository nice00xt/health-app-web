import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './validations';
import { Typography, Input, Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { addVitalSign } from '../../queries/signs';
const { Text } = Typography;
const InputGroup = Input.Group

const success = () => {
  message.success('Los datos han sido guardados', 2.5);
};

export const VitalSignForm = () => {
  const [onAddVitalSign] = useMutation(addVitalSign);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ heartRate, systolic, diastolic, weight }, { setSubmitting, resetForm }) => {
      const attr = {
        heart_rate: heartRate,
        blood_pressure: '',
        systolic,
        diastolic,
        weight
      }

      onAddVitalSign({
        variables: { ...attr },
      }).then(() => {
        setSubmitting(false);
        resetForm({})
        success();
      });
    }
  });
  const { handleSubmit, isSubmitting, values, handleChange, handleBlur } = formik;

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="section ft fade-in--top">
          <div className="form-group">
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Frecuencia cardíaca</Text>
            <InputGroup>
              <Input
                value={values.heartRate}
                onChange={handleChange}
                onBlur={handleBlur}
                name="heartRate"
                type="number"
                id="heartRate"
                size="large"
                autoComplete='off'
                style={{ width: '50%' }}
                suffix="LPM"
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Tensión Arterial</Text>
            <InputGroup>
              <Input
                value={values.systolic}
                onChange={handleChange}
                onBlur={handleBlur}
                name="systolic"
                id="systolic"
                type="number"
                size="large"
                style={{ width: '35%' }}
                autoComplete='off'
              />
              <Input
                value={values.diastolic}
                onChange={handleChange}
                onBlur={handleBlur}
                name="diastolic"
                id="diastolic"
                type="number"
                size="large"
                style={{ width: '40%' }}
                autoComplete='off'
                suffix="mm/hg"
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Peso</Text>
            <InputGroup>
              <Input
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                name="weight"
                id="weight"
                type="number"
                size="large"
                autoComplete='off'
                style={{ width: '50%' }}
                suffix="Kg"
              />
            </InputGroup>
          </div>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            block={isSubmitting}
            loading={isSubmitting}
          >
            Guardar
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default VitalSignForm;
