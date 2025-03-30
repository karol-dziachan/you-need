import { Group, Title, Text, RingProgress, Paper, Stack, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconClock, IconCalendar, IconChecklist, IconChartBar, IconBuildingStore, IconUsers } from '@tabler/icons-react';

export const DashboardHeader = ({ companyName, numberOfEmployees, lastLoginDate, tasksNumber }) => {
  return (
    <Paper p="xl" radius="md" withBorder>
      <Grid>
        <Grid.Col span={12}>
          <Stack spacing="xs">
            <Group spacing="md">
              <ThemeIcon size={42} radius="md" variant="light" color="blue">
                <IconBuildingStore size={24} />
              </ThemeIcon>
              <div>
                <Title order={1} size={42} weight={800}>
                  Panel Usługodawcy
                </Title>
                <Text size="lg" color="dimmed" mt={5}>
                  Witaj w centrum zarządzania Twoją firmą. Tutaj masz pełną kontrolę nad wszystkimi aspektami działalności - od zarządzania pracownikami, przez monitorowanie wydajności, aż po analizę klientów i usług.
                </Text>
              </div>
            </Group>
            <Group mt="md" spacing="xl">
              <Group spacing="xs">
                <ThemeIcon size={24} radius="md" variant="light" color="blue">
                  <IconUsers size={16} />
                </ThemeIcon>
                <Text size="sm" weight={500}>
                  {companyName && console.log('companyName', companyName)}
                  Firma: <Text component="span" color="dimmed">{companyName || '0'}</Text>
                </Text>
              </Group>
              <Group spacing="xs">
                <ThemeIcon size={24} radius="md" variant="light" color="green">
                  <IconUsers size={16} />
                </ThemeIcon>
                <Text size="sm" weight={500}>
                  Pracownicy: <Text component="span" color="dimmed">{numberOfEmployees | '0'} aktywnych</Text>
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>

      <Group mt="xl" spacing="xl" wrap>
        <Group spacing="xs">
          <ThemeIcon size={24} radius="md" variant="light" color="blue">
            <IconClock size={16} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>Ostatnie logowanie</Text>
            <Text size="xs" color="dimmed">
              {lastLoginDate ? (() => {
                const lastLogin = new Date(lastLoginDate);
                const now = new Date();
                const diff = now - lastLogin;
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                return `${days > 0 ? `${days} dni ` : ''}${hours > 0 ? `${hours} godzin ` : ''}${minutes} minut temu`;
              })() : ''}
            </Text>
          </div>
        </Group>
        <Group spacing="xs">
          <ThemeIcon size={24} radius="md" variant="light" color="green">
            <IconCalendar size={16} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>Aktualna data</Text>
            <Text size="xs" color="dimmed">
              {new Date().toLocaleDateString('pl-PL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </div>
        </Group>
        <Group spacing="xs">
          <ThemeIcon size={24} radius="md" variant="light" color="yellow">
            <IconChecklist size={16} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>Zadania do wykonania</Text>
            <Text size="xs" color="dimmed">{tasksNumber | ''}</Text>
          </div>
        </Group>
        <Group spacing="xs">
          <ThemeIcon size={24} radius="md" variant="light" color="red">
            <IconChartBar size={16} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>Wydajność zespołu</Text>
            <Text size="xs" color="dimmed">85% w tym miesiącu</Text>
          </div>
        </Group>
      </Group>
    </Paper>
  );
}; 