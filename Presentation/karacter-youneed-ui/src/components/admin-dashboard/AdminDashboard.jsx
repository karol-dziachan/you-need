import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Text,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Badge,
  Button,
  ActionIcon,
  Tooltip,
  Divider,
  ScrollArea,
  RingProgress,
  Paper,
  Tabs
} from '@mantine/core';
import {
  IconUsers,
  IconBuildingSkyscraper,
  IconScale,
  IconClock,
  IconAlertTriangle,
  IconSettings,
  IconChartBar,
  IconBell,
  IconShieldCheck,
  IconReport,
  IconMessage,
  IconUserCheck,
  IconUserX,
  IconBuildingStore,
  IconFileAnalytics
} from '@tabler/icons-react';
import { useStyles } from './AdminDashboard.styles';
import { TreeCategoriesConfig } from './components/TreeCategoriesConfig';
import { DisputeManagement } from './components/DisputeManagement';
import { CompanyVerification } from './components/CompanyVerification';
import { ReportAnalysis } from './components/ReportAnalysis';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card withBorder radius="md" p="md">
    <Group position="apart" mb="xs">
      <ThemeIcon size="lg" variant="light" color={color}>
        {icon}
      </ThemeIcon>
      <Badge 
        color={trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray'}
        variant="light"
      >
        {trend > 0 ? '+' : ''}{trend}%
      </Badge>
    </Group>
    <Text size="xl" weight={700}>{value}</Text>
    <Text size="sm" color="dimmed">{title}</Text>
  </Card>
);

const QuickActionCard = ({ title, description, icon, color, onClick }) => (
  <Card 
    withBorder 
    radius="md" 
    p="md" 
    sx={(theme) => ({
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows.md
      }
    })}
    onClick={onClick}
  >
    <Group position="apart" mb="xs">
      <ThemeIcon size="lg" variant="light" color={color}>
        {icon}
      </ThemeIcon>
      <ActionIcon variant="light" color={color}>
        <IconSettings size={16} />
      </ActionIcon>
    </Group>
    <Text size="lg" weight={500} mb={4}>{title}</Text>
    <Text size="sm" color="dimmed">{description}</Text>
  </Card>
);

const DisputeCard = ({ title, company, user, date, status, priority }) => (
  <Card withBorder radius="md" p="md">
    <Group position="apart" mb="xs">
      <Group spacing="xs">
        <ThemeIcon size="sm" variant="light" color="red">
          <IconAlertTriangle size={14} />
        </ThemeIcon>
        <Text size="sm" weight={500}>{title}</Text>
      </Group>
      <Badge 
        color={priority === 'high' ? 'red' : priority === 'medium' ? 'yellow' : 'blue'}
        variant="light"
      >
        {priority}
      </Badge>
    </Group>
    <Text size="sm" color="dimmed" mb="xs">
      {company} • {user}
    </Text>
    <Group position="apart">
      <Text size="xs" color="dimmed">{date}</Text>
      <Badge 
        color={status === 'open' ? 'green' : status === 'in_progress' ? 'blue' : 'gray'}
        variant="light"
      >
        {status}
      </Badge>
    </Group>
  </Card>
);

const OverviewContent = () => (
  <>
    <Grid>
      <Grid.Col span={3}>
        <StatCard
          title="Aktywni użytkownicy"
          value="1,234"
          icon={<IconUsers size={20} />}
          color="blue"
          trend={12}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <StatCard
          title="Firmy"
          value="89"
          icon={<IconBuildingSkyscraper size={20} />}
          color="green"
          trend={5}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <StatCard
          title="Otwarte spory"
          value="23"
          icon={<IconScale size={20} />}
          color="red"
          trend={-8}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <StatCard
          title="Aktywne zlecenia"
          value="456"
          icon={<IconClock size={20} />}
          color="yellow"
          trend={15}
        />
      </Grid.Col>
    </Grid>

    <Grid mt="md">
      <Grid.Col span={6}>
        <Card withBorder radius="md" p="md">
          <Title order={3} mb="md">Weryfikacja użytkowników</Title>
          <Stack spacing="md">
            <Paper withBorder p="md" radius="md">
              <Group position="apart" mb="xs">
                <Group spacing="xs">
                  <ThemeIcon size="sm" variant="light" color="yellow">
                    <IconUserCheck size={14} />
                  </ThemeIcon>
                  <Text size="sm" weight={500}>Oczekujące weryfikacje</Text>
                </Group>
                <Badge color="yellow" variant="light">12</Badge>
              </Group>
              <Text size="sm" color="dimmed">
                8 nowych firm • 4 nowi użytkownicy
              </Text>
            </Paper>
            <Paper withBorder p="md" radius="md">
              <Group position="apart" mb="xs">
                <Group spacing="xs">
                  <ThemeIcon size="sm" variant="light" color="red">
                    <IconUserX size={14} />
                  </ThemeIcon>
                  <Text size="sm" weight={500}>Zablokowane konta</Text>
                </Group>
                <Badge color="red" variant="light">3</Badge>
              </Group>
              <Text size="sm" color="dimmed">
                2 firmy • 1 użytkownik
              </Text>
            </Paper>
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={6}>
        <Card withBorder radius="md" p="md">
          <Title order={3} mb="md">Statystyki systemu</Title>
          <Grid>
            <Grid.Col span={6}>
              <Stack align="center" spacing="xs">
                <RingProgress
                  size={80}
                  thickness={8}
                  sections={[{ value: 65, color: 'blue' }]}
                />
                <Text size="sm" weight={500}>Wykorzystanie API</Text>
                <Text size="xs" color="dimmed">65%</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack align="center" spacing="xs">
                <RingProgress
                  size={80}
                  thickness={8}
                  sections={[{ value: 85, color: 'green' }]}
                />
                <Text size="sm" weight={500}>Dostępność</Text>
                <Text size="xs" color="dimmed">99.9%</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>
    </Grid>
  </>
);

export const AdminDashboard = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Container fluid p="md">
      <Stack spacing="md">
        <Group position="apart">
          <Title order={2}>Panel Administracyjny</Title>
          <Group>
            <Button 
              leftIcon={<IconBell size={16} />}
              variant="light"
              color="blue"
            >
              Powiadomienia
            </Button>
            <Button 
              leftIcon={<IconReport size={16} />}
              variant="light"
              color="red"
            >
              Raporty
            </Button>
          </Group>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="overview" icon={<IconChartBar size={14} />}>
              Przegląd
            </Tabs.Tab>
            <Tabs.Tab value="categories" icon={<IconClock size={14} />}>
              Drzewka ofert
            </Tabs.Tab>
            <Tabs.Tab value="disputes" icon={<IconScale size={14} />}>
              Spory
            </Tabs.Tab>
            <Tabs.Tab value="verification" icon={<IconShieldCheck size={14} />}>
              Weryfikacja
            </Tabs.Tab>
            <Tabs.Tab value="reports" icon={<IconFileAnalytics size={14} />}>
              Raporty
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="md">
            <OverviewContent />
          </Tabs.Panel>

          <Tabs.Panel value="categories" pt="md">
            <TreeCategoriesConfig />
          </Tabs.Panel>

          <Tabs.Panel value="disputes" pt="md">
            <DisputeManagement />
          </Tabs.Panel>

          <Tabs.Panel value="verification" pt="md">
            <CompanyVerification />
          </Tabs.Panel>

          <Tabs.Panel value="reports" pt="md">
            <ReportAnalysis />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
