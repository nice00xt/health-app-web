import React, { Fragment } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { map, filter, orderBy } from 'lodash';
import {
  Spin,
} from 'antd';

export const LineChart = ({ fetchData, title, type, backgroundColor, currentDate, measure }) => {
  const { loading, data } = useSubscription(fetchData);
  const { date } = currentDate;

  const renderGraph = (data) => {
    const formated = map(data.vitalsigns, (d) => {
      const { id, created_at, heart_rate, weight } = d;
      return {
        id,
        heart_rate,
        weight,
        day: parseInt(moment(created_at).format('DD')),
        date: moment(created_at).format('MMMM - YYYY')
      }
    });

    const filteredList = filter(formated, { date });
    const orderList = orderBy(filteredList, ['day'], ['asc']);
    const dayList = map(orderList, (d) => d.day);
    const dataList = map(orderList, (d) => d[type]);

    const options = {
      legend: {
        labels: {
          fontSize: 12
        },
        display: false,
        position: 'bottom'
      },
      tooltips: {
        bodyFontSize: 16,
        footerFontStyle: 'bold',
        callbacks: {
          title: (tooltipItem) => {
            return `Dia ${tooltipItem[0].label} ${currentDate.date}`

          },
          label: (tooltipItem) => {
            return `${tooltipItem.value} ${measure}`
          }
        }
      }
    }

    const mock = {
      labels: dayList,
      datasets: [
        {
          data: dataList,
          label: title,
          backgroundColor,
          fill: false,
          spanGaps: false,
          borderColor: backgroundColor,
          borderWidth: 3,
          lineTension: 0
        }
      ]
    }

    return (
      <div className='chart-box'>
        <span className="chart-box__title">{title}: { currentDate.date }</span>
        <Line
          data={mock}
          // width={size}
          height={80}
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
          { renderGraph(data) }
        </div>)}
    </Fragment>
  )
}

export default LineChart;