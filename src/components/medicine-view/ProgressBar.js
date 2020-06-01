import React from 'react';
import { filter } from 'lodash';
import { Progress, Spin } from 'antd';

export const ProgressBar = ({ data, loading }) => {
  const taken = filter(data, { taken: true });
  const calcTotal = (taken.length / data.length) * 100;
  const Percent = calcTotal.toFixed(0);

  return (
    <Spin spinning={loading}>
      <div style={{ marginTop: 30 }}>
        <Progress percent={Percent} />
      </div>
    </Spin>
  )
}

export default ProgressBar;
