import React, { Component, Fragment } from 'react';
import Logo from '../../images/logo.png';
import {
  Row,
  Col,
  Layout,
  PageHeader,
  Icon,
  Button
} from 'antd';
const { Content } = Layout;

export class Home extends Component {
  render () {
    const iconStyles = {
      fontSize: '40px'
    }
    const options =[
      { icon: 'schedule', title: 'Auto valoración', uri: '/' },
      { icon: 'fund', title: 'Signos vitales', uri: '/' },
      { icon: 'medicine-box', title: 'Medicamentos', uri: '/' },
      { icon: 'reconciliation', title: 'Salud educacional', uri: '/' },
      { icon: 'pie-chart', title: 'Graficos', uri: '/' },
      { icon: 'idcard', title: 'Perfil', uri: '/' },
    ]

    return (
      <Fragment>
        <div className='header'>
          <img className="logo" src={Logo} alt=''/>
        </div>
        <Content>
          <Row>
            { options.map(({ icon, title, uri }) => {
              return (
              <Col span={12}>
                <div className='main-box fade-in--top'>
                  <Button>
                    <div className='main-box__icon'>
                      <Icon type={icon} style={iconStyles} theme="twoTone" twoToneColor="#f75275"/>
                    </div>
                    <span className="main-box__title">{ title }</span>
                  </Button>
                </div>
              </Col>
              )
            })}
          </Row>
        </Content>
      </Fragment>
    )
  }
}

export default Home