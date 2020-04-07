import React from 'react';
import { Button, Icon } from 'antd';

export const Question = ({ setFieldValue, text, name, nextStep, backStep, first }) => {
  const handleConfirm = (res) => {
    setFieldValue(name, res);
    nextStep();
  }

  return (
    <div className="form-group">
      <div className='question fade-in--top'>
        { first || (
          <div className='question__icon' onClick={() => backStep()}>
            <Icon type='left' style={{ fontSize: 20 }} twoToneColor="#f75275"/>
            <span>Anterior</span>
          </div>
        ) }
        <span className='question__title'>{text}</span>
        <div className='question__buttons'>
          <Button
            type="primary"
            onClick={() => handleConfirm(false)}
            size='large'
            ghost
          >
            NO
          </Button>
          <Button
            type="primary"
            onClick={() => handleConfirm(true)}
            size='large'
          >
            SI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;