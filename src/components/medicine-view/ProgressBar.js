import React, { useState } from 'react';
import { filter } from 'lodash';
import { Progress, Spin, Button, message } from 'antd';

export const ProgressBar = ({ data, loading, addStatus, medicationDefault }) => {
  const [ isLoading, setLoading ] = useState(false);
  const taken = filter(data, { taken: true });
  const calcTotal = (taken.length / data.length) * 100;
  const percent = calcTotal.toFixed(0);

  const handleSaveStatus = () => {
    setLoading(true);
    const status = calcTotal === 100 ? 'completed' : 'not-completed';

    addStatus({
      variables: {
        status,
        percent
      }
    }).then(() => {
      setLoading(false);
      medicationDefault({
        variables: { taken: false }
      });
      message.success('Los datos han sido guardados', 2.5);
    })
  }

  return (
    <Spin spinning={loading}>
      <div style={{ marginTop: 30 }}>
        <Progress percent={parseInt(percent)} />
      </div>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%', marginTop: 20 }}
        loading={isLoading}
        onClick={() => handleSaveStatus()}
      >
        Guardar
      </Button>
    </Spin>
  )
}

export default ProgressBar;
