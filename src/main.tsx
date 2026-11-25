import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthFlowProvider } from './context/AuthFlowProvider';
import { LocaleProvider } from './i18n/LocaleProvider';
import './index.css';
import router from './router';
import { antdTheme } from './theme/antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={antdTheme}>
      <LocaleProvider>
        <AuthFlowProvider>
          <RouterProvider router={router} />
        </AuthFlowProvider>
      </LocaleProvider>
    </ConfigProvider>
  </StrictMode>,
);
