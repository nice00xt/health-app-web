import React from 'react';
import { useFormik } from 'formik';
import { Button, Spin } from 'antd';
import moment from 'moment';
import { compose, withState, withHandlers } from 'recompose';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { ADDvaloration } from '../../queries/valorations';
import { updateStatus } from '../../queries/status';
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
  const currentDate = moment().format('MMMM/DD/YYYY');

  const handleRedirect = (result, setSubmitting) => {
    if (result >= 6) {
      hadnleAddValorations({
        variables: { status: 3 }
      }).then(() => {
        setSubmitting(false);
        onUpdateStatus({
          variables: {
            updated: currentDate,
            name: '3',
            id: 1,
            description: 'El usuario Usuario 1 necesita atención medica'}
          })
      })
    } else if (result === 0) {
      hadnleAddValorations({
        variables: { status: 1 }
      }).then(() => {
        setSubmitting(false);
        onUpdateStatus({
          variables: {
            updated: currentDate,
            name: '1',
            id: 1,
            description: ''}
          })
      })
    } else if (result >= 1) {
      hadnleAddValorations({
        variables: { status: 2 }
      }).then(() => {
        setSubmitting(false);
        onUpdateStatus({
          variables: {
            updated: currentDate,
            name: '2',
            id: 1,
            description: ''}
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
  const { handleSubmit, isSubmitting, setFieldValue } = formik;


  const renderMessage = () => {
    const status = data.status[1].name;
    const statusDepression = data.status[0].name;

    console.log(data.status, 'data.status 0')
    if (status === '2') {
      return <MessageAlert status={statusDepression} />
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
      { data.status[1].updated === currentDate ? (
        <section className='section fade-in--top'>
          { renderMessage() }
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
      )}
    </>
  );
};

export default enhance(CheckValorationForm);
