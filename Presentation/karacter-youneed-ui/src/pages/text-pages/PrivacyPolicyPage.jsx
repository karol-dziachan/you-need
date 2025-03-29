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
  Grid,
  Card,
} from '@mantine/core';
import {
  IconLock,
  IconShieldLock,
  IconUserCircle,
  IconAlertCircle,
  IconCookie,
  IconServer,
  IconShare,
  IconTrash,
  IconFileDescription,
  IconWorld,
  IconMail,
  IconClipboardCheck,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useStyles } from './PrivacyPolicy.styles';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

export const PrivacyPolicyPage = () => {
  const { classes } = useStyles();
  const currentDate = new Date().toLocaleDateString('pl-PL');

  const dataProcessingCards = [
    {
      title: 'Dane Osobowe',
      icon: IconUserCircle,
      content: 'Imię, nazwisko, adres email, numer telefonu',
    },
    {
      title: 'Dane Techniczne',
      icon: IconServer,
      content: 'Adres IP, informacje o urządzeniu, logi systemowe',
    },
    {
      title: 'Pliki Cookie',
      icon: IconCookie,
      content: 'Preferencje użytkownika, dane sesji, statystyki',
    },
    {
      title: 'Dane Transakcyjne',
      icon: IconClipboardCheck,
      content: 'Historia zamówień, płatności, oceny usług',
    },
  ];

  return (
    <Container size="lg" py="xl" className={classes.container}>
      <Stack spacing="xl">
        <Group position="center">
          <ThemeIcon size={60} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            <IconShieldLock size={30} />
          </ThemeIcon>
        </Group>

        <Title align="center" order={1} className={classes.title}>
          Polityka Prywatności YouNeed
        </Title>
        <Text align="center" color="dimmed" size="sm">
          Ostatnia aktualizacja: {currentDate}
        </Text>

        <Alert 
          icon={<IconAlertCircle size={16} />} 
          color="blue"
          className={classes.alert}
        >
          Dbamy o Twoją prywatność. Przeczytaj uważnie poniższe informacje, aby dowiedzieć się, jak chronimy Twoje dane.
        </Alert>

        <Grid gutter="md" className={classes.cardGrid}>
          {dataProcessingCards.map((card, index) => (
            <Grid.Col key={card.title} xs={12} sm={6}>
              <MotionCard
                withBorder
                radius="md"
                className={classes.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card.Section className={classes.cardHeader}>
                  <ThemeIcon size={40} radius="xl" variant="light">
                    <card.icon size={20} />
                  </ThemeIcon>
                  <Text weight={500} size="lg" mt="md">
                    {card.title}
                  </Text>
                </Card.Section>
                <Text size="sm" color="dimmed" mt="sm">
                  {card.content}
                </Text>
              </MotionCard>
            </Grid.Col>
          ))}
        </Grid>

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
              W YouNeed przywiązujemy najwyższą wagę do ochrony Twoich danych osobowych. Działamy zgodnie z Rozporządzeniem o Ochronie Danych Osobowych (RODO) oraz innymi obowiązującymi przepisami prawa.
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
              <Accordion.Item value="dataCollection">
                <Accordion.Control icon={<IconFileDescription size={20} />}>
                  §1 Gromadzenie Danych
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text weight={500}>Gromadzimy następujące dane:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Dane podane podczas rejestracji i w profilu</List.Item>
                      <List.Item>Informacje o korzystaniu z serwisu</List.Item>
                      <List.Item>Dane dotyczące urządzeń i przeglądarek</List.Item>
                      <List.Item>Historia transakcji i komunikacji</List.Item>
                    </List>
                    <Text size="sm" color="dimmed">
                      Wszystkie dane są zbierane zgodnie z zasadą minimalizacji danych i przetwarzane tylko w niezbędnym zakresie.
                    </Text>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="dataPurpose">
                <Accordion.Control icon={<IconWorld size={20} />}>
                  §2 Cel Przetwarzania Danych
                </Accordion.Control>
                <Accordion.Panel>
                  <Timeline active={-1} bulletSize={24} lineWidth={2} className={classes.timeline}>
                    <Timeline.Item bullet={<IconUserCircle size={12} />} title="Świadczenie Usług">
                      <Text color="dimmed" size="sm">Realizacja zamówień, obsługa płatności, komunikacja</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconServer size={12} />} title="Bezpieczeństwo">
                      <Text color="dimmed" size="sm">Ochrona przed nadużyciami, weryfikacja tożsamości</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconMail size={12} />} title="Komunikacja">
                      <Text color="dimmed" size="sm">Powiadomienia, newsletter (za zgodą), obsługa zapytań</Text>
                    </Timeline.Item>
                  </Timeline>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="cookies">
                <Accordion.Control icon={<IconCookie size={20} />}>
                  §3 Polityka Cookies
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text weight={500}>Rodzaje wykorzystywanych plików cookie:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Niezbędne - wymagane do działania serwisu</List.Item>
                      <List.Item>Funkcjonalne - zapamiętywanie preferencji</List.Item>
                      <List.Item>Analityczne - badanie ruchu na stronie</List.Item>
                      <List.Item>Marketingowe - wymagają osobnej zgody</List.Item>
                    </List>
                    <Badge color="blue" size="lg" radius="sm" className={classes.badge}>
                      Zarządzaj Cookies
                    </Badge>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="dataSharing">
                <Accordion.Control icon={<IconShare size={20} />}>
                  §4 Udostępnianie Danych
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text>Twoje dane mogą być udostępniane:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Dostawcom usług płatniczych</List.Item>
                      <List.Item>Firmom kurierskim (w przypadku dostaw)</List.Item>
                      <List.Item>Organom państwowym (gdy wymaga tego prawo)</List.Item>
                    </List>
                    <Text size="sm" color="dimmed">
                      Każde udostępnienie danych odbywa się z zachowaniem odpowiednich środków bezpieczeństwa.
                    </Text>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="security">
                <Accordion.Control icon={<IconLock size={20} />}>
                  §5 Bezpieczeństwo Danych
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="md">
                    <Text weight={500}>Stosujemy następujące zabezpieczenia:</Text>
                    <List spacing="xs" size="sm" classNames={{ item: classes.listItem }}>
                      <List.Item>Szyfrowanie SSL/TLS</List.Item>
                      <List.Item>Regularne audyty bezpieczeństwa</List.Item>
                      <List.Item>Kontrola dostępu do danych</List.Item>
                      <List.Item>Kopie zapasowe i procedury odzyskiwania</List.Item>
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="rights">
                <Accordion.Control icon={<IconUserCircle size={20} />}>
                  §6 Prawa Użytkownika
                </Accordion.Control>
                <Accordion.Panel>
                  <Timeline active={-1} bulletSize={24} lineWidth={2} className={classes.timeline}>
                    <Timeline.Item bullet={<IconFileDescription size={12} />} title="Dostęp do Danych">
                      <Text color="dimmed" size="sm">Prawo do uzyskania kopii swoich danych</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconTrash size={12} />} title="Usunięcie Danych">
                      <Text color="dimmed" size="sm">Prawo do bycia zapomnianym</Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<IconClipboardCheck size={12} />} title="Sprostowanie">
                      <Text color="dimmed" size="sm">Prawo do poprawienia nieprawidłowych danych</Text>
                    </Timeline.Item>
                  </Timeline>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <Divider my="xl" className={classes.divider} />

            <Box>
              <Text size="sm" color="dimmed" align="center">
                W przypadku pytań dotyczących ochrony danych osobowych, prosimy o kontakt z naszym Inspektorem Ochrony Danych: 
                <Text component="span" weight={500}> iod@youneed.pl</Text>
              </Text>
            </Box>

            <Group position="center" spacing="md">
              <Button
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                size="md"
                radius="xl"
                leftIcon={<IconClipboardCheck size={20} />}
                className={classes.button}
              >
                Akceptuję Politykę Prywatności
              </Button>
              <Button
                variant="light"
                color="gray"
                size="md"
                radius="xl"
                leftIcon={<IconCookie size={20} />}
                className={classes.button}
              >
                Ustawienia Cookie
              </Button>
            </Group>
          </Stack>
        </MotionPaper>
      </Stack>
    </Container>
  );
};
