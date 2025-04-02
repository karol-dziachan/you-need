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
      const response = await api.put(`/offers`, { ...offerData, id });
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
      const response = await api.del(`/offers`, {
        data: {
          id: id
        }
      });
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
      console.error('Error deleting offer:', error);
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

  const buildOfferTree = (offers) => {
    if (!offers || !Array.isArray(offers)) {
      console.error('Invalid offers data:', offers);
      return [];
    }

    const offerMap = new Map();
    const rootOffers = [];

    // First pass: create a map of all offers
    offers.forEach(offer => {
      offerMap.set(offer.id, {
        ...offer,
        children: []
      });
    });

    // Second pass: build the tree structure
    offers.forEach(offer => {
      const offerWithChildren = offerMap.get(offer.id);
      if (offer.parentOfferId) {
        const parent = offerMap.get(offer.parentOfferId);
        if (parent) {
          parent.children.push(offerWithChildren);
        } else {
          console.warn(`Parent offer ${offer.parentOfferId} not found for offer ${offer.id}`);
          rootOffers.push(offerWithChildren);
        }
      } else {
        rootOffers.push(offerWithChildren);
      }
    });

    console.log('Built offer tree:', rootOffers);
    return rootOffers;
  };


  return {
    isLoading,
    getAllOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    buildOfferTree
  };
};