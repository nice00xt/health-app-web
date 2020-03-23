import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Layout,
  Icon
} from 'antd';

export const HeaderView = ({
  children,
  headerTitle,
}) => {
  return (
    <Fragment>
      <div className='header fade-in'>
        <div className="header__back" onClick={() => window.history.back()}>
          <Icon type='arrow-left' style={{ color: '#f75476', fontSize: 18 }}/>
        </div>
        <span className="header__title">{headerTitle}</span>
      </div>
        <Row>
          <Col span={24}>
            { children }
          </Col>
        </Row>
    </Fragment>
  )
}

export default HeaderView;