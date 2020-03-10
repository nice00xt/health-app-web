import React from 'react';
import { navigate } from '@reach/router';
import { Result, Button } from 'antd';

export const SuccessMessage = () => {
  return (
    <Result
      status="success"
      title="Ánimo!"
      subTitle="Continua los hábitos de estilo de vida saludable en curso"
    />
  )
}

export const MessageAlert = () => {
  return (
    <Result
      title="Consulte a su clínica de falla cardiaca"
      subTitle="---"
    />
  )
}

export const MessageWarning = () => {
  return (
    <Result
      status="warning"
      title="Sugerimos hacerte unas preguntas mas"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => navigate('depression')}
        >
          Llenar encuesta de depresión
        </Button>,
      ]}
    />
  )
}