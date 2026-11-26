import { createBrowserRouter } from 'react-router-dom';
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
import { localeLoader } from './localeLoader';
import { requireAuth } from './requireAuth';

const router = createBrowserRouter([
  { path: '/', loader: localeLoader },
  {
    path: '/:locale',
    loader: localeLoader,
    element: <LocaleProvider />,
    children: [
      {
        element: <SiteLayout />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <HomePage /> },
              { path: 'jobs', element: <JobsPage /> },
              { path: 'companies', element: <CompaniesPage /> },
              {
                loader: requireAuth,
                children: [
                  { path: 'jobs/:jobId', element: <JobDetailPage /> },
                  { path: 'companies/:companyId', element: <CompanyPage /> },
                ],
              },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'register/code', element: <RegisterCodePage /> },
      { path: 'register/setup', element: <RegisterSetupPage /> },
      {
        loader: requireAuth,
        children: [{ path: 'welcome', element: <WelcomePage /> }],
      },
    ],
  },
]);

export default router;
