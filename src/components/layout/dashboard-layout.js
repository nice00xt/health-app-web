import React from 'react';
import './styles.scss';
import { Link } from '@reach/router';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo-dashaboard">
              Cardiapp
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Link to='/admin'>
                  <Icon type="user" />
                  <span className="nav-text">Usuarios</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content>
              <div className="inner">
                { children }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    </div>
  )
}

export default DashboardLayout;