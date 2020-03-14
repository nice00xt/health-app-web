import React, { useState } from 'react';
import { useFormik } from 'formik';
import { compose, withState, withHandlers } from 'recompose';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation } from '@apollo/react-hooks';
import { ADDvaloration } from '../../queries/valorations';
import { navigate } from '@reach/router';
import { Button, Modal, Typography } from 'antd';
import Question from '../../components/question';
import { SuccessMessage, MessageAlert, MessageWarning } from './result';

const { Text } = Typography;
const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => () => setStep(step + 1),
    backStep: ({ setStep, step }) => () => setStep(step - 1)
  })
);

export const CheckValorationForm = ({ step, nextStep, backStep }) => {
  const [hadnleAddValorations] = useMutation(ADDvaloration);
  const [visible, openModal] = useState(false);
  const [resultMessage, setResult] = useState({
    success: false,
    warning: false,
    alert: false,
    loading: false
  });

  const handleRedirect = (result) => {
    setResult({ loading: true });
    if (result >= 6) {
      hadnleAddValorations({
        variables: { status: 3 }
      }).then(() => {
        setResult({ warning: true, loading: false });
      })
    } else if (result === 0) {
      hadnleAddValorations({
        variables: { status: 1 }
      }).then(() => {
        setResult({ success: true, loading: false });
      })
    } else if (result >= 1) {
      hadnleAddValorations({
        variables: { status: 2 }
      }).then(() => {
        setResult({ alert: true, loading: false });
      })
    }
    openModal(true);
  };

  const closeModal = () => {
    openModal(false);
    navigate('/');
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const result = Object.values(values).filter(item => item === true).length;
      handleRedirect(result);
      setSubmitting(false);
    }
  });
  const { handleSubmit, isSubmitting, setFieldValue } = formik;
  const { success, warning, alert } = resultMessage;
  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => closeModal()}
        footer={null}
      >
        { success && <SuccessMessage /> }
        { warning && <MessageWarning /> }
        { alert && <MessageAlert /> }
      </Modal>
      <div className='section-header'>
        <Text>Como te sientes hoy?</Text>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="section ft">
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
    </>
  );
};

export default enhance(CheckValorationForm);
