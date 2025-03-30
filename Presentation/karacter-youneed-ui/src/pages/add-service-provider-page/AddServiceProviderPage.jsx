import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Stack, 
  Paper, 
  Stepper, 
  Group, 
  TextInput, 
  Textarea, 
  ActionIcon, 
  Card, 
  NumberInput,
  ThemeIcon,
  Transition,
  Divider,
  Badge,
  Tooltip,
  RingProgress,
  Box,
  List,
  Grid,
  PasswordInput
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { 
  IconTrash, 
  IconPlus, 
  IconBuilding, 
  IconId, 
  IconMail, 
  IconWorld, 
  IconPhone, 
  IconMapPin, 
  IconMap2,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconLock,
  IconUser,
  IconX
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useApi } from '../../hooks/useApi';
import { useClasses } from '../../hooks/useClasses';
import { useNotificationStyles } from '../../styles/notifications.styles';

export const AddServiceProviderPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [active, setActive] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const api = useApi();
  const classes = useClasses();
  const { classes: notificationClasses } = useNotificationStyles();

  const form = useForm({
    initialValues: {
      // Dane firmy
      companyName: '',
      nip: '',
      regon: '',
      email: '',
      website: '',
      description: '',
      phoneNumber: '',
      
      // Adres główny firmy
      address: '',
      city: '',
      postalCode: '',

      // Obszary działania
      workAreas: [
        {
          city: '',
          postalCode: '',
          district: '',
          radiusInKm: null,
          additionalInfo: '',
        },
      ],
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validate: {
      companyName: (value) => (value.length < 2 ? 'Nazwa firmy jest wymagana' : null),
      nip: (value) => (!value ? 'NIP jest wymagany' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Nieprawidłowy format email'),
      phoneNumber: (value) => (!value ? 'Numer telefonu jest wymagany' : null),
      address: (value) => (!value ? 'Adres jest wymagany' : null),
      city: (value) => (!value ? 'Miasto jest wymagane' : null),
      postalCode: (value) => (!value ? 'Kod pocztowy jest wymagany' : null),
      workAreas: {
        city: (value) => (!value ? 'Miasto jest wymagane' : null),
        postalCode: (value) => (!value ? 'Kod pocztowy jest wymagany' : null),
        district: (value) => (!value ? 'Dzielnica jest wymagana' : null),
      },
      password: (value) => (
        value.length < 8 
          ? 'Hasło musi mieć minimum 8 znaków'
          : !value.match(/[A-Z]/)
          ? 'Hasło musi zawierać wielką literę'
          : !value.match(/[0-9]/)
          ? 'Hasło musi zawierać cyfrę'
          : null
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Hasła nie są identyczne' : null,
      firstName: (value) => (value.length < 2 ? 'Imię jest wymagane' : null),
      lastName: (value) => (value.length < 2 ? 'Nazwisko jest wymagane' : null),
    },
  });

  const nextStep = () => {
    console.log('Próba przejścia do następnego kroku:', active);
    console.log('Aktualne wartości formularza:', form.values);
    console.log('Błędy formularza:', form.errors);

    const validationMap = {
      0: ['companyName', 'nip', 'regon', 'email', 'website', 'firstName', 'lastName', 'password', 'confirmPassword'],
      1: ['description', 'phoneNumber'],
      2: ['address', 'city', 'postalCode'],
      3: ['workAreas'],
    };

    const currentStepFields = validationMap[active] || [];
    
    if (active === 3) {
      // Specjalna walidacja dla obszarów działania
      const isWorkAreasValid = form.values.workAreas.every((area, index) => {
        const requiredFields = ['city', 'postalCode', 'district'];
        const hasErrors = requiredFields.some(field => {
          const hasError = !area[field];
          if (hasError) {
            form.setFieldError(`workAreas.${index}.${field}`, 'To pole jest wymagane');
          }
          return hasError;
        });
        return !hasErrors;
      });
      
      console.log('Walidacja obszarów działania:', isWorkAreasValid);
      
      if (isWorkAreasValid) {
        setActive((current) => current < 4 ? current + 1 : current);
      } else {
        notifications.show({
          title: 'Błąd walidacji',
          message: 'Wypełnij wszystkie wymagane pola w obszarach działania',
          color: 'red',
          icon: <IconX size={16} />,
        });
      }
    } else {
      const validationResults = currentStepFields.map(field => ({
        field,
        error: form.validateField(field)
      }));
      
      console.log('Wyniki walidacji:', validationResults);
      
      const isValid = validationResults.every(result => !result.error.hasError);
      if (isValid) {
        setActive((current) => current < 4 ? current + 1 : current);
      } else {
        notifications.show({
          title: 'Błąd walidacji',
          message: 'Wypełnij wszystkie wymagane pola',
          color: 'red',
          icon: <IconX size={16} />,
        });
      }
    }
  };

  const prevStep = () => setActive((current) => current > 0 ? current - 1 : current);

  const handleStartRegistration = () => {
    setIsFormVisible(true);
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(form.values).length;
    const filledFields = Object.entries(form.values).filter(([key, value]) => {
      if (key === 'workAreas') {
        return value.length > 0 && value.every(area => 
          area.city && area.postalCode && area.district
        );
      }
      return value && value.toString().trim() !== '';
    }).length;
    return (filledFields / totalFields) * 100;
  };

  const handleSubmit = async (values) => {
    console.log('Próba wysłania formularza:', values);
    try {
      const response = await api.post('/service-provider', {
        companyName: values.companyName,
        nip: values.nip,
        regon: values.regon,
        email: values.email,
        website: values.website,
        description: values.description,
        phoneNumber: values.phoneNumber,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        workAreas: values.workAreas.map(area => ({
          city: area.city,
          postalCode: area.postalCode,
          district: area.district,
          radiusInKm: area.radiusInKm,
          additionalInfo: area.additionalInfo
        })),
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      });
      
      console.log('Odpowiedź z API:', response);
      
      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: 'Zgłoszenie zostało wysłane pomyślnie. Na Twój adres email został wysłany link aktywacyjny.',
          color: 'green',
          icon: <IconCheck size={16} />,
          withBorder: true,
          autoClose: 4000,
          withCloseButton: true,
          classNames: {
            root: classes.notification,
            title: classes.notificationTitle,
            description: classes.notificationDescription,
          },
        });
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        notifications.show({
          title: 'Błąd',
          message: response.message || 'Wystąpił błąd podczas wysyłania zgłoszenia. Sprawdź poprawność danych.',
          color: 'red',
          icon: <IconX size={16} />,
          withBorder: true,
          autoClose: 6000,
          withCloseButton: true,
          classNames: {
            root: classes.notification,
            title: classes.notificationTitle,
            description: classes.notificationDescription,
          },
        });
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania formularza:', error);
      notifications.show({
        title: 'Błąd',
        message: error?.response?.data || 'Wystąpił nieoczekiwany błąd podczas rejestracji. Spróbuj ponownie później.',
        color: 'red',
        icon: <IconX size={16} />,
        withBorder: true,
        autoClose: 6000,
        withCloseButton: true,
        classNames: {
          root: classes.notification,
          title: classes.notificationTitle,
          description: classes.notificationDescription,
        },
      });
    }
  };

  if (!isFormVisible) {
    return (
      <Container size="lg" py="xl">
        <Paper p="xl" radius="md" withBorder shadow="sm">
          <Stack spacing="xl" align="center">
            <ThemeIcon size={80} radius={40} variant="light" color="blue">
              <IconBuilding size={40} />
            </ThemeIcon>
            
            <Title order={1} align="center" mb="md">
              Zostań Usługodawcą
            </Title>
            
            <Text size="lg" align="center" color="dimmed" maw={600} mx="auto">
              Dołącz do naszej społeczności profesjonalnych usługodawców. 
              Zyskaj dostęp do nowych klientów i rozwijaj swój biznes z nami.
            </Text>

            <Box my="md">
              <Group spacing="xl">
                {[
                  { icon: IconCheck, text: 'Prosty proces rejestracji' },
                  { icon: IconMap2, text: 'Elastyczne obszary działania' },
                  { icon: IconWorld, text: 'Dostęp do klientów' },
                ].map((item, index) => (
                  <Group key={index} spacing="xs">
                    <ThemeIcon color="teal" size="md" radius="xl">
                      <item.icon size={16} />
                    </ThemeIcon>
                    <Text size="sm">{item.text}</Text>
                  </Group>
                ))}
              </Group>
            </Box>

            <Button
              size="xl"
              radius="xl"
              onClick={handleStartRegistration}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              leftIcon={<IconPlus size={20} />}
              px={40}
            >
              Rozpocznij Rejestrację
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Paper p="xl" radius="md" withBorder shadow="md">
        <form onSubmit={form.onSubmit((values) => {
          console.log('Form submitted with values:', values);
          handleSubmit(values);
        })}>
          <Stack spacing="xl">
            <Group position="apart" align="center">
              <Title order={2}>Rejestracja Usługodawcy</Title>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: calculateProgress(), color: 'blue' }]}
                label={
                  <Text color="blue" weight={700} align="center" size="sm">
                    {Math.round(calculateProgress())}%
                  </Text>
                }
              />
            </Group>

            <Divider />

            <Stepper
              active={active}
              breakpoint="sm"
              allowNextStepsSelect={false}
              iconSize={42}
              orientation={isMobile ? 'vertical' : 'horizontal'}
            >
              <Stepper.Step
                label="Podstawowe informacje"
                description="Dane firmy"
                icon={<IconBuilding size={24} />}
              >
                <Transition mounted={active === 0} transition="fade" duration={400}>
                  {(styles) => (
                    <Stack spacing="md" mt="xl" style={styles}>
                      <TextInput
                        required
                        icon={<IconBuilding size={16} />}
                        label="Nazwa firmy"
                        placeholder="Wprowadź nazwę firmy"
                        {...form.getInputProps('companyName')}
                      />
                      <Grid>
                        <Grid.Col span={6}>
                          <TextInput
                            required
                            icon={<IconId size={16} />}
                            label="NIP"
                            placeholder="Wprowadź NIP"
                            {...form.getInputProps('nip')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            icon={<IconId size={16} />}
                            label="REGON"
                            placeholder="Wprowadź REGON"
                            {...form.getInputProps('regon')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            required
                            icon={<IconMail size={16} />}
                            label="Email"
                            placeholder="Wprowadź email"
                            {...form.getInputProps('email')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            icon={<IconWorld size={16} />}
                            label="Strona WWW"
                            placeholder="Wprowadź adres strony WWW"
                            {...form.getInputProps('website')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            required
                            label="Imię"
                            placeholder="Twoje imię"
                            icon={<IconUser size={16} />}
                            {...form.getInputProps('firstName')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            required
                            label="Nazwisko"
                            placeholder="Twoje nazwisko"
                            icon={<IconUser size={16} />}
                            {...form.getInputProps('lastName')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <PasswordInput
                            required
                            label="Hasło"
                            placeholder="Minimum 8 znaków, wielka litera i cyfra"
                            icon={<IconLock size={16} />}
                            {...form.getInputProps('password')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <PasswordInput
                            required
                            label="Potwierdź hasło"
                            placeholder="Powtórz hasło"
                            icon={<IconLock size={16} />}
                            {...form.getInputProps('confirmPassword')}
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            required
                            icon={<IconPhone size={16} />}
                            label="Telefon"
                            placeholder="Wprowadź numer telefonu"
                            {...form.getInputProps('phoneNumber')}
                          />
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  )}
                </Transition>
              </Stepper.Step>

              <Stepper.Step
                label="Opis"
                description="Szczegóły firmy"
                icon={<IconInfoCircle size={24} />}
              >
                <Transition mounted={active === 1} transition="fade" duration={400}>
                  {(styles) => (
                    <Stack spacing="md" mt="xl" style={styles}>
                      <Textarea
                        label="Opis działalności"
                        placeholder="Opisz czym zajmuje się Twoja firma"
                        minRows={4}
                        {...form.getInputProps('description')}
                      />
                    </Stack>
                  )}
                </Transition>
              </Stepper.Step>

              <Stepper.Step
                label="Adres główny"
                description="Siedziba firmy"
                icon={<IconMapPin size={24} />}
              >
                <Transition mounted={active === 2} transition="fade" duration={400}>
                  {(styles) => (
                    <Stack spacing="md" mt="xl" style={styles}>
                      <TextInput
                        required
                        icon={<IconMapPin size={16} />}
                        label="Adres"
                        placeholder="Wprowadź adres firmy"
                        {...form.getInputProps('address')}
                      />
                      <Group grow>
                        <TextInput
                          required
                          icon={<IconMap2 size={16} />}
                          label="Miasto"
                          placeholder="Wprowadź miasto"
                          {...form.getInputProps('city')}
                        />
                        <TextInput
                          required
                          label="Kod pocztowy"
                          placeholder="Wprowadź kod pocztowy"
                          {...form.getInputProps('postalCode')}
                        />
                      </Group>
                    </Stack>
                  )}
                </Transition>
              </Stepper.Step>

              <Stepper.Step
                label="Obszary działania"
                description="Gdzie świadczysz usługi"
                icon={<IconMap2 size={24} />}
              >
                <Transition mounted={active === 3} transition="fade" duration={400}>
                  {(styles) => (
                    <Stack spacing="xl" mt="xl" style={styles}>
                      {form.values.workAreas.map((_, index) => (
                        <Card key={index} withBorder shadow="sm" radius="md" p="md">
                          <Stack spacing="md">
                            <Group position="apart">
                              <Badge 
                                size="lg" 
                                radius="md" 
                                variant="gradient" 
                                gradient={{ from: 'blue', to: 'cyan' }}
                              >
                                Obszar działania {index + 1}
                              </Badge>
                              {index > 0 && (
                                <Tooltip label="Usuń obszar">
                                  <ActionIcon
                                    color="red"
                                    variant="light"
                                    onClick={() => form.removeListItem('workAreas', index)}
                                    size="lg"
                                    radius="md"
                                  >
                                    <IconTrash size={20} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </Group>
                            
                            <Group grow>
                              <TextInput
                                required
                                icon={<IconMap2 size={16} />}
                                label="Miasto"
                                placeholder="Wprowadź miasto"
                                {...form.getInputProps(`workAreas.${index}.city`)}
                              />
                              <TextInput
                                required
                                label="Kod pocztowy"
                                placeholder="Wprowadź kod pocztowy"
                                {...form.getInputProps(`workAreas.${index}.postalCode`)}
                              />
                            </Group>
                            
                            <Group grow>
                              <TextInput
                                required
                                label="Dzielnica"
                                placeholder="Wprowadź dzielnicę"
                                {...form.getInputProps(`workAreas.${index}.district`)}
                              />
                              <NumberInput
                                icon={<IconMap2 size={16} />}
                                label="Promień działania (km)"
                                placeholder="Wprowadź promień działania"
                                min={0}
                                precision={1}
                                {...form.getInputProps(`workAreas.${index}.radiusInKm`)}
                              />
                            </Group>
                            
                            <Textarea
                              label="Dodatkowe informacje"
                              placeholder="Wprowadź dodatkowe informacje o obszarze działania"
                              {...form.getInputProps(`workAreas.${index}.additionalInfo`)}
                            />
                          </Stack>
                        </Card>
                      ))}
                      
                      <Button
                        variant="light"
                        leftIcon={<IconPlus size={20} />}
                        onClick={() =>
                          form.insertListItem('workAreas', {
                            city: '',
                            postalCode: '',
                            district: '',
                            radiusInKm: null,
                            additionalInfo: '',
                          })
                        }
                        fullWidth
                        radius="md"
                      >
                        Dodaj kolejny obszar działania
                      </Button>
                    </Stack>
                  )}
                </Transition>
              </Stepper.Step>

              <Stepper.Completed>
                <Transition mounted={active === 4} transition="fade" duration={400}>
                  {(styles) => (
                    <Stack spacing="xl" mt="xl" style={styles}>
                      <Stack align="center" mb="xl">
                        <ThemeIcon size={80} radius={40} color="#8ABFD6">
                          <IconCheck size={40} />
                        </ThemeIcon>
                        <Title order={2}>Gratulacje!</Title>
                        <Text align="center" color="dimmed" size="lg" maw={500}>
                          Sprawdź poprawność wprowadzonych danych przed wysłaniem zgłoszenia.
                        </Text>
                      </Stack>

                      <Grid>
                        <Grid.Col span={12}>
                          <Card withBorder radius="md" p="md">
                            <Stack spacing="xs">
                              <Title order={4} color="blue">Dane osobowe i logowania</Title>
                              <List spacing="xs" size="sm">
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconUser size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Imię:</Text> {form.values.firstName}
                                </List.Item>
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconUser size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Nazwisko:</Text> {form.values.lastName}
                                </List.Item>
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconLock size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Hasło:</Text> ••••••••
                                </List.Item>
                              </List>
                            </Stack>
                          </Card>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Card withBorder radius="md" p="md">
                            <Stack spacing="xs">
                              <Title order={4} color="blue">Dane podstawowe</Title>
                              <List spacing="xs" size="sm">
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconBuilding size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Nazwa firmy:</Text> {form.values.companyName}
                                </List.Item>
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconId size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>NIP:</Text> {form.values.nip}
                                </List.Item>
                                {form.values.regon && (
                                  <List.Item icon={
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                      <IconId size={16} />
                                    </ThemeIcon>
                                  }>
                                    <Text weight={700}>REGON:</Text> {form.values.regon}
                                  </List.Item>
                                )}
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconMail size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Email:</Text> {form.values.email}
                                </List.Item>
                                {form.values.website && (
                                  <List.Item icon={
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                      <IconWorld size={16} />
                                    </ThemeIcon>
                                  }>
                                    <Text weight={700}>Strona WWW:</Text> {form.values.website}
                                  </List.Item>
                                )}
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconPhone size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Telefon:</Text> {form.values.phoneNumber}
                                </List.Item>
                              </List>
                            </Stack>
                          </Card>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Card withBorder radius="md" p="md">
                            <Stack spacing="xs">
                              <Title order={4} color="blue">Opis działalności</Title>
                              <Text size="sm">{form.values.description || 'Brak opisu'}</Text>
                            </Stack>
                          </Card>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Card withBorder radius="md" p="md">
                            <Stack spacing="xs">
                              <Title order={4} color="blue">Adres główny</Title>
                              <List spacing="xs" size="sm">
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconMapPin size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Adres:</Text> {form.values.address}
                                </List.Item>
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconMap2 size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Miasto:</Text> {form.values.city}
                                </List.Item>
                                <List.Item icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconMap2 size={16} />
                                  </ThemeIcon>
                                }>
                                  <Text weight={700}>Kod pocztowy:</Text> {form.values.postalCode}
                                </List.Item>
                              </List>
                            </Stack>
                          </Card>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Card withBorder radius="md" p="md">
                            <Stack spacing="md">
                              <Title order={4} color="blue">Obszary działania</Title>
                              {form.values.workAreas.map((area, index) => (
                                <Card key={index} withBorder radius="md" p="md">
                                  <Stack spacing="xs">
                                    <Badge 
                                      size="lg" 
                                      radius="md" 
                                      variant="gradient" 
                                      gradient={{ from: 'blue', to: 'cyan' }}
                                    >
                                      Obszar {index + 1}
                                    </Badge>
                                    <List spacing="xs" size="sm">
                                      <List.Item icon={
                                        <ThemeIcon color="blue" size={24} radius="xl">
                                          <IconMap2 size={16} />
                                        </ThemeIcon>
                                      }>
                                        <Text weight={700}>Miasto:</Text> {area.city}
                                      </List.Item>
                                      <List.Item icon={
                                        <ThemeIcon color="blue" size={24} radius="xl">
                                          <IconMap2 size={16} />
                                        </ThemeIcon>
                                      }>
                                        <Text weight={700}>Kod pocztowy:</Text> {area.postalCode}
                                      </List.Item>
                                      <List.Item icon={
                                        <ThemeIcon color="blue" size={24} radius="xl">
                                          <IconMap2 size={16} />
                                        </ThemeIcon>
                                      }>
                                        <Text weight={700}>Dzielnica:</Text> {area.district}
                                      </List.Item>
                                      {area.radiusInKm && (
                                        <List.Item icon={
                                          <ThemeIcon color="blue" size={24} radius="xl">
                                            <IconMap2 size={16} />
                                          </ThemeIcon>
                                        }>
                                          <Text weight={700}>Promień działania:</Text> {area.radiusInKm} km
                                        </List.Item>
                                      )}
                                      {area.additionalInfo && (
                                        <List.Item icon={
                                          <ThemeIcon color="blue" size={24} radius="xl">
                                            <IconInfoCircle size={16} />
                                          </ThemeIcon>
                                        }>
                                          <Text weight={700}>Dodatkowe informacje:</Text> {area.additionalInfo}
                                        </List.Item>
                                      )}
                                    </List>
                                  </Stack>
                                </Card>
                              ))}
                            </Stack>
                          </Card>
                        </Grid.Col>
                      </Grid>

                      <Text color="dimmed" size="sm" align="center" mt="xl">
                        Sprawdź czy wszystkie dane są poprawne. Po wysłaniu zgłoszenia nie będzie można ich zmienić bez kontaktu z administracją.
                      </Text>
                    </Stack>
                  )}
                </Transition>
              </Stepper.Completed>
            </Stepper>

            <Divider mt="xl" />

            <Group position="apart" mt="md">
              {active !== 0 && (
                <Button
                  variant="default"
                  onClick={prevStep}
                  radius="xl"
                  leftIcon={<IconAlertCircle size={20} />}
                >
                  Wstecz
                </Button>
              )}
              {active !== 4 ? (
                <Button
                  onClick={nextStep}
                  radius="xl"
                  rightIcon={<IconCheck size={20} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                >
                  Dalej
                </Button>
              ) : (
                api.loading ? (
                  <Button
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    size="lg"
                    loading
                    fullWidth
                  >
                    Wysyłanie zgłoszenia...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    radius="xl"
                    rightIcon={<IconCheck size={20} />}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    size="lg"
                    disabled={api.loading}
                  >
                    Wyślij zgłoszenie
                  </Button>
                )
              )}
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
