import { Paper, Stack, Group, ThemeIcon, Title, Button, Tabs } from '@mantine/core';
import { IconBuilding, IconUsers, IconClock, IconMap2, IconEdit, IconCoffee } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { CompanyBasicInfo } from './CompanyBasicInfo';
import { CompanyContactInfo } from './CompanyContactInfo';
import { CompanyUsers } from './CompanyUsers';
import { CompanySchedules } from './CompanySchedules';
import { CompanyWorkAreas } from './CompanyWorkAreas';
import { CompanyBreakSettings } from './CompanyBreakSettings';

// Funkcja pomocnicza do konwersji czasu z formatu "HH:mm" na format TimeSpan


export const CompanyManagement = ({ dashboardData }) => {
  const { classes } = useStyles();

  return (
    <Paper p="xl" radius="md" withBorder className={classes.root}>
      <Stack spacing="xl">
        <Group position="apart">
          <Group>
            <ThemeIcon size={32} radius="md" variant="light" color="blue">
              <IconBuilding size={20} />
            </ThemeIcon>
            <Title order={2}>Zarządzanie firmą</Title>
          </Group>
          <Button leftIcon={<IconEdit size={16} />} color="blue">
            Edytuj dane
          </Button>
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
          <CompanyUsers users={dashboardData?.companyUsers} fetchDashboardData={fetchDashboardData} companyId={dashboardData?.Company?.Id} />
          </Tabs.Panel>

          <Tabs.Panel value="schedules" pt="xl">
            <CompanySchedules schedules={dashboardData?.workSchedules} companyId={dashboardData?.company?.id} users={dashboardData?.companyUsers} fetchDashboardData={fetchDashboardData} />
          </Tabs.Panel>

          <Tabs.Panel value="areas" pt="xl">
            <CompanyWorkAreas areas={dashboardData?.workAreas} />
          </Tabs.Panel>

          <Tabs.Panel value="breaks" pt="xl">
            <CompanyBreakSettings breakSettings={dashboardData?.breakSettings} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );
}; 