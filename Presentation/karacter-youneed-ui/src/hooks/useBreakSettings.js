import { useState } from 'react';
import { useApi } from './useApi';
import { notifications } from '@mantine/notifications';

export const useBreakSettings = (companyId) => {
  const { post, put, del } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const addBreakSettings = async (data) => {
    try {
      setIsLoading(true);
      const response = await post('/service-provider/add-company-break-settings', {
        ...data,
        companyId
      });

      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie dodano ustawienia przerw',
          color: 'green'
        });
        return true;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas dodawania ustawień przerw',
          color: 'red'
        });
        return false;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas dodawania ustawień przerw',
        color: 'red'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const editBreakSettings = async (id, data) => {
    try {
      setIsLoading(true);
      const response = await put('/service-provider/edit-company-break-settings', {
        ...data,
        id,
        companyId
      });

      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie zaktualizowano ustawienia przerw',
          color: 'green'
        });
        return true;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas aktualizacji ustawień przerw',
          color: 'red'
        });
        return false;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas aktualizacji ustawień przerw',
        color: 'red'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBreakSettings = async (id) => {
    try {
      setIsLoading(true);
      const response = await del('/service-provider/delete-company-break-settings', {
        data: {
            id,
            companyId
        }
      });

      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Pomyślnie usunięto ustawienia przerw',
          color: 'green'
        });
        return true;
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas usuwania ustawień przerw',
          color: 'red'
        });
        return false;
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas usuwania ustawień przerw',
        color: 'red'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addBreakSettings,
    editBreakSettings,
    deleteBreakSettings
  };
};