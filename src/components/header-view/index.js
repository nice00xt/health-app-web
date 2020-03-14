import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Layout,
  PageHeader,
} from 'antd';
const { Content } = Layout;

export const HeaderView = ({
  children,
  headerTitle,
}) => {
  return (
    <Fragment>
      <div className='header'>
        <div className="fade-in">
          <PageHeader
            onBack={() => window.history.back()}
            title={headerTitle}
          />
        </div>
      </div>
      <Content className="fade-in">
        <Row>
          <Col span={24}>
            { children }
          </Col>
        </Row>
      </Content>
    </Fragment>
  )
}

export default HeaderView;