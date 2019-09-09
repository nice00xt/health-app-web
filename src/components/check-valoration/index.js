import React, { Component, Fragment } from 'react';
import { map } from 'lodash';

import {
  Row,
  Col,
  Layout,
  PageHeader,
  Typography,
  Checkbox,
  Button
} from 'antd';
const { Content } = Layout;
const { Text } = Typography;

export class CheckValoration extends Component {
  onCheck = () => {
    console.log('tetst')
  }

  renderQuestions = (questions) => {
    return map(questions, ({ text }, idx) => {
      return (
        <div className="form-group" key={idx}>
          <Checkbox onChange={this.onChange}>{ text }</Checkbox>
        </div>
      )
    })
  }
  render () {
    const questions = [
      { text: 'Siente fatiga, palpitaciones o ahogo con cualquier actividad fisica?' },
      { text: 'Tiene hinchazon de las piernas?' },
      { text: 'Siente fatiga, palpitaciones o ahogo estando sentado?' },
      { text: 'Ha perdido la conciencia?' },
      { text: 'Siente dolor en el pecho?' },
      { text: 'Se siente triste, deprimido o deseperanzado?' },
      { text: 'Ha perdido el interés o el placer en su vida?' },
    ]
    return (
      <Fragment>
        <div className="fade-in">
          <PageHeader
            onBack={() => window.history.back()}
            title="Auto Valoración"
          />
        </div>
        <Content className="fade-in--top">
          <Row>
            <Col span={24}>
              <form>
                <div className='section-header'>
                  <Text >Como te sientes hoy?</Text>
                </div>
                <div className='section ft'>
                  { this.renderQuestions(questions) }
                  <br />
                </div>
                  <Button type="primary" block>Guardar</Button>
              </form>
            </Col>
          </Row>
        </Content>
      </Fragment>
    )
  }
}

export default CheckValoration;