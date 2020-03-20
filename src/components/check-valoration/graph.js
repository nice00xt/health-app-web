import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { map, filter } from 'lodash';
import {
  Spin,
} from 'antd';

export const GraphView = ({ loading, data }) => {
  const renderGraph = (arr) => {
    const formated = map(arr, (d) => {
      const { id, status, created_at } = d;
      return {
        id,
        status,
        date: moment(created_at).format('MMMM')
      }
    })
    const good = filter(formated, { status: 1, date: 'marzo' });
    const medium = filter(formated, { status: 2, date: 'marzo' });
    const bad = filter(formated, { status: 3, date: 'marzo' });
    // console.log(filterList.length)

    const percent = (text, n) => {
      const total = good.length + medium.length + bad.length;
      const percent = (n / total) * 100;

      return `${text}: ${percent.toFixed(1)}%`;
    }
    const options = {
      legend: {
        labels: {
          fontSize: 18
        },
        position: 'bottom'
      },
      tooltips: {
        enabled: false,
        bodyFontSize: 20,
        footerFontStyle: 'bold'
      }
    }
    const mock = {
      labels: [
        percent('Compensado', good.length),
        percent('Afección Piscosocial', medium.length),
        percent('Descompensado', bad.length)
      ],
      datasets: [{
          data: [good.length, medium.length, bad.length],
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
        <span className="chart-box__title">resultados valoración: { moment([]).format('MMMM - YYYY') }</span>
        <Doughnut
          data={mock}
          width={500}
          height={500}
          options={options}
        />
        <br />
      </div>
    )
  }

  return (
    <Fragment>
      <div className='section'>
      { loading ? <Spin tip="cargando..." />
      : renderGraph(data.valorations)}
      </div>
    </Fragment>
  )
}

export default GraphView;