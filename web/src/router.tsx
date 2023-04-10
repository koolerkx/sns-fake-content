import { createBrowserRouter } from 'react-router-dom';
import RootScreen from './pages/RootScreen';
import HomeScreen from './pages/HomeScreen';
import DetectionScreen from './pages/DetectionScreen';
import DatasetInfoScreen from './pages/DatasetInfoScreen';
import DatasetTweetsScreen from './pages/DatasetTweetsScreen';
import DatasetUsersScreen from './pages/DatasetUsersScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootScreen />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
      {
        path: '/detect',
        element: <DetectionScreen />,
      },
      {
        path: '/dataset/info',
        element: <DatasetInfoScreen />,
      },
      {
        path: '/dataset/tweets',
        element: <DatasetTweetsScreen />,
      },
      {
        path: '/dataset/users',
        element: <DatasetUsersScreen />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL
});

export default router;
