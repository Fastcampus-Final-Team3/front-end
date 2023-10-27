import ReactDOM from 'react-dom/client';
import '@/index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import koKR from 'antd/es/locale/ko_KR';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider locale={koKR}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
