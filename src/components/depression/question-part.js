import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { useFormik } from 'formik';
import { compose, withState, withHandlers } from 'recompose';
import { Button, Modal } from 'antd';
import { questionsSecond, validationSchemaSecond, initialValuesSecond } from './validation';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { ADDdepression } from '../../queries/depression';
import { updateStatus, showStatus } from '../../queries/status';
import HeaderView from '../../components/header-view';
import Question from '../../components/question';
import { SuccessMessage, MessageAlert } from './result';

const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => () => setStep(step + 1),
    backStep: ({ setStep, step }) => () => setStep(step - 1)
  })
);

export const DepressionSecond = ({ step, nextStep, backStep }) => {
  const { loading, data } = useSubscription(showStatus);
  const [hadnleADDdepression] = useMutation(ADDdepression);
  const [visible, openModal] = useState(false);
  const [resultMessage, setResult] = useState({
    success: false,
    alert: false
  });

  const handleRedirect = (result) => {
    if (result >= 1) {
      setResult({ alert: true });
      hadnleADDdepression({
        variables: { status: 3 }
      });
    } else if (result === 0) {
      setResult({ success: true });
      hadnleADDdepression({
        variables: { status: 2 }
      });
    }
    openModal(true);
  };

  const closeModal = () => {
    openModal(false);
    navigate('/');
  }

  const formik = useFormik({
    initialValues: initialValuesSecond,
    validationSchema: validationSchemaSecond,
    onSubmit: (values, { setSubmitting }) => {
      const result = Object.values(values).filter(item => item === true).length;
      handleRedirect(result);
      setSubmitting(false);
    }
  });

  const {
    handleSubmit,
    isSubmitting,
    setFieldValue
  } = formik;
  const { success, alert } = resultMessage;
  return (
    <HeaderView
      headerTitle="Depresión"
      contentTitle="Como te sientes hoy?"
    >
    <Modal
        visible={visible}
        onCancel={() => closeModal()}
        footer={null}
      >
        { success && <SuccessMessage /> }
        { alert && <MessageAlert /> }
      </Modal>
      <form onSubmit={handleSubmit}>
        <div className="section ft fade-in--top">
          {{
            1: (
              <Question
                text={questionsSecond[0].text}
                name={questionsSecond[0].name}
                nextStep={nextStep}
                backStep={backStep}
                setFieldValue={setFieldValue}
                first
              />
            ),
            2: (
              <Question
                text={questionsSecond[1].text}
                name={questionsSecond[1].name}
                nextStep={nextStep}
                backStep={backStep}
                setFieldValue={setFieldValue}
              />
            ),
            3: (
              <Question
                text={questionsSecond[2].text}
                name={questionsSecond[2].name}
                nextStep={nextStep}
                backStep={backStep}
                setFieldValue={setFieldValue}
              />
            ),
            4: (
              <Question
                text={questionsSecond[3].text}
                name={questionsSecond[3].name}
                nextStep={nextStep}
                backStep={backStep}
                setFieldValue={setFieldValue}
              />
            ),
            5: (
              <Question
                text={questionsSecond[4].text}
                name={questionsSecond[4].name}
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
              Terminar
            </Button>
          )}
          <br />
        </div>
      </form>
    </HeaderView>
  );
};

export default enhance(DepressionSecond);
