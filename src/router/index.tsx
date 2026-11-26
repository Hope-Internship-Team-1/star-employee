import { createBrowserRouter, Navigate } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout';
import { LocaleProvider } from '../i18n/LocaleProvider';
import CompaniesPage from '../pages/companies';
import CompanyPage from '../pages/company-detail';
import ErrorPage from '../pages/error';
import HomePage from '../pages/home';
import JobDetailPage from '../pages/job-detail';
import JobsPage from '../pages/jobs';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import RegisterCodePage from '../pages/register/code';
import RegisterSetupPage from '../pages/register/setup';
import WelcomePage from '../pages/welcome';
import { requireAuth } from './requireAuth';

const router = createBrowserRouter([
  {
    element: <LocaleProvider />,
    children: [
      {
        path: '/:locale',
        element: <SiteLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'jobs', element: <JobsPage /> },
          { path: 'jobs/:jobId', element: <JobDetailPage /> },
          { path: 'companies', element: <CompaniesPage /> },
          { path: 'companies/:companyId', element: <CompanyPage /> },
        ],
      },
      {
        path: '/:locale/login',
        element: <LoginPage />,
      },
      {
        path: '/:locale/register',
        element: <RegisterPage />,
      },
      {
        path: '/:locale/register/code',
        element: <RegisterCodePage />,
      },
      {
        path: '/:locale/register/setup',
        element: <RegisterSetupPage />,
      },
      {
        path: '/:locale/welcome',
        element: <WelcomePage />,
        loader: requireAuth,
      },
    ],
  },
  { path: '/', element: <Navigate to="/en" replace /> },
  { path: '/login', element: <Navigate to="/en/login" replace /> },
  { path: '/register', element: <Navigate to="/en/register" replace /> },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
