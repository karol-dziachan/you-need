import {
  Card,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Badge,
  Table,
  ScrollArea,
  Select,
  RingProgress,
  Grid,
  Paper
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconChartBar, IconDownload, IconFilter, IconTrendingUp } from '@tabler/icons-react';

export const ReportAnalysis = () => {
  return (
    <Card withBorder radius="md" p="md">
      <Group position="apart" mb="md">
        <Title order={3}>Analiza raportów</Title>
        <Group>
          <Button variant="light" color="blue" size="sm" leftIcon={<IconFilter size={14} />}>
            Filtruj
          </Button>
          <Button variant="light" color="green" size="sm" leftIcon={<IconDownload size={14} />}>
            Eksportuj
          </Button>
        </Group>
      </Group>

      <Stack spacing="md">
        <Grid>
          <Grid.Col span={3}>
            <Paper withBorder radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text size="sm" color="dimmed">Aktywne oferty</Text>
                <Badge color="blue" variant="light">+12%</Badge>
              </Group>
              <Text size="xl" weight={700}>1,234</Text>
              <Text size="sm" color="dimmed">wzrost w tym miesiącu</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper withBorder radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text size="sm" color="dimmed">Zamówienia</Text>
                <Badge color="green" variant="light">+8%</Badge>
              </Group>
              <Text size="xl" weight={700}>456</Text>
              <Text size="sm" color="dimmed">wzrost w tym miesiącu</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper withBorder radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text size="sm" color="dimmed">Użytkownicy</Text>
                <Badge color="yellow" variant="light">+5%</Badge>
              </Group>
              <Text size="xl" weight={700}>789</Text>
              <Text size="sm" color="dimmed">wzrost w tym miesiącu</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper withBorder radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text size="sm" color="dimmed">Firmy</Text>
                <Badge color="red" variant="light">+3%</Badge>
              </Group>
              <Text size="xl" weight={700}>123</Text>
              <Text size="sm" color="dimmed">wzrost w tym miesiącu</Text>
            </Paper>
          </Grid.Col>
        </Grid>

        <Card withBorder radius="md" p="md">
          <Group position="apart" mb="md">
            <Title order={4}>Trendy aktywności</Title>
            <Group>
              <DatePicker
                placeholder="Wybierz okres"
                size="sm"
              />
              <Select
                placeholder="Typ raportu"
                size="sm"
                data={[
                  { value: 'daily', label: 'Dzienny' },
                  { value: 'weekly', label: 'Tygodniowy' },
                  { value: 'monthly', label: 'Miesięczny' }
                ]}
              />
            </Group>
          </Group>
          <ScrollArea h={300}>
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Oferty</th>
                  <th>Zamówienia</th>
                  <th>Użytkownicy</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-03-20</td>
                  <td>150</td>
                  <td>45</td>
                  <td>89</td>
                  <td>
                    <IconTrendingUp size={16} color="green" />
                  </td>
                </tr>
                <tr>
                  <td>2024-03-19</td>
                  <td>145</td>
                  <td>42</td>
                  <td>87</td>
                  <td>
                    <IconTrendingUp size={16} color="green" />
                  </td>
                </tr>
                <tr>
                  <td>2024-03-18</td>
                  <td>140</td>
                  <td>40</td>
                  <td>85</td>
                  <td>
                    <IconTrendingUp size={16} color="green" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Grid>
          <Grid.Col span={6}>
            <Card withBorder radius="md" p="md">
              <Title order={4} mb="md">Dystrybucja ofert</Title>
              <Group position="apart">
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">Aktywne</Text>
                  <Text size="xl" weight={700}>65%</Text>
                </Stack>
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">Wstrzymane</Text>
                  <Text size="xl" weight={700}>20%</Text>
                </Stack>
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">Zakończone</Text>
                  <Text size="xl" weight={700}>15%</Text>
                </Stack>
              </Group>
              <RingProgress
                size={200}
                thickness={16}
                sections={[
                  { value: 65, color: 'blue' },
                  { value: 20, color: 'yellow' },
                  { value: 15, color: 'gray' }
                ]}
                mt="md"
              />
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder radius="md" p="md">
              <Title order={4} mb="md">Status zamówień</Title>
              <Group position="apart">
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">Nowe</Text>
                  <Text size="xl" weight={700}>30%</Text>
                </Stack>
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">W trakcie</Text>
                  <Text size="xl" weight={700}>45%</Text>
                </Stack>
                <Stack spacing="xs">
                  <Text size="sm" color="dimmed">Zakończone</Text>
                  <Text size="xl" weight={700}>25%</Text>
                </Stack>
              </Group>
              <RingProgress
                size={200}
                thickness={16}
                sections={[
                  { value: 30, color: 'green' },
                  { value: 45, color: 'blue' },
                  { value: 25, color: 'gray' }
                ]}
                mt="md"
              />
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
}; 