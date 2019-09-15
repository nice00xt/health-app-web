import React, { Fragment } from 'react';
import { map } from 'lodash';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
const questions = [
  { text: 'Siente fatiga, palpitaciones o ahogo con cualquier actividad fisica?' },
  { text: 'Tiene hinchazon de las piernas?' },
  { text: 'Siente fatiga, palpitaciones o ahogo estando sentado?' },
  { text: 'Ha perdido la conciencia?' },
  { text: 'Siente dolor en el pecho?' },
  { text: 'Se siente triste, deprimido o deseperanzado?' },
  { text: 'Ha perdido el interés o el placer en su vida?' },
]

export const CheckValoration = () => {
  const onCheck = () => {
    console.log('tetst')
  }

  const renderQuestions = (questions) => {
    return map(questions, ({ text }, idx) => {
      return (
        <div className="form-group" key={idx}>
          <Checkbox onChange={() => onCheck()}>{ text }</Checkbox>
        </div>
      )
    })
  }

  return (
    <Fragment>
      <div className='header'>
        <div className="fade-in">
          <PageHeader
            onBack={() => window.history.back()}
            title="Auto Valoración"
          />
        </div>
      </div>
      <Content className="fade-in">
        <Row>
          <Col span={24}>
            <form>
              <div className='section-header'>
                <Text >Como te sientes hoy?</Text>
              </div>
              <div className='section ft'>
                { renderQuestions(questions) }
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

const Questions = gql`
  query {
    Questions {
      id
      question
      checked
    }
  }
`

export default graphql(Questions)(CheckValoration);