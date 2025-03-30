import { Card, Stack, Group, Title, Text, List, Button, ActionIcon, Tooltip, ThemeIcon } from '@mantine/core';
import { IconMap2, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';

export const CompanyWorkAreas = ({ areas }) => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" withBorder className={classes.card}>
      <Stack spacing="md">
        <Group position="apart">
          <Title order={3}>Obszary pracy</Title>
          <Button leftIcon={<IconPlus size={16} />} color="blue">
            Dodaj obszar
          </Button>
        </Group>

        {areas?.length === 0 ? (
          <Text color="dimmed" align="center" py="xl">
            Brak zdefiniowanych obszarów pracy
          </Text>
        ) : (
          <List spacing="md">
            {areas?.map((area, index) => (
              <List.Item key={index} className={classes.listItem}>
                <Group position="apart">
                  <Group>
                    <ThemeIcon size={32} radius="md" variant="light" color="green">
                      <IconMap2 size={20} />
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Obszar {index + 1}</Text>
                      <Text size="sm" color="dimmed">Szczegóły obszaru</Text>
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
        )}
      </Stack>
    </Card>
  );
}; 