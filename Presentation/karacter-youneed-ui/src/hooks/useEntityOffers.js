import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { useApi } from './useApi';

export const useEntityOffers = () => {
  const api = useApi();

  const getOffersForProvider = useCallback(async (companyId) => {
    try {
      const response = await api.get(`/entity-offers/${companyId}`);
      return response;
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się pobrać ofert',
        color: 'red'
      });
      throw error;
    }
  }, []);

  const addEntityOffer = useCallback(async (offerData) => {
    try {
      // Upewniamy się, że wszystkie wymagane pola są obecne
      const entityOfferData = {
        addEntityOfferDtos: offerData.addEntityOfferDtos.map(offer => ({
          offerId: offer.offerId,
          whichEntity: offer.whichEntity,
          entityId: offer.entityId,
          timeToCompleteInMinutes: offer.timeToCompleteInMinutes || 0,
          price: offer.price || 0,
          currency: offer.currency || 'PLN',
          unitOfMeasure: offer.unitOfMeasure || 'sztuka',
          isActive: offer.isActive !== undefined ? offer.isActive : true
        }))
      };
      
      console.log('Wysyłane dane do API:', JSON.stringify(entityOfferData, null, 2));
      
      const response = await api.post('/entity-offers', entityOfferData);
      console.log('Odpowiedź z API:', response);

      if(response && response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Oferta została dodana',
          color: 'green'
        });
        return response;
      } else {
        const errorMessage = response?.message || 'Nie udało się dodać oferty';
        notifications.show({
          title: 'Błąd',
          message: errorMessage,
          color: 'red'
        });
        return response;
      }
    } catch (error) {
      console.error('Błąd podczas dodawania oferty:', error);
      const errorMessage = error.response?.data || 'Nie udało się dodać oferty';
      notifications.show({
        title: 'Błąd',
        message: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
        color: 'red'
      });
      throw error;
    }
  }, []);

  const editEntityOffer = useCallback(async (offerData) => {
    try {
      // Upewniamy się, że wszystkie wymagane pola są obecne
      const entityOfferData = {
        id: offerData.id,
        offerId: offerData.offerId,
        whichEntity: offerData.whichEntity,
        entityId: offerData.entityId,
        timeToCompleteInMinutes: offerData.timeToCompleteInMinutes || 0,
        price: offerData.price || 0,
        currency: offerData.currency || 'PLN',
        unitOfMeasure: offerData.unitOfMeasure || 'sztuka',
        isActive: offerData.isActive !== undefined ? offerData.isActive : true
      };
      
      const response = await api.put('/entity-offers', entityOfferData);
      if(response && response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Oferta została zaktualizowana',
          color: 'green'
        });
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response?.message || 'Nie udało się zaktualizować oferty',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się zaktualizować oferty',
        color: 'red'
      });
      throw error;
    }
  }, []);

  const deleteEntityOffer = useCallback(async (offerId) => {
    try {
      console.log('Usuwanie oferty o ID:', offerId);
      const response = await api.del('/entity-offers', { data: { id: offerId } });
      console.log('Odpowiedź z API po usunięciu:', response);
      
      if (response && response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Oferta została usunięta',
          color: 'green'
        });
        return response;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response?.message || 'Nie udało się usunąć oferty',
          color: 'red'
        });
        return null;
      }
    } catch (error) {
      console.error('Error in deleteEntityOffer:', error);
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się usunąć oferty',
        color: 'red'
      });
      throw error;
    }
  }, []);

  return {
    getOffersForProvider,
    addEntityOffer,
    editEntityOffer,
    deleteEntityOffer
  };
}; 