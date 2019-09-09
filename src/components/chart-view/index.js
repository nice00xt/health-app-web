import React, { Component, Fragment } from 'react';
import { Link } from '@reach/router';
import {
  Row,
  Col,
  Layout,
  PageHeader,
  List,
  Typography,
  Icon
} from 'antd';
const { Content } = Layout;

const data = [
  { icon: 'schedule', text: 'Autovaloración', uri: '/chart-detail' },
  { icon: 'fund', text: 'Signos Vitales', uri: '/' },
  { icon: 'reconciliation', text: 'Depresión', uri: '/' },
];

export class ChartView extends Component {
  render () {
    const iconStyles = {
      fontSize: '25px'
    }
    return (
      <Fragment>
        <div className='header'>
          <div className="fade-in">
            <PageHeader
              onBack={() => window.history.back()}
              title="Graficos"
            />
          </div>
        </div>
        <Content className="fade-in">
          <Row>
            <Col span={24}>
              <div className='section'>
              <List
                header={<div>Lista de graficos</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Link to={item.uri}>
                      <div className='list-item'>
                        <Icon type={item.icon} style={iconStyles} theme="twoTone" twoToneColor="#d6d6d6"/>
                        <Typography.Text mark></Typography.Text> {item.text}
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
              </div>
            </Col>
          </Row>
        </Content>
      </Fragment>
    )
  }
}

export default ChartView;