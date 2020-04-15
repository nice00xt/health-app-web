import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { useFormik } from 'formik';
import moment from 'moment';
import { compose, withState, withHandlers } from 'recompose';
import { Button, Layout, Spin } from 'antd';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { ADDdepression } from '../../queries/depression';
import { updateStatus, showStatus } from '../../queries/status';
import HeaderView from '../../components/header-view';
import Question from '../../components/question';
import { SuccessMessage, MessageAlert } from './result';
const { Content } = Layout;


const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => () => setStep(step + 1),
    backStep: ({ setStep, step }) => () => setStep(step - 1)
  })
);

export const Depression = ({ step, nextStep, backStep }) => {
  const { loading, data } = useSubscription(showStatus);
  const [hadnleADDdepression] = useMutation(ADDdepression);
  const [onUpdateStatus] = useMutation(updateStatus)
  const currentDate = moment().format('MMMM/DD/YYYY');

  const handleRedirect = (result, setSubmitting) => {
    if (result >= 1) {
      navigate('second-part');
    } else if (result === 0) {
      hadnleADDdepression({
        variables: { status: 1 }
      }).then(() => {
        setSubmitting(false);
        onUpdateStatus({
          variables: {
            updated: currentDate,
            name: '1',
            id: 2,
            description: 'El usuario Usuario 1 necesita atención medica'}
          })
      })
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const result = Object.values(values).filter(item => item === true).length;
      handleRedirect(result, setSubmitting);
    }
  });

  const renderMessage = (statusMessage) => {
    if (statusMessage === '2') {
      return <MessageAlert />
    } else if (statusMessage === '1') {
      return <SuccessMessage />
    } else if (statusMessage === '3') {
      return <span></span>
    }
  }


  const {
    handleSubmit,
    isSubmitting,
    setFieldValue
  } = formik;

  return (
    <HeaderView
      headerTitle="Depresión"
      contentTitle="Como te sientes hoy?"
    >
      { loading ? <Spin className="load" tip="cargando..." /> : (
        <Content>
          { data.status[0].updated === currentDate ? (
            <section className="section fade-in--top">

            </section>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="section ft fade-in--top">
                {{
                  1: (
                    <Question
                      text={questions[0].text}
                      name={questions[0].name}
                      nextStep={nextStep}
                      backStep={backStep}
                      setFieldValue={setFieldValue}
                      first
                    />
                  ),
                  2: (
                    <Question
                      text={questions[1].text}
                      name={questions[1].name}
                      nextStep={nextStep}
                      backStep={backStep}
                      setFieldValue={setFieldValue}
                    />
                  ),
                  3: (
                    <Question
                      text={questions[2].text}
                      name={questions[2].name}
                      nextStep={nextStep}
                      backStep={backStep}
                      setFieldValue={setFieldValue}
                    />
                  ),
                  4: (
                    <Question
                      text={questions[3].text}
                      name={questions[3].name}
                      nextStep={nextStep}
                      backStep={backStep}
                      setFieldValue={setFieldValue}
                    />
                  ),
                }[step] || (
                  <Button
                    type="primary"
                    htmlType="submit"
                    block={isSubmitting}
                    loading={isSubmitting}
                  >
                    Seguiente
                  </Button>
                )}
                <br />
              </div>
            </form>
          )}
        </Content>
      ) }
    </HeaderView>
  );
};

export default enhance(Depression);
