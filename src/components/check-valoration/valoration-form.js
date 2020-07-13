import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Spin } from 'antd';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { compose, withState, withHandlers } from 'recompose';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { ADDvaloration } from '../../queries/valorations';
import { updateStatus, createStatus } from '../../queries/status';
import Question from '../../components/question';
import { SuccessMessage, MessageAlert, MessageWarning } from './result';

const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => () => setStep(step + 1),
    backStep: ({ setStep, step }) => () => setStep(step - 1)
  })
);

export const CheckValorationForm = ({ step, nextStep, backStep, fetchData }) => {
  const { loading, data } = useSubscription(fetchData);
  const [hadnleAddValorations] = useMutation(ADDvaloration);
  const [onUpdateStatus] = useMutation(updateStatus)
  const [onCreateStatus] = useMutation(createStatus)
  const currentDate = moment().format('MMMM/DD/YYYY');

  // useEffect(() => {
  //   if (isEmpty(data.status)) {
  //     hadnleAddValorations({
  //       variables: { status: 0 }
  //     })
  //   }
  // }, []);

  const handleSetStatus = (name, description) => {
    const variables = {
      updated: currentDate,
      name,
      description,
    }

    if (isEmpty(data.status)) {
      onCreateStatus({ variables })
    } else {
      onUpdateStatus({
        variables: {
          ...variables,
          id: data.status.id
        }
      })
    }
  }

  const handleRedirect = (result, setSubmitting) => {
    if (result >= 6) {
      hadnleAddValorations({
        variables: { status: 3 }
      }).then(() => {
        setSubmitting(false);
        handleSetStatus('3', 'El usuario Usuario 1 necesita atención medica');
      })
    } else if (result === 0) {
      hadnleAddValorations({
        variables: { status: 1 }
      }).then(() => {
        setSubmitting(false);
        handleSetStatus('1', '');
      })
    } else if (result >= 1) {
      hadnleAddValorations({
        variables: { status: 2 }
      }).then(() => {
        setSubmitting(false);
          handleSetStatus('2', '');
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
  const { handleSubmit, isSubmitting, setFieldValue } = formik;


  const renderMessage = (currentStatus) => {
    const status = currentStatus[1].name;
    if (status === '2') {
      return <MessageAlert />
    } else if (status === '1') {
      return <SuccessMessage />
    } else if (status === '3') {
      return <MessageWarning />
    }
  }

  if (loading) {
    return <Spin className="load" tip="cargando..." />
  }

  return (
    <>
      {/* { data.status[0].updated === currentDate ? (
        <section className='section fade-in--top'>
          <span>status</span>
        </section>
      ) : ( */}
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
              5: (
                <Question
                  text={questions[4].text}
                  name={questions[4].name}
                  nextStep={nextStep}
                  backStep={backStep}
                  setFieldValue={setFieldValue}
                />
              ),
              6: (
                <Question
                  text={questions[5].text}
                  name={questions[5].name}
                  nextStep={nextStep}
                  backStep={backStep}
                  setFieldValue={setFieldValue}
                />
              ),
              7: (
                <Question
                  text={questions[6].text}
                  name={questions[6].name}
                  nextStep={nextStep}
                  backStep={backStep}
                  setFieldValue={setFieldValue}
                />
              )
            }[step] || (
              <Button
                type="primary"
                htmlType="submit"
                block={isSubmitting}
                loading={isSubmitting}
              >
                Terminar
              </Button>
            )}
            <br />
          </div>
        </form>
      {/* )} */}
    </>
  );
};

export default enhance(CheckValorationForm);
