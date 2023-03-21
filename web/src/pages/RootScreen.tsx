import React, { useCallback, useState } from 'react';
import {
  InboxOutlined,
  HomeOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const ScreenInfo: Record<string, { key: string; name: string; path: string }> =
  {
    Home: {
      key: 'Home',
      name: 'Home',
      path: '/',
    },
    Detection: {
      key: 'Detection',
      name: 'Detection',
      path: '/detect',
    },
    Dataset: {
      key: 'Dataset',
      name: 'Dataset',
      path: '',
    },
    DatasetInformation: {
      key: 'DatasetInformation',
      name: 'Information',
      path: '/dataset/info',
    },
    DatasetWordFrequency: {
      key: 'DatasetWordFrequency',
      name: 'Word Frequency',
      path: '/dataset/word-frequency',
    },
  };

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: ScreenInfo.Home.key,
    icon: <HomeOutlined />,
    label: ScreenInfo.Home.name,
  },
  {
    key: ScreenInfo.Detection.key,
    icon: <InboxOutlined />,
    label: ScreenInfo.Detection.name,
  },
  {
    key: ScreenInfo.Dataset.key,
    icon: <FileTextOutlined />,
    label: ScreenInfo.Dataset.name,
    children: [
      {
        key: ScreenInfo.DatasetInformation.key,
        icon: <InfoCircleOutlined />,
        label: ScreenInfo.DatasetInformation.name,
      },
      {
        key: ScreenInfo.DatasetWordFrequency.key,
        icon: <BarChartOutlined />,
        label: ScreenInfo.DatasetWordFrequency.name,
      },
    ],
  },
];

const RootScreen: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMenuItemClick = useCallback(({ key }: any) => {
    const screenInfo = ScreenInfo[key];
    if (!screenInfo) return;

    navigate(screenInfo.path);
  }, []);

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
          onClick={onMenuItemClick}
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
