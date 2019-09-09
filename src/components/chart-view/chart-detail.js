import React, { Component, Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Row,
  Col,
  Layout,
  PageHeader,
  List,
  Typography
} from 'antd';
const { Content } = Layout;
const data = {
  labels: ['1.', '2.', '3.', '4.', '5.', '6.'],
  datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
  }]
}

const questions = [
  { number: '1. ', text: 'Siente fatiga, palpitaciones o ahogo con cualquier actividad fisica?' },
  { number: '2. ', text: 'Tiene hinchazon de las piernas?' },
  { number: '3. ', text: 'Siente fatiga, palpitaciones o ahogo estando sentado?' },
  { number: '4. ', text: 'Ha perdido la conciencia?' },
  { number: '5. ', text: 'Siente dolor en el pecho?' },
  { number: '6. ', text: 'Se siente triste, deprimido o deseperanzado?' },
  { number: '7. ', text: 'Ha perdido el interés o el placer en su vida?' },
]

export class ChartView extends Component {
  render () {
    return (
      <Fragment>
        <div className='header'>
          <div className="fade-in">
            <PageHeader
              onBack={() => window.history.back()}
              title="Autovaloración"
            />
          </div>
        </div>
        <Content className="fade-in">
          <Row>
            <Col span={24}>
              <div className='section'>
                <div className='chart-box'>
                  <span className="chart-box__title">Septiembre - 2019</span>
                  <Doughnut data={data} />
                  <List
                    header={<div>Lista de graficos</div>}
                    bordered
                    dataSource={questions}
                    renderItem={item => (
                      <List.Item>
                        <div className='list-item'>
                          <Typography.Text mark></Typography.Text> {item.number}
                          <Typography.Text mark></Typography.Text> {item.text}
                        </div>
                      </List.Item>
                    )}
                  />
                  <br />
                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Fragment>
    )
  }
}

export default ChartView;