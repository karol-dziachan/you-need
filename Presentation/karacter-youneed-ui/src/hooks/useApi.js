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
      setError(err.response?.data?.message || 'Wystąpił błąd podczas komunikacji z serwerem');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((endpoint) => {
    return handleRequest(() => axiosInstance.get(endpoint));
  }, [handleRequest]);

  const post = useCallback((endpoint, data) => {
    return handleRequest(() => axiosInstance.post(endpoint, data));
  }, [handleRequest]);

  const put = useCallback((endpoint, data) => {
    return handleRequest(() => axiosInstance.put(endpoint, data));
  }, [handleRequest]);

  const del = useCallback((endpoint) => {
    return handleRequest(() => axiosInstance.delete(endpoint));
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