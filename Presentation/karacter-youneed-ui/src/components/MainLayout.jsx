import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppShell,
  Container,
  Group,
  Button,
  Title,
  Text,
  Burger,
  Menu,
  Box,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import { useNavigate } from 'react-router-dom';
import { ServiceProviderNavbar } from './service-provider-navbar/ServiceProviderNavbar';
import { useJwtData } from '../hooks/useJwtData';
import logo from '../assets/logo_white.png';
import { rem } from '@mantine/styles';

const COLORS = {
  primary: '#E3F2FD',
  secondary: '#BBDEFB',
  accent: '#90CAF9',
  text: '#2196F3',
  highlight: '#E1F5FE',
  background: '#F5FBFF',
};

const SPARKLES_COUNT = 70;

const useStyles = createStyles((theme) => ({
  '@keyframes sparkle': {
    '0%': { 
      opacity: 0,
      transform: 'scale(0) rotate(0deg)',
      filter: 'blur(0px)',
    },
    '50%': { 
      opacity: 'var(--sparkle-opacity, 0.6)',
      transform: 'scale(1) rotate(180deg)',
      filter: 'blur(1px)',
    },
    '100%': { 
      opacity: 0,
      transform: 'scale(0) rotate(360deg)',
      filter: 'blur(0px)',
    },
  },

  '@keyframes floatAround': {
    '0%': { transform: 'translate(0, 0)' },
    '33%': { transform: 'translate(10px, -10px)' },
    '66%': { transform: 'translate(-10px, 10px)' },
    '100%': { transform: 'translate(0, 0)' },
  },

  '@keyframes gradientFlow': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },

  pageWrapper: {
    background: COLORS.background,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(120deg, 
        ${COLORS.primary}60 0%, 
        ${COLORS.secondary}50 50%, 
        ${COLORS.highlight}40 100%)`,
      animation: 'gradientFlow 15s ease infinite',
      backgroundSize: '200% 200%',
      zIndex: 0,
    },
  },

  sparkle: {
    position: 'fixed',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary})`,
    animation: 'sparkle 3s infinite, floatAround 5s infinite ease-in-out',
    zIndex: 1,
    '--sparkle-opacity': 'var(--opacity, 0.6)',
    boxShadow: `0 0 2px ${COLORS.accent}`,
    pointerEvents: 'none',
  },

  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    margin: '0 auto',
  },
}));

const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { classes } = useStyles();
  const [sparkles, setSparkles] = useState([]);
  const navigate = useNavigate();
  const userData = useJwtData();
  useEffect(() => {
    const generateSparkles = () => {
      return Array.from({ length: SPARKLES_COUNT }, () => ({
        id: Math.random(),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    setSparkles(generateSparkles());
    const interval = setInterval(() => {
      setSparkles(generateSparkles());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.pageWrapper}>

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={classes.sparkle}
          style={{
            top: sparkle.top,
            left: sparkle.left,
            animationDelay: sparkle.delay,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
          }}
        />
      ))}
      <AppShell
        header={{ height: 70 }}
        padding={0}
        styles={{
          main: {
            padding: 0,
            width: '100%',
          }
        }}
      >
        <AppShell.Header
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${COLORS.primary}`,
            position: 'relative',
            zIndex: 3,
          }}
        >
          <Container size="xl" h="100%">
            <Group h="100%" justify="space-between">
              <Group>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  color={COLORS.text}
                />
                <Link to="/" style={{ textDecoration: 'none' }}>
                <Image
                src={logo}
                alt="YouNeed Logo"
                width={85}
                style={{ 
                  marginTop: '-5px',
                  filter: 'brightness(0)', 
                  height: '80px',
                  objectFit: 'contain',
                }}
              />
                </Link>
              </Group>

              <Group gap="md" visibleFrom="sm">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.to}
                    variant="subtle"
                    styles={{
                      root: {
                        color: COLORS.text,
                        fontWeight: 500,
                        padding: '8px 16px',
                        '&:hover': {
                          background: COLORS.primary,
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

            {(!localStorage.getItem('token') && !sessionStorage.getItem('token')) ? (
              <>
                <Button
                  variant="outline"
                  styles={{
                    root: {
                      borderColor: COLORS.accent,
                      color: COLORS.text,
                      '&:hover': {
                        background: COLORS.primary,
                        borderColor: COLORS.text,
                      },
                    },
                  }}
                  onClick={() => navigate('/add-service-provider')}
                >
                  Zostań Usługodawcą
                </Button>

                <Button
                  variant="filled"
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.text})`,
                      border: 'none',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${COLORS.text}, ${COLORS.accent})`,
                      },
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Zaloguj się
                </Button>
              </>
            ) : (
              <>
              {userData && userData.role === 'CompanyAdmin' ? (
                <ServiceProviderNavbar />
              ) : (
                 <ServiceProviderNavbar />
                // <> </>
              )}
              </>
            )}
              </Group>

              <Menu
                shadow="md"
                width={200}
                hidden={!opened}
                hiddenFrom="sm"
                position="bottom-end"
              >
                <Menu.Target>
                  <Button
                    variant="subtle"
                    styles={{
                      root: {
                        color: COLORS.text,
                        '&:hover': { background: COLORS.primary },
                      },
                    }}
                  >
                    Menu
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  {navItems.map((item) => (
                    <Menu.Item
                      key={item.label}
                      component={Link}
                      to={item.to}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                  <Menu.Divider />
                  <Menu.Item
                    style={{
                      color: COLORS.text,
                      fontWeight: 500,
                    }}
                    onClick={() => navigate('/register-provider')}
                  >
                    Zostań Usługodawcą
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      color: COLORS.text,
                      fontWeight: 500,
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Zaloguj się
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="xl" className={classes.content} px={0}>
            <Outlet />
          </Container>
        </AppShell.Main>

        <Group
          styles={(theme) => ({
            root: {
              borderTop: `1px solid rgba(189, 189, 189, 0.5)`,
              background: theme.white,
              padding: theme.spacing.md,
              marginTop: 'auto',
              boxShadow: '0 -4px 12px rgba(224, 224, 224, 0.15)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${theme.colors.blue[3]}, ${theme.colors.blue[5]}, ${theme.colors.blue[3]})`,
                opacity: 0.7
              }
            }
          })}
        >
          <Group position="center">
            <Text
              component="a" 
              href="https://karacter.type.com"
              target="_blank"
              rel="noopener noreferrer"
              styles={(theme) => ({
                root: {
                  color: COLORS.text,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: theme.colors.blue[7],
                    transform: 'translateY(-2px)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }
                }
              })}
            >
              Created with passion by <span style={{
                fontWeight: 600,
                background: `linear-gradient(120deg, ${COLORS.accent}, ${COLORS.text})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                padding: '0 4px'
              }}>KARacter.type.com</span>
            </Text>
          </Group>
        </Group>
      </AppShell>
      
    </div>
  );
};

const navItems = [
  { label: 'Strona Główna', to: '/' },
  { label: 'Funkcje', to: '/features' },
  { label: 'O Nas', to: '/about' },
];

export default MainLayout;
