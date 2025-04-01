import { Card, Stack, Group, Title, Text, List, Button, ActionIcon, Tooltip, ThemeIcon, Badge, Modal, TextInput, NumberInput, Switch, Textarea } from '@mantine/core';
import { IconMap2, IconEdit, IconTrash, IconPlus, IconUser } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useApi } from '../../../hooks/useApi';

export const CompanyWorkAreas = ({ areas, companyId, fetchDashboardData }) => {
  const { classes } = useStyles();
  const { post, put, del } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(null);
  const [editingArea, setEditingArea] = useState(null);
  const [formData, setFormData] = useState({
    city: '',
    postalCode: '',
    district: '',
    radiusInKm: null,
    additionalInfo: '',
    isActive: true
  });

  const handleOpenModal = (area = null) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        city: area.city,
        postalCode: area.postalCode,
        district: area.district,
        radiusInKm: area.radiusInKm,
        additionalInfo: area.additionalInfo || '',
        isActive: area.isActive
      });
    } else {
      setEditingArea(null);
      setFormData({
        city: '',
        postalCode: '',
        district: '',
        radiusInKm: null,
        additionalInfo: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArea(null);
    setFormData({
      city: '',
      postalCode: '',
      district: '',
      radiusInKm: null,
      additionalInfo: '',
      isActive: true
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        companyId
      };

      if (editingArea) {
        data.id = editingArea.id;
      }

      const response = await (editingArea 
        ? put(`/service-provider/edit-company-work-area`, data)
        : post('/service-provider/add-company-work-area', data));

      if (!response.isSuccess) {
        throw new Error(response.error || 'Wystąpił błąd podczas zapisywania obszaru roboczego');
      }

      notifications.show({
        title: 'Sukces',
        message: editingArea 
          ? 'Pomyślnie zaktualizowano obszar roboczy'
          : 'Pomyślnie dodano nowy obszar roboczy',
        color: 'green',
      });



      handleCloseModal();
      fetchDashboardData();
      // TODO: Odśwież listę obszarów
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message || 'Wystąpił błąd podczas zapisywania obszaru roboczego',
        color: 'red',
      });
    }
  };

  const handleDelete = async (areaId) => {
    setAreaToDelete(areaId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await del(`/service-provider/delete-company-work-area`, {
        data: {
          id: areaToDelete,
          companyId
        }
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Wystąpił błąd podczas usuwania obszaru roboczego');
      }

      notifications.show({
        title: 'Sukces',
        message: response.message || 'Pomyślnie usunięto obszar roboczy',
        color: 'green',
      });
      setIsDeleteModalOpen(false);
      setAreaToDelete(null);
      fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message || 'Wystąpił błąd podczas usuwania obszaru roboczego',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Card p="md" radius="md" withBorder className={classes.card}>
        <Stack spacing="md">
          <Group position="apart">
            <Title order={3}>Obszary pracy</Title>
            <Button leftIcon={<IconPlus size={16} />} color="blue" onClick={() => handleOpenModal()}>
              Dodaj obszar
            </Button>
          </Group>

          {areas?.length === 0 ? (
            <Text color="dimmed" align="center" py="xl">
              Brak zdefiniowanych obszarów pracy
            </Text>
          ) : (
            <List spacing="md">
              {areas?.map((area) => (
                <List.Item key={area.id} className={classes.listItem}>
                  <Group position="apart">
                    <Group>
                      <ThemeIcon size={32} radius="md" variant="light" color="green">
                        <IconMap2 size={20} />
                      </ThemeIcon>
                      <Stack spacing={0}>
                        <Group spacing="xs">
                          <Text weight={500}>{area.city}</Text>
                          <Badge size="sm" variant="light" color={area.isActive ? 'green' : 'gray'}>
                            {area.isActive ? 'Aktywny' : 'Nieaktywny'}
                          </Badge>
                        </Group>
                        <Group spacing="xs">
                          <Text size="sm" color="dimmed">
                            <IconUser size={14} style={{ marginRight: 4 }} />
                            {area.userFullName}
                          </Text>
                          <Text size="sm" color="dimmed">
                            {area.district} • {area.postalCode}
                          </Text>
                          {area.radiusInKm && (
                            <Text size="sm" color="dimmed">
                              Promień: {area.radiusInKm} km
                            </Text>
                          )}
                        </Group>
                      </Stack>
                    </Group>
                    <Group>
                      <Tooltip label="Edytuj">
                        <ActionIcon color="blue" variant="light" onClick={() => handleOpenModal(area)}>
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Usuń">
                        <ActionIcon color="red" variant="light" onClick={() => handleDelete(area.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>
                </List.Item>
              ))}
            </List>
          )}
        </Stack>
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={handleCloseModal}
        title={editingArea ? 'Edycja obszaru roboczego' : 'Nowy obszar roboczy'}
        size="md"
      >
        <Stack spacing="md">
          <TextInput
            label="Miasto"
            placeholder="Wprowadź miasto"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <TextInput
            label="Kod pocztowy"
            placeholder="XX-XXX"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            required
          />
          <TextInput
            label="Dzielnica"
            placeholder="Wprowadź dzielnicę"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            required
          />
          <NumberInput
            label="Promień (km)"
            placeholder="Wprowadź promień"
            value={formData.radiusInKm}
            onChange={(value) => setFormData({ ...formData, radiusInKm: value })}
            min={0}
            step={0.1}
          />
          <Textarea
            label="Dodatkowe informacje"
            placeholder="Wprowadź dodatkowe informacje"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
          <Switch
            label="Aktywny"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.currentTarget.checked })}
          />
          <Group position="right" mt="md">
            <Button variant="default" onClick={handleCloseModal}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit}>
              {editingArea ? 'Zapisz zmiany' : 'Dodaj obszar'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAreaToDelete(null);
        }}
        title="Usuń obszar roboczy"
        size="sm"
      >
        <Stack spacing="md">
          <Text size="sm">
            Czy na pewno chcesz usunąć ten obszar roboczy? Tej operacji nie można cofnąć.
          </Text>
          <Group position="right" mt="md">
            <Button 
              variant="default" 
              onClick={() => {
                setIsDeleteModalOpen(false);
                setAreaToDelete(null);
              }}
            >
              Anuluj
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Usuń
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}; 