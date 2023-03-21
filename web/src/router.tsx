import { createBrowserRouter } from 'react-router-dom';
import RootScreen from './pages/RootScreen';
import HomeScreen from './pages/HomeScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootScreen />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
    ],
  },
]);

export default router;
