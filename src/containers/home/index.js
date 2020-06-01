import React, { Fragment } from 'react';
import Logo from '../../images/logo.png';
import { Link } from '@reach/router';
import { map } from 'lodash';
import {
  Row,
  Col,
  Layout,
  Icon,
  Button
} from 'antd';
const { Content } = Layout;

const iconStyles = {
  color: '#f75476',
  fontSize: 40
}
const options =[
  { icon: 'schedule', title: 'Auto valoración', uri: 'check-valoration' },
  { icon: 'fund', title: 'Signos vitales', uri: 'vital-signs' },
  { icon: 'reconciliation', title: 'Depresión', uri: 'depression' },
  { icon: 'medicine-box', title: 'Formula', uri: 'medicine-view' },
  { icon: 'idcard', title: 'Perfil', uri: '/' },
  { icon: 'pie-chart', title: 'Graficas', uri: 'graph-view' },
  // { icon: 'pie-chart', title: 'Graficos', uri: 'chart-view' },
]

export const Home = () => {
  return (
    <Fragment>
      <div className='header header--white'>
        <img className="logo" src={Logo} alt=''/>
      </div>
      <Content>
        <Row>
          { map(options, ({ icon, title, uri }, idx) => {
            return (
            <Col span={12} key={idx}>
              <div className='main-box fade-in--top'>
                <Link to={uri}>
                  <Button>
                    <div className='main-box__icon'>
                      <Icon type={icon} style={iconStyles} />
                    </div>
                    <span className="main-box__title">{ title }</span>
                  </Button>
                </Link>
              </div>
            </Col>
            )
          })}
        </Row>
      </Content>
    </Fragment>
  )
}

export default Home