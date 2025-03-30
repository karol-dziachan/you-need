import { Card, Stack, Group, Title, Text, List, Button, ActionIcon, Tooltip, ThemeIcon } from '@mantine/core';
import { IconUser, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';

export const CompanyUsers = ({ users }) => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" withBorder className={classes.card}>
      <Stack spacing="md">
        <Group position="apart">
          <Title order={3}>Lista pracowników</Title>
          <Button leftIcon={<IconPlus size={16} />} color="blue">
            Dodaj pracownika
          </Button>
        </Group>

        <List spacing="md">
          {users?.map((user, index) => (
            <List.Item key={index} className={classes.listItem}>
              <Group position="apart">
                <Group>
                  <ThemeIcon size={32} radius="md" variant="light" color="blue">
                    <IconUser size={20} />
                  </ThemeIcon>
                  <Stack spacing={0}>
                    <Text weight={500}>{user.firstName} {user.lastName}</Text>
                    <Text size="sm" color="dimmed">{user.email}</Text>
                  </Stack>
                </Group>
                <Group>
                  <Tooltip label="Edytuj">
                    <ActionIcon color="blue" variant="light">
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Usuń">
                    <ActionIcon color="red" variant="light">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            </List.Item>
          ))}
        </List>
      </Stack>
    </Card>
  );
}; 