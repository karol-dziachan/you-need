import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:7106/api/v1.0';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.resolve({ data: {} });
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Response Error:', error);
    
    if (error.response?.status === 401) {
      console.log('Unauthorized access');
    }
    
    return Promise.resolve({ data: {} });
  }
);

export default axiosInstance;