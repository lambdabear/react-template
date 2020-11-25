/*
 * File: index.js
 * Project: template
 * Description:
 * Created By: Tao.Hu 2019-09-10
 * -----
 * Last Modified: 2019-09-10 05:19:42 pm
 * Modified By: Tao.Hu
 * -----
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Layout,
  Menu,
  Icon,
  // Button,
} from 'antd';

import './index.less';

const { Header, Content, Sider } = Layout;

// const menuButtonClass = {
//   lineHeight: '64px',
//   height: '64px',
//   fontSize: '1em',
//   fontWeight: '500',
//   float: 'right',
// };

function onClick({ key } = {}, history) {
  history.push(`/${key}`);
}

function BaseHeader(props) {
  const [collapsed, setCollapsed] = useState(true);
  const { content } = props;
  const history = useHistory();

  return (
    <Layout>
      <Header className="header">
        <span className="logo">
          LoRa-NB
        </span>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => setCollapsed(!collapsed)}
        />
        {/* <span>
          <Button
            type="primary"
            icon="logout"
            className="menu-button"
            style={menuButtonClass}
            // onClick={this.onLogout}
          >
            退出
          </Button>
        </span> */}
      </Header>
      <Layout>
        <Sider
          theme="light"
          breakpoint="md"
          collapsedWidth={0}
          trigger={null}
          collapsible
          // collapsed={collapsed}
          // onCollapse={() => setCollapsed(!collapsed)}
          collapsed={true}
        >
          <Menu defaultSelectedKeys={['home']} onClick={(e) => onClick(e, history)}>
            <Menu.Item key="home">
              <Icon type="dashboard" />
              基站信息
            </Menu.Item>
            <Menu.Item key="history">
              <Icon type="history" />
              历史数据
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

BaseHeader.propTypes = {
  content: PropTypes.element.isRequired,
};

export default BaseHeader;
