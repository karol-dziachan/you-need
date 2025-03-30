import { Card, Stack, Group, Title, Text, Button, ActionIcon, Tooltip, Grid, NumberInput, Switch } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ThemeIcon } from '@mantine/core';

import { IconEdit, IconTrash, IconPlus, IconClock } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';

export const CompanyBreakSettings = ({ breakSettings }) => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" withBorder className={classes.card}>
      <Stack spacing="md">
        <Group position="apart">
          <Title order={3}>Ustawienia przerw</Title>
          <Button leftIcon={<IconPlus size={16} />} color="blue">
            Dodaj przerwę
          </Button>
        </Group>

        {!breakSettings ? (
          <Text color="dimmed" align="center" py="xl">
            Brak zdefiniowanych ustawień przerw
          </Text>
        ) : (
          <Stack spacing="md">
            <Card p="md" radius="md" withBorder className={classes.card}>
              <Stack spacing="md">
                <Group position="apart">
                  <Group>
                    <ThemeIcon size={32} radius="md" variant="light" color="orange">
                      <IconClock size={20} />
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Przerwa standardowa</Text>
                      <Text size="sm" color="dimmed">Domyślne ustawienia przerwy</Text>
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

                <Grid>
                  <Grid.Col span={6}>
                    <Stack spacing="xs">
                      <Text size="sm" color="dimmed">Czas trwania (minuty)</Text>
                      <NumberInput
                        defaultValue={15}
                        min={5}
                        max={120}
                        step={5}
                        placeholder="Czas trwania przerwy"
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack spacing="xs">
                      <Text size="sm" color="dimmed">Godzina rozpoczęcia</Text>
                      <TimeInput
                        defaultValue="12:00"
                        placeholder="Godzina rozpoczęcia przerwy"
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Switch
                      label="Przerwa obowiązkowa"
                      description="Pracownik musi wziąć przerwę o określonej porze"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>

            <Card p="md" radius="md" withBorder className={classes.card}>
              <Stack spacing="md">
                <Group position="apart">
                  <Group>
                    <ThemeIcon size={32} radius="md" variant="light" color="violet">
                      <IconClock size={20} />
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Przerwa dodatkowa</Text>
                      <Text size="sm" color="dimmed">Dodatkowe ustawienia przerwy</Text>
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

                <Grid>
                  <Grid.Col span={6}>
                    <Stack spacing="xs">
                      <Text size="sm" color="dimmed">Czas trwania (minuty)</Text>
                      <NumberInput
                        defaultValue={10}
                        min={5}
                        max={60}
                        step={5}
                        placeholder="Czas trwania przerwy"
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack spacing="xs">
                      <Text size="sm" color="dimmed">Godzina rozpoczęcia</Text>
                      <TimeInput
                        defaultValue="15:00"
                        placeholder="Godzina rozpoczęcia przerwy"
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Switch
                      label="Przerwa opcjonalna"
                      description="Pracownik może wziąć przerwę w określonym czasie"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}; 