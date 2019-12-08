import React from 'react';
import { useFormik } from 'formik';
import { compose, withState, withHandlers } from 'recompose';
// import { Link, navigate } from '@reach/router';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation } from '@apollo/react-hooks';
import { ADDvaloration } from '../../queries/valorations';
import { Button, message } from 'antd';
import HeaderView from '../../components/header-view';
import Question from './Question';

const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => () => setStep(step + 1),
    backStep: ({ setStep, step }) => () => setStep(step - 1)
  })
);

const success = () => {
  message.success('Los datos han sido guardados', 2.5);
};

export const CheckValoration = ({ step, nextStep, backStep }) => {
  const [hadnleAddValorations] = useMutation(ADDvaloration);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values, 'values');
      // hadnleAddValorations({
      //   variables: { ...values }
      // }).then(() => {
      //   setSubmitting(false)
      //   success()
      // })
    }
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    isSubmitting
  } = formik;

  return (
    <HeaderView
      headerTitle="Auto Valoración"
      contentTitle="Como te sientes hoy?"
    >
      <form onSubmit={handleSubmit}>
        <div className="section ft">

          {{
            1: (
              <Question
                text={questions[0].text}
                value={values.res1}
                name={questions[0].name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                nextStep={nextStep}
              />
            ),
            2: (
              <Question
                text={questions[1].text}
                value={values.res2}
                name={questions[1].name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                nextStep={nextStep}
              />
            )
          }[step] || <span />}
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
    </HeaderView>
  );
};

export default enhance(CheckValoration);
