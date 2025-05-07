import { Paper, Group, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUsers, IconChecklist, IconCalendarTime, IconChartBar } from '@tabler/icons-react';

const stats = [
  { title: 'Aktywni klienci', value: '0', icon: IconUsers, color: 'blue' },
  { title: 'Zrealizowane usługi', value: '0', icon: IconChecklist, color: 'green' },
  { title: 'Oczekujące zlecenia', value: '0', icon: IconCalendarTime, color: 'yellow' },
  { title: 'Średnia ocena', value: '0.0', icon: IconChartBar, color: 'red' },
];

export const Stats = () => {
  return (
    <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
      {stats.map((stat) => (
        <Paper key={stat.title} p="md" radius="md" withBorder>
          <Group>
            <ThemeIcon size={26} radius="md" variant="light" color={stat.color}>
              <stat.icon size={16} />
            </ThemeIcon>
            <div>
              <Text size="xs" color="dimmed" weight={500}>
                {stat.title}
              </Text>
              <Text weight={700} size="xl">
                {stat.value}
              </Text>
            </div>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}; 