import { Group, Menu, Avatar, Text, UnstyledButton, Stack } from '@mantine/core';
import {
  IconLogout,
  IconBuildingStore,
  IconUsers,
  IconWallet,
  IconClipboardList,
  IconShoppingBag,
  IconReceipt,
  IconChevronDown,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useJwtData } from '../../hooks/useJwtData';
import { useStyles } from './ServiceProviderNavbar.styles';

export const ServiceProviderNavbar = () => {

  const navigate = useNavigate();
  const userData = useJwtData();
  const { classes } = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  if (!userData) return null;

  return (
    <Group position="right" p="md">
      <Menu
        position="bottom-end"
        offset={5}
        withArrow
        width={260}
        shadow="md"
        transitionProps={{ transition: 'pop-top-right', duration: 150 }}
      >
        <Menu.Target>
          <UnstyledButton className={classes.avatar}>
            <Group spacing="xs">
              <Avatar 
                color="blue" 
                radius="xl" 
                size="md"
              >
                {userData.initials}
              </Avatar>
              <IconChevronDown size={14} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <div className={classes.userInfo}>
            <Text className={classes.userEmail}>{userData.email}</Text>
            <Text className={classes.userRole}>Usługodawca</Text>
          </div>

          <Menu.Label className={classes.menuLabel}>Zarządzanie kontem</Menu.Label>
                    
          <Menu.Item
            className={classes.menuItem}
            icon={<IconBuildingStore size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/account/change-password')}
          >
            Zmień hasło
          </Menu.Item>
          

          <Menu.Label className={classes.menuLabel}>Zarządzanie firmą</Menu.Label>
          
          <Menu.Item
            className={classes.menuItem}
            icon={<IconBuildingStore size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/dashboard')}
          >
            {userData?.role === 'CompanyAdmin' ? 'Panel zarządzania' : 'Moje informacje'}
          </Menu.Item>
          
          <Menu.Item
            className={classes.menuItem}
            icon={<IconUsers size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/employees')}
          >
            {userData?.role === 'CompanyAdmin' ? 'Moi pracownicy' : 'Moje zlecenia'}
          </Menu.Item>

          {userData?.role === 'CompanyAdmin' && (
          <Menu.Label className={classes.menuLabel}>Finanse</Menu.Label>
          )}
          
          {userData?.role === 'CompanyAdmin' && (
          <Menu.Item
            className={classes.menuItem}
            icon={<IconWallet size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/wallet')}
          >
            Portfel
          </Menu.Item>
          )}
          {userData?.role === 'CompanyAdmin' && (
          <Menu.Item
            className={classes.menuItem}
            icon={<IconReceipt size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/payments')}
          >
            Moje płatności
          </Menu.Item>
          )}
          <Menu.Label className={classes.menuLabel}>Usługi</Menu.Label>
          
          <Menu.Item
            className={classes.menuItem}
            icon={<IconShoppingBag size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/offers')}
          >
            Moja oferta
          </Menu.Item>
          
          <Menu.Item
            className={classes.menuItem}
            icon={<IconClipboardList size={16} className={classes.menuIcon} />}
            onClick={() => navigate('/service-provider/bookings')}
          >
            Historia zapisów
          </Menu.Item>

          <Menu.Divider className={classes.menuDivider} />
          
          <Menu.Item
            className={classes.menuItem}
            color="red"
            icon={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Wyloguj się
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
