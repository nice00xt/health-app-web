import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Layout,
  PageHeader
} from 'antd';
const { Content } = Layout;

export class CheckValoration extends Component {
  render () {
    return (
      <Fragment>
        <PageHeader title="Auto Valoración" />
        <Content>
          <Row>
            <Col span={24}>
              <form>
                  <span>hola</span>
              </form>
            </Col>
          </Row>
        </Content>
      </Fragment>
    )
  }
}

export default CheckValoration;