import React, { useState } from 'react';
import {
  InboxOutlined,
  HomeOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'Home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'Detection',
    icon: <InboxOutlined />,
    label: 'Detection',
  },
  {
    key: 'Dataset',
    icon: <FileTextOutlined />,
    label: 'Dataset',
    children: [
      {
        key: 'Information',
        icon: <InfoCircleOutlined />,
        label: 'Information',
      },
      {
        key: 'Word Frequency',
        icon: <BarChartOutlined />,
        label: 'Word Frequency',
      },
    ],
  },
];

const RootScreen: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={['Home']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootScreen;
