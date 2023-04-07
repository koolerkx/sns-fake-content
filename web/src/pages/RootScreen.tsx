import React, { useCallback, useState } from 'react';
import {
  InboxOutlined,
  HomeOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png';

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
  DatasetTweets: {
    key: 'DatasetTweets',
    name: 'Tweets dataset',
    path: '/dataset/tweets',
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
        key: ScreenInfo.DatasetTweets.key,
        icon: <TwitterOutlined />,
        label: ScreenInfo.DatasetTweets.name,
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
        <div style={{ margin: 16, color: 'white', display: 'flex', flexDirection: 'row', columnGap: '1rem', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <img src={logo} style={{ width: 16, filter: 'invert(1)' }} />
          <div style={{ display: collapsed ? 'none' : 'block' }}>
            <b>SNS Fake Content</b>
          </div>
        </div>
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
