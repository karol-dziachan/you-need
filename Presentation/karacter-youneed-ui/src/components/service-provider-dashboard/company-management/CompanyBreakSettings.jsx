import { useState } from 'react';
import { 
  Card, 
  Stack, 
  Group, 
  Title, 
  Text, 
  Button, 
  ActionIcon, 
  Tooltip, 
  Grid, 
  NumberInput, 
  Switch,
  Select,
  Textarea,
  Badge,
  Table,
  ScrollArea,
  Divider,
  Modal
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ThemeIcon } from '@mantine/core';
import { useBreakSettings } from '../../../hooks/useBreakSettings';

import { 
  IconEdit, 
  IconTrash, 
  IconPlus, 
  IconClock,
  IconUser,
  IconCalendar,
  IconInfoCircle
} from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { useJwtData } from '../../../hooks/useJwtData';

const BreakSettingsForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  users = [],
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState(initialData || {
    userId: '',
    minimumBreakBetweenOrdersInMinutes: 15,
    maximumOrdersPerDay: 8,
    isActive: true,
    allowWeekendOrders: false,
    allowHolidayOrders: false,
    excludedDates: '',
    specialBreakRules: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const userOptions = Array.isArray(users) 
    ? users.map(user => ({ 
        value: user?.id || '', 
        label: user?.firstName + ' ' + user?.lastName || 'Nieznany użytkownik' 
      }))
    : [];

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <Select
          label="Pracownik"
          placeholder="Wybierz pracownika"
          data={userOptions}
          value={formData.userId}
          onChange={(value) => setFormData({ ...formData, userId: value })}
          required
          searchable
          nothingFound="Nie znaleziono pracownika"
        />

        <Grid>
          <Grid.Col span={6}>
            <NumberInput
              label="Minimalny czas przerwy między zleceniami (minuty)"
              value={formData.minimumBreakBetweenOrdersInMinutes}
              onChange={(value) => setFormData({ ...formData, minimumBreakBetweenOrdersInMinutes: value })}
              min={5}
              max={120}
              step={5}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Maksymalna liczba zleceń dziennie"
              value={formData.maximumOrdersPerDay}
              onChange={(value) => setFormData({ ...formData, maximumOrdersPerDay: value })}
              min={1}
              max={20}
              required
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={4}>
            <Switch
              label="Aktywne"
              checked={formData.isActive}
              onChange={(event) => setFormData({ ...formData, isActive: event.currentTarget.checked })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Switch
              label="Zlecenia w weekend"
              checked={formData.allowWeekendOrders}
              onChange={(event) => setFormData({ ...formData, allowWeekendOrders: event.currentTarget.checked })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Switch
              label="Zlecenia w święta"
              checked={formData.allowHolidayOrders}
              onChange={(event) => setFormData({ ...formData, allowHolidayOrders: event.currentTarget.checked })}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          label="Wykluczone daty"
          placeholder="Wprowadź daty w formacie YYYY-MM-DD, oddzielone przecinkami"
          value={formData.excludedDates}
          onChange={(event) => setFormData({ ...formData, excludedDates: event.currentTarget.value })}
        />

        <Textarea
          label="Specjalne zasady przerw"
          placeholder="Wprowadź specjalne zasady przerw"
          value={formData.specialBreakRules}
          onChange={(event) => setFormData({ ...formData, specialBreakRules: event.currentTarget.value })}
        />

        <Group position="right" mt="md">
          <Button variant="default" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {initialData ? 'Zapisz zmiany' : 'Dodaj ustawienia'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CompanyBreakSettings = ({ breakSettings = [], companyId, users = [], fetchBreakSettings = () => {} }) => {
  const { classes } = useStyles();
  const userData = useJwtData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSettings, setEditingSettings] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [settingsToDelete, setSettingsToDelete] = useState(null);
  const { isLoading, addBreakSettings, editBreakSettings, deleteBreakSettings } = useBreakSettings(companyId);

  const handleOpenModal = (settings = null) => {
    setEditingSettings(settings);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSettings(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    const success = editingSettings
      ? await editBreakSettings(editingSettings.id, data)
      : await addBreakSettings(data);

    if (success) {
      handleCloseModal();
      fetchBreakSettings();
    }
  };

  const handleDelete = (settings) => {
    setSettingsToDelete(settings);
    setIsDeleteModalOpen(true);
    fetchBreakSettings();
  };

  const handleConfirmDelete = async () => {
    const success = await deleteBreakSettings(settingsToDelete.id);
    if (success) {
      setIsDeleteModalOpen(false);
      setSettingsToDelete(null);
      fetchBreakSettings();
    }
  };

  return (
    <Card p="md" radius="md" withBorder className={classes.card}>
      <Stack spacing="md">
        <Group position="apart">
          <Title order={3}>Ustawienia przerw</Title>
          {userData && userData.role === 'CompanyAdmin' && (
          <Button 
            leftIcon={<IconPlus size={16} />} 
            color="blue"
            onClick={() => handleOpenModal()}
          >
              Dodaj ustawienia
            </Button>
          )}
        </Group>

        {!breakSettings?.length ? (
          <Card withBorder p="xl" radius="md" className={classes.emptyCard}>
            <Stack align="center" spacing="md">
              <ThemeIcon size={50} variant="light" color="blue">
                <IconClock size={30} />
              </ThemeIcon>
              <Text size="lg" weight={500} align="center">
                Brak zdefiniowanych ustawień przerw
              </Text>
              <Text color="dimmed" align="center" size="sm">
                Dodaj ustawienia przerw dla pracowników, aby zoptymalizować ich harmonogram pracy
              </Text>
            </Stack>
          </Card>
        ) : (
          <ScrollArea h={400}>
            <Stack spacing="md">
              {breakSettings.map((settings) => (
                <Card key={settings.id} withBorder radius="md" p="md">
                  <Grid>
                    <Grid.Col span={8}>
                      <Group position="apart" align="flex-start" mb="xs">
                        <Group spacing="xs">
                          <ThemeIcon size="lg" variant="light" color="blue">
                            <IconUser size={20} />
                          </ThemeIcon>
                          <div>
                            <Text size="lg" weight={500}>{settings.userFullName}</Text>
                            <Text size="xs" color="dimmed">ID: {settings.userId}</Text>
                          </div>
                        </Group>
                        <Group spacing="xs">
                          {userData && userData.role === 'CompanyAdmin' && (
                          <Tooltip label="Edytuj ustawienia">
                            <ActionIcon 
                              color="blue" 
                              variant="light"
                              onClick={() => handleOpenModal(settings)}
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          )}
                          {userData && userData.role === 'CompanyAdmin' && (
                          <Tooltip label="Usuń ustawienia">
                            <ActionIcon 
                              color="red" 
                              variant="light"
                              onClick={() => handleDelete(settings)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                          )}
                        </Group>
                      </Group>

                      <Divider my="xs" />

                      <Grid>
                        <Grid.Col span={6}>
                          <Stack spacing="xs">
                            <Group spacing="xs">
                              <ThemeIcon size="sm" variant="light" color="blue">
                                <IconClock size={14} />
                              </ThemeIcon>
                              <Text size="sm" weight={500}>Przerwy między zleceniami</Text>
                            </Group>
                            <Text size="sm" ml={32}>{settings.minimumBreakBetweenOrdersInMinutes} minut</Text>
                            {settings.specialBreakRules && (
                              <Text size="xs" color="dimmed" ml={32}>
                                {settings.specialBreakRules}
                              </Text>
                            )}
                          </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Stack spacing="xs">
                            <Text size="sm" weight={500}>Limity dzienne</Text>
                            <Text size="sm" ml={32}>Maksymalnie {settings.maximumOrdersPerDay} zleceń</Text>
                            {settings.excludedDates && (
                              <Text size="xs" color="dimmed" ml={32}>
                                Wykluczone daty: {settings.excludedDates}
                              </Text>
                            )}
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack spacing="xs">
                        <Badge 
                          color={settings.isActive ? 'green' : 'red'}
                          variant="light"
                          size="lg"
                          leftSection={settings.isActive ? <IconInfoCircle size={14} /> : null}
                        >
                          {settings.isActive ? 'Aktywne' : 'Nieaktywne'}
                        </Badge>
                        <Group spacing="xs">
                          <Badge 
                            color={settings.allowWeekendOrders ? 'blue' : 'gray'}
                            variant="light"
                            leftSection={<IconCalendar size={12} />}
                          >
                            Weekend
                          </Badge>
                          <Badge 
                            color={settings.allowHolidayOrders ? 'blue' : 'gray'}
                            variant="light"
                            leftSection={<IconCalendar size={12} />}
                          >
                            Święta
                          </Badge>
                        </Group>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={handleCloseModal}
        title={editingSettings ? 'Edytuj ustawienia przerw' : 'Dodaj ustawienia przerw'}
        size="lg"
      >
        <BreakSettingsForm
          initialData={editingSettings}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          users={users}
          isSubmitting={isLoading}
        />
      </Modal>

      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Usuń ustawienia przerw"
        size="sm"
      >
        <Stack spacing="md">
          <Text size="sm">
            Czy na pewno chcesz usunąć ustawienia przerw dla pracownika {settingsToDelete?.userFullName}?
            Tej operacji nie można cofnąć.
          </Text>
          <Group position="right">
            <Button variant="default" onClick={() => setIsDeleteModalOpen(false)}>
              Anuluj
            </Button>
            <Button color="red" onClick={handleConfirmDelete} loading={isLoading}>
              Usuń
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}; 