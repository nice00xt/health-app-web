import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Button
} from 'antd';

export class TabBar extends Component {
  render () {
    const iconStyles = {
      fontSize: '25px'
    }

    return (
      <div className="tab-bar fade-in--top">
        <Row gutter={8}>
          <Col span={6}>
            <Button>
              <div className="tab-bar__button">
                <Icon type="idcard" style={iconStyles} theme="twoTone" twoToneColor="#f75275"/>
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button>
              <div className="tab-bar__button">
                <Icon type="fund" style={iconStyles} theme="twoTone" twoToneColor="#d6d6d6"/>
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button>
              <div className="tab-bar__button">
                <Icon type="medicine-box" style={iconStyles} theme="twoTone" twoToneColor="#d6d6d6"/>
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button>
              <div className="tab-bar__button">
                <Icon type="reconciliation" style={iconStyles} theme="twoTone" twoToneColor="#d6d6d6"/>
              </div>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TabBar;