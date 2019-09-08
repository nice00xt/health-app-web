import React, { Component } from 'react';
import {
  Layout
} from 'antd';
import TabBar from '../tab-bar';

export class LayoutContent extends Component {
  render () {
    const { children } = this.props;
    return (
      <Layout>
        { children }
        <TabBar />
      </Layout>
    )
  }
}

export default LayoutContent;