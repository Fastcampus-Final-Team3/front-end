import axios from 'axios';

// Create an Axios instance
export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL, // Your API base URL
});

const user = JSON.parse(localStorage.getItem('user') as string);

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = user.accessToken;
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
