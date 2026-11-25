import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import { requireAuth } from './requireAuth';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    loader: requireAuth,
    children: [{ path: '/', element: <App /> }],
  },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
