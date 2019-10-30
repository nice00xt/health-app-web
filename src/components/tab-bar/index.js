import React from 'react';
import { Link } from '@reach/router';
import { map } from 'lodash';
import {
  Row,
  Col,
  Icon,
} from 'antd';

const urlRoutes = [
  { path: '/', icon: 'home' },
  { path: '/check-valoration', icon: 'schedule' },
  { path: '/vital-signs', icon: 'fund' },
  { path: '/', icon: 'reconciliation' }
]

const renderButton = () => {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "tab-bar__link active-tab" } : null
  }

  return map(urlRoutes, ({ path, icon }, idx) => {
    const iconStyles = { fontSize: '25px' }
    const homeIcon = icon === "home";
    return (
      <Col span={6} key={idx}>
        <Link
          className={`tab-bar__link${homeIcon ? ' icon-home': ''}`}
          to={path}
          getProps={isActive}
        >
          <div className="tab-bar__button">
            <Icon
            type={icon}
            style={iconStyles}
            theme="twoTone"
            twoToneColor="#f75476"/>
          </div>
        </Link>
      </Col>
    )
  })
}

export const TabBar = () => {
  return (
    <div className="tab-bar fade-in--top">
      <Row gutter={8}>
        { renderButton() }
      </Row>
    </div>
  )
}

export default TabBar;