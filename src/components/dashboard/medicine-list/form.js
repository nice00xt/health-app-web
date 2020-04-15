import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { Button, Input, Icon, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { addMedication } from '../../../queries/medication';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  quantity: Yup.string().required('required'),
  description: Yup.string(),
});

export const FormMedication = () => {
  const [visible, showForm] = useState(false);
  const [onAddMedication] = useMutation(addMedication);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      quantity: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onAddMedication({
        variables: { ...values },
      }).then(() => {
        setSubmitting(false);
        resetForm({});
      }).catch((res) => {
        console.log(res)
      })
    }
  });
  const { handleSubmit, isSubmitting, values, handleChange, handleBlur } = formik;

  if (!visible) {
    return (
      <Button
        onClick={() => showForm(true)}
        style={{ marginBottom: 20, width: '100%' }}
        type="dashed">
        <Icon type="plus" /> Nuevo Medicamento
      </Button>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ paddingBottom: 20 }}>
        <Row gutter={20}>
          <Col span={12}>
            <div className="form-group">
              <Input
                value={values.name}
                placeholder="Nombre medicamento"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='off'
                name="name"
                type="text"
                id="name"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="form-group">
              <Input
                value={values.quantity}
                placeholder="Dosis"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='off'
                name="quantity"
                type="text"
                id="quantity"
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="form-group">
              <Input
                value={values.description}
                placeholder="Frecuencia"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='off'
                name="description"
                type="text"
                id="description"
                style={{ height: 50 }}
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block={isSubmitting}
              loading={isSubmitting}
              style={{ width: '100%', marginTop: 30}}
            >
              Agregar
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default FormMedication;