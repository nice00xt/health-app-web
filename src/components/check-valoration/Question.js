import React from 'react';
import { Checkbox } from 'antd';

export const Question = ({ handleChange, handleBlur, text, value, name, nextStep }) => {
  const handleCheck = (ev) => {
    handleChange(ev);
    nextStep();
  }

  return (
    <div className="form-group">
      <span>{text}</span>
      <Checkbox
        checked={value}
        name={name}
        onChange={(ev) => handleCheck(ev)}
        onBlur={handleBlur}
      >
        <span>SI</span>
      </Checkbox>
    </div>
  );
};

export default Question;