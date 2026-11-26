import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LocaleProvider } from '../i18n/LocaleProvider';
import ErrorPage from '../pages/error';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import RegisterCodePage from '../pages/register/code';
import RegisterSetupPage from '../pages/register/setup';
import WelcomePage from '../pages/welcome';
import { localeLoader } from './localeLoader';
import { requireAuth } from './requireAuth';

const router = createBrowserRouter([
  { path: '/', loader: localeLoader },
  {
    path: '/:locale',
    loader: localeLoader,
    element: <LocaleProvider />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'register/code', element: <RegisterCodePage /> },
      { path: 'register/setup', element: <RegisterSetupPage /> },
      {
        loader: requireAuth,
        children: [
          { index: true, element: <App /> },
          { path: 'welcome', element: <WelcomePage /> },
        ],
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

export default router;
