import { Paper, Title, Text, Stack, Group, ThemeIcon, Grid, Button, RingProgress } from '@mantine/core';
import { IconWallet, IconPlus, IconHistory } from '@tabler/icons-react';
import { useStyles } from './WalletManagement.styles';

export const WalletManagement = () => {
  const { classes } = useStyles();

  const walletData = {
    balance: 5000,
    pendingPayments: 2000,
    totalRevenue: 15000,
    monthlyRevenue: 8000,
    monthlyTarget: 10000,
  };

  return (
    <Paper p="xl" radius="md" withBorder className={classes.root}>
      <Stack spacing="xl">
        <Group position="apart">
          <Group>
            <ThemeIcon size={32} radius="md" variant="light" color="yellow">
              <IconWallet size={20} />
            </ThemeIcon>
            <Title order={2}>Zarządzanie portfelem</Title>
          </Group>
          <Group>
            <Button leftIcon={<IconPlus size={16} />} color="yellow">
              Wpłata
            </Button>
            <Button leftIcon={<IconHistory size={16} />} variant="light" color="yellow">
              Historia
            </Button>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Paper p="md" radius="md" withBorder className={classes.card}>
              <Stack spacing="md">
                <Text size="lg" weight={500}>Stan konta</Text>
                <Text size="xl" weight={700} color="yellow">
                  {walletData.balance} PLN
                </Text>
                <Text size="sm" color="dimmed">
                  Oczekujące płatności: {walletData.pendingPayments} PLN
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper p="md" radius="md" withBorder className={classes.card}>
              <Stack spacing="md">
                <Text size="lg" weight={500}>Przychody</Text>
                <Text size="xl" weight={700} color="green">
                  {walletData.totalRevenue} PLN
                </Text>
                <Text size="sm" color="dimmed">
                  W tym miesiącu: {walletData.monthlyRevenue} PLN
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper p="md" radius="md" withBorder className={classes.card}>
              <Stack spacing="md">
                <Text size="lg" weight={500}>Postęp miesięczny</Text>
                <Group position="apart">
                  <RingProgress
                    size={120}
                    thickness={12}
                    roundCaps
                    sections={[{ value: (walletData.monthlyRevenue / walletData.monthlyTarget) * 100, color: 'yellow' }]}
                  />
                  <Stack spacing={0}>
                    <Text size="xl" weight={700}>
                      {Math.round((walletData.monthlyRevenue / walletData.monthlyTarget) * 100)}%
                    </Text>
                    <Text size="sm" color="dimmed">
                      Cel: {walletData.monthlyTarget} PLN
                    </Text>
                  </Stack>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}; 