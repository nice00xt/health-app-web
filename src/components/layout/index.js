import React from 'react';
import {
  Layout
} from 'antd';
import TabBar from '../tab-bar';

export const LayoutContent = ({ children }) =>{
  return (
    <Layout>
      { children }
      {/* <TabBar /> */}
    </Layout>
  )
}

export default LayoutContent;