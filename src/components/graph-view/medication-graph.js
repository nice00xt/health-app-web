import React, { Fragment } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { map, filter } from 'lodash';
import {
  Spin,
} from 'antd';

export const MedicationGraph = ({ fetchData, title, type, size, currentDate }) => {
  const { loading, data } = useSubscription(fetchData);
  const { date } = currentDate;

  const renderGraph = (arr) => {
    const formated = map(arr, (d) => {
      const { id, status, created_at } = d;
      return {
        id,
        status,
        date: moment(created_at).format('MMMM - YYYY')
      }
    })

    const good = filter(formated, { status: 'completed', date });
    const medium = filter(formated, { status: 'not-completed', date });

    const percent = (text, n) => {
      const total = good.length + medium.length;
      const percent = (n / total) * 100;
      const fixed = percent.toFixed(1)

      return `${text}: ${percent ? `${fixed}%` : 'Sin datos'}`;
    }

    const options = {
      legend: {
        labels: {
          fontSize: 12
        },
        position: 'bottom'
      },
      tooltips: {
        enabled: false,
        bodyFontSize: 16,
        footerFontStyle: 'bold'
      }
    }

    const mock = {
      labels: [
        percent('Aderente', good.length),
        percent('No Aderente', medium.length),
      ],
      datasets: [{
          data: [good.length, medium.length],
          backgroundColor: [
            'rgba(82, 196, 26, 0.7)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(247, 84, 118, 0.7)',
          ],
          borderColor: [
            'rgba(36, 86, 11, 0.77)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
      }]
    }

    return (
      <div className='chart-box'>
        <span className="chart-box__title">{title}: { currentDate.date }</span>
        <Doughnut
          data={mock}
          width={size}
          height={size}
          options={options}
        />
        <br />
      </div>
    )
  }

  return (
    <Fragment>
      { loading ? <Spin className="load" tip="cargando..." />
      : (<div className="fade-in-image">
          { renderGraph(data[type]) }
        </div>)}
    </Fragment>
  )
}

export default MedicationGraph;