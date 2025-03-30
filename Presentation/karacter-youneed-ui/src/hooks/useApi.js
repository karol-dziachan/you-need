import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosConfig';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(async (requestFn) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFn();
      return response;
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Wystąpił błąd podczas komunikacji z serwerem');
      return { data: {} };
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(async (endpoint) => {
    const response = await handleRequest(() => axiosInstance.get(endpoint));
    return response || { data: {} };
  }, [handleRequest]);

  const post = useCallback(async (endpoint, data) => {
    const response = await handleRequest(() => axiosInstance.post(endpoint, data));
    return response || { data: {} };
  }, [handleRequest]);

  const put = useCallback(async (endpoint, data) => {
    const response = await handleRequest(() => axiosInstance.put(endpoint, data));
    return response || { data: {} };
  }, [handleRequest]);

  const del = useCallback(async (endpoint) => {
    const response = await handleRequest(() => axiosInstance.delete(endpoint));
    return response || { data: {} };
  }, [handleRequest]);

  return {
    get,
    post,
    put,
    delete: del,
    loading,
    error,
  };
}; 