import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthFlowProvider } from './context/AuthFlowProvider';
import './index.css';
import router from './router';
import { antdTheme } from './theme/antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={antdTheme}>
      <AuthFlowProvider>
        <RouterProvider router={router} />
      </AuthFlowProvider>
    </ConfigProvider>
  </StrictMode>,
);
