import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import RegisterCodePage from '../pages/register/code';
import RegisterSetupPage from '../pages/register/setup';
import WelcomePage from '../pages/welcome';
import { requireAuth } from './requireAuth';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/register/code', element: <RegisterCodePage /> },
  { path: '/register/setup', element: <RegisterSetupPage /> },
  {
    loader: requireAuth,
    children: [
      { path: '/', element: <App /> },
      { path: '/welcome', element: <WelcomePage /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
