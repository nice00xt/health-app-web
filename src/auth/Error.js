import React from 'react';
import { Result, Button } from 'antd';
import { navigate } from '@reach/router';

const Error = () => {
  const volver = () => {
    navigate('/');
  };
  return (
    <Result
      subTitle="Lo siento ha ocurrido un error"
      extra={
        <Button onClick={() => volver()} type="primary">
          Volver
        </Button>
      }
    />
  );
};
export default Error;
