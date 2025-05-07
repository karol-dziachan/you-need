import {
  Container,
  Title,
  Text,
  Paper,
  Accordion,
  ThemeIcon,
  List,
  Box,
  Divider,
  Group,
  Button,
  Stack,
  Timeline,
  Badge,
  Alert,
} from '@mantine/core';
import {
  IconGavel,
  IconShieldCheck,
  IconUserCheck,
  IconAlertCircle,
  IconFileCheck,
  IconClock,
  IconMoneybag,
  IconLock,
  IconMessage,
  IconScale,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useStyles } from './TermsOfService.styles';

const MotionPaper = motion(Paper);

export const TermsOfServicePage = () => {
  const { classes } = useStyles();
  const currentDate = new Date().toLocaleDateString('pl-PL');

  return (
    <Container size="lg" py="xl" className={classes.container}>
      <Stack spacing="xl">
        <Group position="center">
          <ThemeIcon size={60} radius="xl" variant="light" color="blue">
            <IconGavel size={30} />
          </ThemeIcon>
        </Group>

        <Title align="center" order={1} className={classes.title}>
          Regulamin Serwisu YouNeed
        </Title>
        <Text align="center" color="dimmed" size="sm">
          Ostatnia aktualizacja: {currentDate}
        </Text>

        <Alert 
          icon={<IconAlertCircle size={16} />} 
          color="blue"
          className={classes.alert}
        >
          Prosimy o dokładne zapoznanie się z treścią regulaminu przed rozpoczęciem korzystania z serwisu.
        </Alert>

        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          shadow="md"
          radius="md"
          p="xl"
          withBorder
          className={classes.paper}
        >
          <Stack spacing="xl">
            <Text size="lg">
              Niniejszy regulamin określa zasady korzystania z serwisu YouNeed, platformy łączącej usługodawców z klientami.
            </Text>

            <Accordion 
              multiple 
              variant="separated"
              classNames={{
                control: classes.accordionControl,
                item: classes.accordionItem,
                icon: classes.accordionIcon,
              }}
            >
              <Accordion.Item value="definitions">
                <Accordion.Control icon={<IconFileCheck size={20} />}>
                  §1 Definicje
                </Accordion.Control>
                <Accordion.Panel>
                  <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                    <List.Item>
                      <Text weight={500}>Serwis</Text> - platforma internetowa YouNeed dostępna pod adresem www.youneed.pl
                    </List.Item>
                    <List.Item>
                      <Text weight={500}>Usługodawca</Text> - osoba fizyczna lub prawna świadcząca usługi za pośrednictwem Serwisu
                    </List.Item>
                    <List.Item>
                      <Text weight={500}>Klient</Text> - osoba korzystająca z usług oferowanych przez Usługodawców
                    </List.Item>
                    <List.Item>
                      <Text weight={500}>Profil</Text> - indywidualne konto Usługodawcy lub Klienta w Serwisie
                    </List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="general">
                <Accordion.Control icon={<IconShieldCheck size={20} />}>
                  §2 Postanowienia Ogólne
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text>1. Serwis YouNeed umożliwia:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Publikowanie ofert usług przez Usługodawców</List.Item>
                      <List.Item>Wyszukiwanie i zamawianie usług przez Klientów</List.Item>
                      <List.Item>Komunikację między Usługodawcami a Klientami</List.Item>
                      <List.Item>System ocen i recenzji</List.Item>
                    </List>
                    <Text>2. Korzystanie z Serwisu jest dobrowolne i oznacza akceptację niniejszego regulaminu.</Text>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="registration">
                <Accordion.Control icon={<IconUserCheck size={20} />}>
                  §3 Rejestracja i Prowadzenie Konta
                </Accordion.Control>
                <Accordion.Panel>
                  <Timeline 
                    active={-1} 
                    bulletSize={24} 
                    lineWidth={2}
                    className={classes.timeline}
                  >
                    <Timeline.Item bullet={<IconUserCheck size={12} />} title="Proces Rejestracji">
                      <Text color="dimmed" size="sm">Wymaga podania prawdziwych danych oraz weryfikacji email</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconLock size={12} />} title="Bezpieczeństwo Konta">
                      <Text color="dimmed" size="sm">Użytkownik zobowiązany jest do zachowania poufności danych logowania</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconFileCheck size={12} />} title="Weryfikacja">
                      <Text color="dimmed" size="sm">Usługodawcy przechodzą dodatkową weryfikację tożsamości</Text>
                    </Timeline.Item>
                  </Timeline>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="services">
                <Accordion.Control icon={<IconMoneybag size={20} />}>
                  §4 Świadczenie Usług
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text weight={500}>Zasady świadczenia usług:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Usługi muszą być zgodne z prawem i dobrymi obyczajami</List.Item>
                      <List.Item>Ceny usług powinny być jasno określone</List.Item>
                      <List.Item>Usługodawca zobowiązuje się do terminowej realizacji</List.Item>
                      <List.Item>Możliwość anulowania usługi na określonych warunkach</List.Item>
                    </List>
                    <Badge color="blue" size="lg" radius="sm" className={classes.badge}>
                      Standardy Jakości
                    </Badge>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Profesjonalna obsługa klienta</List.Item>
                      <List.Item>Zgodność z opisem usługi</List.Item>
                      <List.Item>Przestrzeganie ustalonych terminów</List.Item>
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="payments">
                <Accordion.Control icon={<IconMoneybag size={20} />}>
                  §5 Płatności i Prowizje
                </Accordion.Control>
                <Accordion.Panel>
                  <Box>
                    <Text weight={500} mb="md">System płatności w serwisie:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Bezpieczne płatności online</List.Item>
                      <List.Item>Prowizja serwisu: 10% wartości usługi</List.Item>
                      <List.Item>14-dniowy okres na rozliczenie</List.Item>
                      <List.Item>Możliwość płatności ratalnych</List.Item>
                    </List>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="privacy">
                <Accordion.Control icon={<IconLock size={20} />}>
                  §6 Ochrona Danych Osobowych
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text>Serwis zobowiązuje się do:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Ochrony danych zgodnie z RODO</List.Item>
                      <List.Item>Nieudostępniania danych osobom trzecim</List.Item>
                      <List.Item>Zabezpieczenia technicznego danych</List.Item>
                      <List.Item>Regularnych audytów bezpieczeństwa</List.Item>
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="disputes">
                <Accordion.Control icon={<IconScale size={20} />}>
                  §7 Rozwiązywanie Sporów
                </Accordion.Control>
                <Accordion.Panel>
                  <Timeline 
                    active={-1} 
                    bulletSize={24} 
                    lineWidth={2}
                    className={classes.timeline}
                  >
                    <Timeline.Item bullet={<IconMessage size={12} />} title="Mediacja">
                      <Text color="dimmed" size="sm">Pierwszym krokiem jest próba polubownego rozwiązania</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconScale size={12} />} title="Arbitraż">
                      <Text color="dimmed" size="sm">W przypadku braku porozumienia - arbitraż serwisu</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconGavel size={12} />} title="Sąd">
                      <Text color="dimmed" size="sm">Ostateczne rozstrzygnięcie przed sądem właściwym</Text>
                    </Timeline.Item>
                  </Timeline>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="termination">
                <Accordion.Control icon={<IconClock size={20} />}>
                  §8 Wypowiedzenie Umowy
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text>Warunki wypowiedzenia:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>14-dniowy okres wypowiedzenia</List.Item>
                      <List.Item>Rozliczenie aktywnych zleceń</List.Item>
                      <List.Item>Archiwizacja danych przez 6 miesięcy</List.Item>
                      <List.Item>Możliwość natychmiastowego wypowiedzenia w przypadku naruszenia regulaminu</List.Item>
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <Divider my="xl" className={classes.divider} />

            <Box>
              <Text size="sm" color="dimmed" align="center">
                Regulamin wchodzi w życie z dniem {currentDate}. Serwis zastrzega sobie prawo do wprowadzania zmian w regulaminie, 
                o których użytkownicy będą informowani z 14-dniowym wyprzedzeniem.
              </Text>
            </Box>

            <Group position="center">
              <Button
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                size="md"
                radius="xl"
                leftIcon={<IconFileCheck size={20} />}
                className={classes.button}
              >
                Akceptuję Regulamin
              </Button>
            </Group>
          </Stack>
        </MotionPaper>
      </Stack>
    </Container>
  );
};
