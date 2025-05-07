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
import { useJwtData } from '../../hooks/useJwtData';


export const QuickActions = ({ onActionSelect = () => {}, activeAction = null }) => {
  const { classes } = useStyles();
  const userData = useJwtData();


  const quickActions = [
    { id: 'dashboard', enable: true, title: userData?.role === 'CompanyAdmin' ? 'Panel zarządzania' : 'Moje informacje', icon: IconBuildingStore, color: 'blue', path: '/service-provider/dashboard' },
    { id: 'offers', enable: true, title: userData?.role === 'CompanyAdmin' ? 'Oferty pracowników' : 'Moja oferta', icon: IconShoppingBag, color: 'indigo', path: '/service-provider/offers' },
    { id: 'employees', enable: true, title: userData?.role === 'CompanyAdmin' ? 'Moi pracownicy' : 'Moje zlecenia', icon: IconUsers, color: 'green', path: '/service-provider/employees' },
    { id: 'wallet', enable: userData?.role === 'CompanyAdmin' , title: 'Portfel', icon: IconWallet, color: 'yellow', path: '/service-provider/wallet' },
    { id: 'payments', enable: userData?.role === 'CompanyAdmin' , title: 'Moje płatności', icon: IconReceipt, color: 'red', path: '/service-provider/payments' },
    { id: 'bookings', enable: true , title: 'Historia zapisów', icon: IconClipboardList, color: 'teal', path: '/service-provider/bookings' },
  ];

  

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
          {quickActions.filter(action => action.enable).map((action) => {
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