import { createBrowserRouter } from 'react-router-dom';
import HomeScreen from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
]);

export default router;
