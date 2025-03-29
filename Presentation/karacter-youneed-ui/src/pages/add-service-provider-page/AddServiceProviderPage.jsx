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
} from '@mantine/core';
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
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export const AddServiceProviderPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [active, setActive] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
    },
  });

  const nextStep = () => {
    const validationMap = {
      0: ['companyName', 'nip', 'regon', 'email', 'website'],
      1: ['description', 'phoneNumber'],
      2: ['address', 'city', 'postalCode'],
      3: ['workAreas'],
    };

    const currentStepFields = validationMap[active] || [];
    
    if (active === 3) {
      // Specjalna walidacja dla obszarów działania
      const isWorkAreasValid = form.values.workAreas.every((area, index) => {
        const areaErrors = Object.keys(form.errors)
          .filter(key => key.startsWith(`workAreas.${index}`))
          .length === 0;
        return areaErrors;
      });
      
      if (isWorkAreasValid) {
        setActive((current) => current < 4 ? current + 1 : current);
      }
    } else {
      const isValid = currentStepFields.every((field) => !form.validateField(field).hasError);
      if (isValid) {
        setActive((current) => current < 4 ? current + 1 : current);
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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                      <Group grow>
                        <TextInput
                          required
                          icon={<IconId size={16} />}
                          label="NIP"
                          placeholder="Wprowadź NIP"
                          {...form.getInputProps('nip')}
                        />
                        <TextInput
                          icon={<IconId size={16} />}
                          label="REGON"
                          placeholder="Wprowadź REGON"
                          {...form.getInputProps('regon')}
                        />
                      </Group>
                      <Group grow>
                        <TextInput
                          required
                          icon={<IconMail size={16} />}
                          label="Email"
                          placeholder="Wprowadź email"
                          {...form.getInputProps('email')}
                        />
                        <TextInput
                          icon={<IconWorld size={16} />}
                          label="Strona WWW"
                          placeholder="Wprowadź adres strony WWW"
                          {...form.getInputProps('website')}
                        />
                      </Group>
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
                      <TextInput
                        required
                        icon={<IconPhone size={16} />}
                        label="Telefon"
                        placeholder="Wprowadź numer telefonu"
                        {...form.getInputProps('phoneNumber')}
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
                <Button
                  type="submit"
                  radius="xl"
                  rightIcon={<IconCheck size={20} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  size="lg"
                >
                  Wyślij zgłoszenie
                </Button>
              )}
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
