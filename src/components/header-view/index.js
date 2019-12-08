import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Layout,
  PageHeader,
  Typography,
} from 'antd';
const { Content } = Layout;
const { Text } = Typography;

export const HeaderView = ({
  children,
  headerTitle,
  contentTitle
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
            <div className='section-header'>
              <Text>{contentTitle}</Text>
            </div>
            { children }
          </Col>
        </Row>
      </Content>
    </Fragment>
  )
}

export default HeaderView;