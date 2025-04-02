import { useState } from 'react';
import { Card, Stack, Group, Title, Text, List, Button, ActionIcon, Tooltip, ThemeIcon, Modal, TextInput, Select, Grid } from '@mantine/core';
import { IconUser, IconEdit, IconTrash, IconPlus, IconPhone, IconId } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { notifications } from '@mantine/notifications';
import { useApi } from '../../../hooks/useApi';
import { useJwtData } from '../../../hooks/useJwtData';

export const CompanyUsers = ({ users, fetchDashboardData, companyId }) => {
  const userData = useJwtData();
  const { classes } = useStyles();
  const { put, del, post } = useApi();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userRole: ''
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userRole: 'CompanyEmployee',
    password: ''
  });

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditedData({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      userRole: user.userRole
    });
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleToggleActive = async () => {
    try {
      const endpoint = selectedUser.isActive ? 
        '/service-provider/delete-company-user' : 
        '/service-provider/activate-company-user';
      
      const response = await (selectedUser.isActive ? 
        del(endpoint, {
          data: {
            companyId: companyId,
            userId: selectedUser.id
          }
        }) : 
        put(endpoint, {
          companyId: companyId,
          userId: selectedUser.id
        }));

      if (!response.isSuccess) {
        throw new Error(response.message || `Nie udało się ${selectedUser.isActive ? 'dezaktywować' : 'aktywować'} użytkownika`);
      }

      notifications.show({
        title: 'Sukces!',
        message: response.message,
        color: selectedUser.isActive ? 'red' : 'green'
      });

      setDeleteModalOpen(false);
      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  const handleEditSubmit = async () => {
    console.log('companyId', companyId);
    try {
      const response = await put('/service-provider/edit-company-user', {
        companyId: companyId,
        userId: selectedUser.id,
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        phoneNumber: editedData.phoneNumber,
        userRole: editedData.userRole
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Nie udało się zaktualizować danych użytkownika');
      }

      notifications.show({
        title: 'Sukces!',
        message: 'Dane użytkownika zostały zaktualizowane',
        color: 'green'
      });

      setEditModalOpen(false);
      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  const handleAddSubmit = async () => {

    try {
      const response = await post('/service-provider/add-company-user', {
        companyId: companyId,
        email: newUserData.email,
        password: newUserData.password,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        phoneNumber: newUserData.phoneNumber,
        userRole: newUserData.userRole
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Nie udało się dodać użytkownika');
      }

      notifications.show({
        title: 'Sukces!',
        message: 'Użytkownik został dodany',
        color: 'green'
      });

      setAddModalOpen(false);
      setNewUserData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userRole: 'CompanyEmployee',
        password: ''
      });
      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  return (
    <>
      <Card p="md" radius="md" withBorder className={classes.card}>
        <Stack spacing="md">
          <Group position="apart">
            <Title order={3}>Lista pracowników</Title>
            {userData && userData.role === 'CompanyAdmin' && (
            <Button 
              leftIcon={<IconPlus size={16} />} 
              color="blue"
              onClick={() => setAddModalOpen(true)}
              >
                Dodaj pracownika
              </Button>
            )}
          </Group>

          <List spacing="md">
            {users?.map((user, index) => (
              <List.Item 
                key={index} 
                className={classes.listItem}
                style={{
                  opacity: user.isActive ? 1 : 0.6,
                  backgroundColor: user.isActive ? 'transparent' : 'var(--mantine-color-gray-0)'
                }}
              >
                <Group position="apart">
                  <Group>
                    <ThemeIcon size={32} radius="md" variant="light" color={user.isActive ? "blue" : "gray"}>
                      <IconUser size={20} />
                    </ThemeIcon>
                    <Stack spacing={4}>
                      <Group spacing={8} align="center">
                        <Text weight={500} style={{opacity: user.isActive ? 1 : 0.8}}>
                          {user.firstName} {user.lastName}
                          {!user.isActive && (
                            <Text component="span" ml={8} size="xs" color="dimmed">
                              (Nieaktywny)
                            </Text>
                          )}
                        </Text>
                      </Group>
                      <Text size="sm" color="dimmed">{user.email}</Text>
                      <Group spacing={4}>
                        <IconPhone size={16} style={{opacity: 0.5}} />
                        <Text size="sm" color="dimmed">{user.phoneNumber}</Text>
                      </Group>
                    </Stack>
                  </Group>
                  <Group spacing={8}>
                    <Text 
                      size="xs"
                      px={8}
                      py={4}
                      style={{
                        backgroundColor: user.isActive ? 'var(--mantine-color-blue-1)' : 'var(--mantine-color-gray-1)',
                        color: user.isActive ? 'var(--mantine-color-blue-9)' : 'var(--mantine-color-gray-7)',
                        borderRadius: 'var(--mantine-radius-sm)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {user.role === 'CompanyAdmin' ? 'Administrator' : user.role === 'CompanyEmployee' ? 'Pracownik' : user.role}
                    </Text>
                    <Group>
                      {userData && userData.role === 'CompanyAdmin' && (
                      <Tooltip label="Edytuj">
                        <ActionIcon 
                          color={user.isActive ? "blue" : "gray"} 
                          variant="light" 
                          onClick={() => handleOpenEditModal(user)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        </Tooltip>
                      )}
                      {userData && userData.role === 'CompanyAdmin' && (
                      <Tooltip label={user.isActive ? "Dezaktywuj" : "Aktywuj"}>
                        <ActionIcon 
                          color={user.isActive ? "red" : "green"} 
                          variant="light" 
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          {user.isActive ? <IconTrash size={16} /> : <IconPlus size={16} />}
                        </ActionIcon>
                      </Tooltip>
                      )}
                    </Group>
                  </Group>
                </Group>
              </List.Item>
            ))}
          </List>
        </Stack>
      </Card>

      {/* Modal edycji */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edycja użytkownika"
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Imię"
                value={editedData.firstName}
                onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Nazwisko"
                value={editedData.lastName}
                onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Telefon"
            value={editedData.phoneNumber}
            onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
          />
          <Select
            label="Rola"
            value={editedData.userRole}
            onChange={(value) => setEditedData({ ...editedData, userRole: value })}
            data={[
              { value: 'CompanyAdmin', label: 'Administrator' },
              { value: 'CompanyEmployee', label: 'Pracownik' }
            ]}
          />
          <Group position="right">
            <Button variant="default" onClick={() => setEditModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleEditSubmit}>
              Zapisz zmiany
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal usuwania */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={`${selectedUser?.isActive ? 'Dezaktywacja' : 'Aktywacja'} użytkownika`}
      >
        <Stack>
          <Text>
            Czy na pewno chcesz {selectedUser?.isActive ? 'dezaktywować' : 'aktywować'} użytkownika {selectedUser?.firstName} {selectedUser?.lastName}?
          </Text>
          <Group position="right">
            <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
              Anuluj
            </Button>
            <Button 
              color={selectedUser?.isActive ? "red" : "green"} 
              onClick={handleToggleActive}
            >
              {selectedUser?.isActive ? 'Dezaktywuj' : 'Aktywuj'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal dodawania */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Dodaj nowego pracownika"
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Imię"
                required
                value={newUserData.firstName}
                onChange={(e) => setNewUserData({ ...newUserData, firstName: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Nazwisko"
                required
                value={newUserData.lastName}
                onChange={(e) => setNewUserData({ ...newUserData, lastName: e.target.value })}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Email"
            required
            type="email"
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
          />
          <TextInput
            label="Hasło"
            required
            type="password"
            value={newUserData.password}
            onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
          />
          <TextInput
            label="Telefon"
            required
            value={newUserData.phoneNumber}
            onChange={(e) => setNewUserData({ ...newUserData, phoneNumber: e.target.value })}
          />
          <Select
            label="Rola"
            required
            value={newUserData.userRole}
            onChange={(value) => setNewUserData({ ...newUserData, userRole: value })}
            data={[
              { value: 'CompanyAdmin', label: 'Administrator' },
              { value: 'CompanyEmployee', label: 'Pracownik' }
            ]}
          />
          <Group position="right">
            <Button variant="default" onClick={() => setAddModalOpen(false)}>
              Anuluj
            </Button>
            {userData && userData.role === 'CompanyAdmin' && (
              <Button onClick={handleAddSubmit}>
                Dodaj pracownika
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}; 