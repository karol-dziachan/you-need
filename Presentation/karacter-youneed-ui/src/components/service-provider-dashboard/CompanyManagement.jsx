import { Paper, Stack, Group, ThemeIcon, Title, Button, Tabs, Modal, TextInput, Grid, Textarea, Divider } from '@mantine/core';
import { IconBuilding, IconUsers, IconClock, IconMap2, IconEdit, IconCoffee, IconMapPin, IconCheck, IconX, IconPhone, IconWorld, IconId, IconFileDescription } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { CompanyBasicInfo } from './company-management/CompanyBasicInfo';
import { CompanyContactInfo } from './company-management/CompanyContactInfo';
import { CompanyUsers } from './company-management/CompanyUsers';
import { CompanySchedules } from './company-management/CompanySchedules';
import { CompanyWorkAreas } from './company-management/CompanyWorkAreas';
import { CompanyBreakSettings } from './company-management/CompanyBreakSettings';
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { notifications } from '@mantine/notifications';
import { useJwtData } from '../../hooks/useJwtData';

export const CompanyManagement = ({ dashboardData, fetchDashboardData }) => {
  const { put } = useApi();
  const userData = useJwtData();
  const { classes } = useStyles();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    nip: '',
    regon: '',
    description: '',
    address: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    website: '',
  });

  // Aktualizuj dane w formularzu gdy modal jest otwierany lub gdy zmieniają się dane
  useEffect(() => {
    if (editModalOpen && dashboardData?.company) {
      setEditedData({
        name: dashboardData.company.name || '',
        nip: dashboardData.company.nip || '',
        regon: dashboardData.company.regon || '',
        description: dashboardData.company.description || '',
        address: dashboardData.company.address || '',
        postalCode: dashboardData.company.postalCode || '',
        city: dashboardData.company.city || '',
        phoneNumber: dashboardData.company.phoneNumber || '',
        website: dashboardData.company.website || '',
      });
    }
  }, [editModalOpen, dashboardData]);

  const handleOpenModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const updateData = {
        companyId: dashboardData?.company?.id,
        companyName: editedData.name,
        companyNIP: editedData.nip,
        companyREGON: editedData.regon,
        companyDescription: editedData.description,
        companyAddress: editedData.address,
        companyCity: editedData.city,
        companyPostalCode: editedData.postalCode,
        companyPhoneNumber: editedData.phoneNumber,
        companyWebsite: editedData.website,
      };

      const response = await put('/service-provider/update-contact-info', updateData);

      if (!response.isSuccess) {
        throw new Error('Nie udało się zaktualizować danych');
      }

      handleCloseModal();
      
      notifications.show({
        title: 'Sukces!',
        message: 'Dane zostały zaktualizowane pomyślnie',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 2000
      });

      await fetchDashboardData();

    } catch (error) {
      console.error('Błąd podczas aktualizacji:', error);
      notifications.show({
        title: 'Błąd',
        message: error.message || 'Wystąpił błąd podczas aktualizacji danych',
        color: 'red', 
        icon: <IconX size={16} />,
        autoClose: 2000
      });
    }
  };

  return (
    <Paper p="xl" radius="md" withBorder className={classes.root}>
      <Stack spacing="xl">
        <Group position="apart">
          <Group>
            <ThemeIcon 
              size={32} 
              radius="md" 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              <IconBuilding size={20} color="white" />
            </ThemeIcon>
            <Title order={2} className={classes.title}>Zarządzanie firmą</Title>
          </Group>
          {userData && userData.role === 'CompanyAdmin' && (
            <Button 
              leftIcon={<IconEdit size={16} />} 
              variant="gradient" 
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={handleOpenModal}
            >
              Edytuj dane
            </Button>
          )}
        </Group>

        <Tabs defaultValue="company" classNames={{ tab: classes.tab }}>
          <Tabs.List>
            <Tabs.Tab value="company" icon={<IconBuilding size={14} />}>Dane firmy</Tabs.Tab>
            <Tabs.Tab value="users" icon={<IconUsers size={14} />}>Pracownicy</Tabs.Tab>
            <Tabs.Tab value="schedules" icon={<IconClock size={14} />}>Grafiki</Tabs.Tab>
            <Tabs.Tab value="areas" icon={<IconMap2 size={14} />}>Obszary pracy</Tabs.Tab>
            <Tabs.Tab value="breaks" icon={<IconCoffee size={14} />}>Przerwy</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="company" pt="xl">
            <Stack spacing="xl">
              <CompanyBasicInfo company={dashboardData?.company} />
              <CompanyContactInfo company={dashboardData?.company} />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="users" pt="xl">
            <CompanyUsers users={dashboardData?.companyUsers} fetchDashboardData={fetchDashboardData} companyId={dashboardData?.company?.id} />
          </Tabs.Panel>

          <Tabs.Panel value="schedules" pt="xl">
            <CompanySchedules schedules={dashboardData?.workSchedules} companyId={dashboardData?.company?.id} users={dashboardData?.companyUsers} fetchDashboardData={fetchDashboardData} />
          </Tabs.Panel>

          <Tabs.Panel value="areas" pt="xl">
            <CompanyWorkAreas areas={dashboardData?.workAreas} companyId={dashboardData?.company?.id} fetchDashboardData={fetchDashboardData} companyUsers={dashboardData?.companyUsers} />
          </Tabs.Panel>

          <Tabs.Panel value="breaks" pt="xl">
            <CompanyBreakSettings breakSettings={dashboardData?.breakSettings} companyId={dashboardData?.company?.id} users={dashboardData?.companyUsers} fetchBreakSettings={fetchDashboardData} />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Modal
        opened={editModalOpen}
        onClose={handleCloseModal}
        title={
          <Group>
            <ThemeIcon 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'cyan' }}
              size={24} 
              radius="md"
            >
              <IconEdit size={16} />
            </ThemeIcon>
            <Title order={3} className={classes.title}>Edycja danych firmy</Title>
          </Group>
        }
        size="lg"
      >
        <Stack spacing="md">
          <Title order={4} className={classes.title}>Podstawowe informacje</Title>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                icon={<IconBuilding size={16} />}
                label="Nazwa firmy"
                placeholder="Wprowadź nazwę firmy"
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                icon={<IconId size={16} />}
                label="NIP"
                placeholder="XXX-XXX-XX-XX"
                value={editedData.nip}
                onChange={(e) => setEditedData({ ...editedData, nip: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                icon={<IconId size={16} />}
                label="REGON"
                placeholder="XXXXXXXXX"
                value={editedData.regon}
                onChange={(e) => setEditedData({ ...editedData, regon: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                icon={<IconFileDescription size={16} />}
                label="Opis"
                placeholder="Wprowadź opis firmy"
                value={editedData.description}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                minRows={3}
              />
            </Grid.Col>
          </Grid>

          <Divider my="md" variant="dashed" />
          
          <Title order={4} className={classes.title}>Dane kontaktowe</Title>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                icon={<IconMapPin size={16} />}
                label="Adres"
                placeholder="Wprowadź adres"
                value={editedData.address}
                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Kod pocztowy"
                placeholder="XX-XXX"
                value={editedData.postalCode}
                onChange={(e) => setEditedData({ ...editedData, postalCode: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Miasto"
                placeholder="Wprowadź miasto"
                value={editedData.city}
                onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                icon={<IconPhone size={16} />}
                label="Telefon"
                placeholder="+48 XXX XXX XXX"
                value={editedData.phoneNumber}
                onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                icon={<IconWorld size={16} />}
                label="Strona internetowa"
                placeholder="https://www.example.com"
                value={editedData.website}
                onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button 
              variant="default" 
              onClick={handleCloseModal}
            >
              Anuluj
            </Button>
            <Button 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'cyan' }}
              onClick={handleEditSubmit}
            >
              Zapisz zmiany
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Paper>
  );
}; 