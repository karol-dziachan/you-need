import axios from 'axios';

const api = axios.create({
  baseURL: 'https://twoje-api.net',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor dla tokenów
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;