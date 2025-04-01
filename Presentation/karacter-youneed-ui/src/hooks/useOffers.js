import { useState } from 'react';
import { useApi } from './useApi';
import { notifications } from '@mantine/notifications';

export const useOffers = () => {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const getAllOffers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/offers');
      if (response.isSuccess) {
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas pobierania ofert',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd', 
        message: 'Wystąpił błąd podczas pobierania ofert',
        color: 'red'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createOffer = async (offerData) => {
    try {
      setIsLoading(true);
      const response = await api.post('/offers', offerData);
      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie utworzono ofertę',
          color: 'green'
        });
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas tworzenia oferty',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas tworzenia oferty',
        color: 'red'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOffer = async (id, offerData) => {
    try {
      setIsLoading(true);
      const response = await api.put(`/offers/${id}`, offerData);
      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie zaktualizowano ofertę',
          color: 'green'
        });
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas aktualizacji oferty',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas aktualizacji oferty',
        color: 'red'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOffer = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.delete(`/offers/${id}`);
      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie usunięto ofertę',
          color: 'green'
        });
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas usuwania oferty',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas usuwania oferty',
        color: 'red'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getAllOffers,
    createOffer,
    updateOffer,
    deleteOffer
  };
};