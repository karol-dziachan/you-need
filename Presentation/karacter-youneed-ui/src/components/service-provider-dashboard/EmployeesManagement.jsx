import { Paper, Title, Text, Stack, Group, ThemeIcon, Grid, Button, Table } from '@mantine/core';
import { IconUsers, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { useStyles } from './EmployeesManagement.styles';
import { useJwtData } from '../../hooks/useJwtData';

export const EmployeesManagement = () => {
  const { classes } = useStyles();
  const userData = useJwtData();
  const employees = [
    { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', role: 'Administrator' },
    { id: 2, name: 'Anna Nowak', email: 'anna@example.com', role: 'Pracownik' },
    { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@example.com', role: 'Pracownik' },
  ];

  return (
    <Paper p="xl" radius="md" withBorder className={classes.root}>
      <Stack spacing="xl">
        <Group position="apart">
          <Group>
            <ThemeIcon size={32} radius="md" variant="light" color="green">
              <IconUsers size={20} />
            </ThemeIcon>
            <Title order={2}>Zarządzanie pracownikami</Title>
          </Group>
          {userData && userData.role === 'CompanyAdmin' && (
            <Button leftIcon={<IconPlus size={16} />} color="green">
              Dodaj pracownika
            </Button>
          )}
        </Group>

        <Paper p="md" radius="md" withBorder className={classes.tableContainer}>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Email</th>
                <th>Rola</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>
                    <Group spacing="xs">
                      <Button variant="light" color="blue" size="xs">
                        <IconEdit size={14} />
                      </Button>
                      <Button variant="light" color="red" size="xs">
                        <IconTrash size={14} />
                      </Button>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Stack>
    </Paper>
  );
}; 