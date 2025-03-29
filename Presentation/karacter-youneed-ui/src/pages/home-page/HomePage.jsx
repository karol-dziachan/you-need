import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  ThemeIcon,
  Box,
  SimpleGrid,
} from '@mantine/core';
import { IconStarFilled, IconHeartHandshake, IconBuildingStore } from '@tabler/icons-react';
import { useStyles } from './HomePage.styles.js';

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container size="lg">
      <Box className={classes.heroSection}>
        <Stack spacing="xl" align="center">
          <Title 
            className={classes.title} 
            order={1}
            sx={(theme) => ({
              transform: 'perspective(1500px) rotateX(15deg) rotateY(5deg)',
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 0 0 20px rgba(144,202,249,0.5)',
              animation: 'float 4s ease-in-out infinite',
              background: `linear-gradient(120deg, ${theme.colors.blue[3]}, ${theme.colors.blue[4]}, ${theme.colors.blue[5]}, ${theme.colors.blue[6]})`,
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient 8s ease infinite'
            })}
          >
            YouNeed - Odkryj Nowy Wymiar Usług
          </Title>

          <Text 
            className={classes.description}
            sx={(theme) => ({
              backdropFilter: 'blur(15px)',
              background: `linear-gradient(135deg, ${theme.fn.rgba(theme.white, 0.2)}, ${theme.fn.rgba(theme.white, 0.1)})`,
              padding: theme.spacing.xl * 2,
              borderRadius: theme.radius.xl * 2,
              boxShadow: `0 12px 45px 0 ${theme.fn.rgba(theme.colors.blue[9], 0.25)}, inset 0 0 20px ${theme.fn.rgba(theme.white, 0.3)}`,
              border: `2px solid ${theme.fn.rgba(theme.white, 0.3)}`,
              transform: 'translateZ(30px) perspective(1000px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateZ(40px) perspective(1000px) scale(1.02)',
                boxShadow: `0 20px 60px 0 ${theme.fn.rgba(theme.colors.blue[9], 0.35)}, inset 0 0 30px ${theme.fn.rgba(theme.white, 0.4)}`
              }
            })}
          >
            Wkraczamy w erę, gdzie znalezienie idealnego profesjonalisty staje się intuicyjne jak nigdy dotąd.
            Nasza innowacyjna platforma nie tylko łączy - ona tworzy harmonijny ekosystem, gdzie jakość spotyka się z wygodą.
            Dołącz do rewolucji w świecie usług i stań się częścią przyszłości, którą wspólnie kształtujemy.
          </Text>

          <Group mt="xl" spacing="md">
            <Button 
              className={classes.actionButton}
              size="xl" 
              sx={(theme) => ({
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(-45deg, ${theme.colors.blue[3]}, ${theme.colors.blue[4]}, ${theme.colors.blue[5]}, ${theme.colors.blue[6]})`,
                backgroundSize: '400% 400%',
                animation: 'gradientBg 15s ease infinite',
                border: `3px solid ${theme.fn.rgba(theme.white, 0.3)}`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-60%',
                  left: '-60%',
                  width: '220%',
                  height: '220%',
                  background: `conic-gradient(from 0deg, transparent, ${theme.fn.rgba(theme.white, 0.8)}, transparent 20%)`,
                  animation: 'rotate 3s linear infinite'
                },
                '&:hover': {
                  transform: 'scale(1.08) translateY(-8px)',
                  boxShadow: `0 25px 50px ${theme.fn.rgba(theme.colors.blue[3], 0.5)}, 0 0 30px ${theme.fn.rgba(theme.colors.blue[6], 0.4)}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }
              })}
              onClick={() => {
                
              }}
            >
              Rozpocznij Swoją Przygodę
            </Button>
          </Group>
        </Stack>
      </Box>

      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
        mt={100}
      >
        {features.map((feature, index) => (
          <Paper key={index} className={classes.featureCard}>
            <ThemeIcon size={60} radius="md" className={classes.featureIcon}>
              <feature.icon size={30} />
            </ThemeIcon>
            <Text className={classes.featureTitle}>{feature.title}</Text>
            <Text className={classes.featureDescription}>{feature.description}</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}

const features = [
  {
    icon: IconStarFilled,
    title: 'Innowacyjne Rozwiązania',
    description: 'Wykorzystujemy najnowsze technologie, aby zapewnić najlepsze doświadczenia zarówno usługodawcom, jak i klientom.',
  },
  {
    icon: IconHeartHandshake,
    title: 'Społeczność Ekspertów',
    description: 'Budujemy elitarną społeczność profesjonalistów, gdzie jakość i zaufanie są najważniejsze.',
  },
  {
    icon: IconBuildingStore,
    title: 'Twoje Miejsce w Sieci',
    description: 'Oferujemy zaawansowane narzędzia do zarządzania Twoim biznesem i budowania profesjonalnego wizerunku online.',
  },
];
