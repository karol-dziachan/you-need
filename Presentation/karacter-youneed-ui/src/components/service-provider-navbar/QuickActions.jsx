import { Paper, Title, Stack, Card, Group, Text, ThemeIcon } from '@mantine/core';
import {
  IconBuildingStore,
  IconUsers,
  IconWallet,
  IconClipboardList,
  IconShoppingBag,
  IconReceipt,
} from '@tabler/icons-react';
import { useStyles } from './QuickActions.styles';

const quickActions = [
  { id: 'dashboard', title: 'Panel zarządzania', icon: IconBuildingStore, color: 'blue', path: '/service-provider/dashboard' },
  { id: 'employees', title: 'Moi pracownicy', icon: IconUsers, color: 'green', path: '/service-provider/employees' },
  { id: 'wallet', title: 'Portfel', icon: IconWallet, color: 'yellow', path: '/service-provider/wallet' },
  { id: 'payments', title: 'Moje płatności', icon: IconReceipt, color: 'red', path: '/service-provider/payments' },
  { id: 'offers', title: 'Moja oferta', icon: IconShoppingBag, color: 'indigo', path: '/service-provider/offers' },
  { id: 'bookings', title: 'Historia zapisów', icon: IconClipboardList, color: 'teal', path: '/service-provider/bookings' },
];

export const QuickActions = ({ onActionSelect = () => {}, activeAction = null }) => {
  const { classes } = useStyles();

  const handleClick = (actionId) => {
    if (typeof onActionSelect === 'function') {
      onActionSelect(actionId);
    }
  };

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack spacing="md">
        <Title order={2}>Szybkie akcje</Title>
        <Stack spacing="sm">
          {quickActions.map((action) => {
            const isActive = action.id === activeAction;
            return (
              <Card
                key={action.id}
                className={`${classes.card} ${isActive ? classes.activeCard : ''}`}
                onClick={() => handleClick(action.id)}
                p="md"
                radius="md"
                withBorder
              >
                <Group>
                  <ThemeIcon 
                    size={32} 
                    radius="md" 
                    variant={isActive ? "filled" : "light"} 
                    color={action.color}
                  >
                    <action.icon size={20} />
                  </ThemeIcon>
                  <Text className={`${classes.text} ${isActive ? classes.activeText : ''}`}>
                    {action.title}
                  </Text>
                </Group>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}; 