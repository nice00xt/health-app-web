import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { useFormik } from 'formik';
import { compose, withState, withHandlers } from 'recompose';
import { Button, Modal } from 'antd';
import { questions, validationSchema, initialValues } from './validation';
import { useMutation } from '@apollo/react-hooks';
import { ADDdepression } from '../../queries/depression';
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

export const Depression = ({ step, nextStep, backStep }) => {
  const [hadnleADDdepression] = useMutation(ADDdepression);
  const [visible, openModal] = useState(false);
  const [resultMessage, setResult] = useState({
    success: false,
    alert: false
  });

  const handleRedirect = (result) => {
    if (result >= 1) {
      navigate('second-part');
    } else if (result === 0) {
      setResult({ success: true });
      openModal(true);
      hadnleADDdepression({
        variables: { status: 1 }
      });
    }
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
    </HeaderView>
  );
};

export default enhance(Depression);
