import { useUserStore } from '@/store';
import axios from 'axios';

export default function useCustomAxios() {
  const { user } = useUserStore();
  const customAxios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  });

  customAxios.interceptors.request.use(
    (config) => {
      const accessToken = user?.accessToken;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      localStorage.removeItem('user');
      return Promise.reject(error);
    },
  );
  return customAxios;
}
