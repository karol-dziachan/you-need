import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Divider,
  ThemeIcon,
  Box,
  Stepper,
  Center,
  ActionIcon,
} from '@mantine/core';
import {
  IconUserPlus,
  IconMail,
  IconLock,
  IconUser,
  IconPhone,
  IconBrandGoogle,
  IconBrandFacebook,
  IconArrowRight,
  IconCheck,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import { useStyles } from './RegisterPage.styles';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const MotionPaper = motion(Paper);

export const RegisterPage = () => {
  const { classes } = useStyles();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Nieprawidłowy adres email'),
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
      phoneNumber: (value) => (
        value && !/^\+?[0-9]{9,}$/.test(value) ? 'Nieprawidłowy numer telefonu' : null
      ),
    },
  });

  const nextStep = () => {
    if (active === 0) {
      if (form.validateField('email').hasError || 
          form.validateField('password').hasError || 
          form.validateField('confirmPassword').hasError) {
        return;
      }
    }
    if (active === 1) {
      if (form.validateField('firstName').hasError || 
          form.validateField('lastName').hasError || 
          form.validateField('phoneNumber').hasError) {
        return;
      }
    }
    setActive((current) => current + 1);
  };

  const prevStep = () => setActive((current) => current - 1);

  const handleSubmit = (values) => {
    notifications.show({
      title: 'Rejestracja w toku',
      message: 'Trwa tworzenie konta...',
      loading: true,
    });
    
    // Tu będzie logika rejestracji
    console.log(values);
  };

  return (
    <Container size="sm" py="xl" className={classes.container} bg="transparent">
      <Stack spacing="xl">
        <Center>
          <ThemeIcon size={80} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            <IconUserPlus size={40} />
          </ThemeIcon>
        </Center>

        <Title align="center" className={classes.title}>
          Dołącz do YouNeed
        </Title>
        <Text align="center" color="dimmed" size="sm">
          Zarejestruj się jako klient i zacznij korzystać z naszych usług
        </Text>
        <Text align="center" size="sm">
          Chcesz świadczyć usługi?{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            
            style={{
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => navigate('/add-service-provider')}
          >
            Zarejestruj się jako usługodawca
          </Text>
        </Text>

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
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="xl">
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                className={classes.stepper}
              >
                <Stepper.Step
                  label="Konto"
                  description="Dane logowania"
                  icon={<IconMail size={18} />}
                >
                  <Stack spacing="md" mt="xl">
                    <TextInput
                      required
                      label="Email"
                      placeholder="twoj@email.com"
                      icon={<IconMail size={16} />}
                      {...form.getInputProps('email')}
                      className={classes.input}
                    />
                    <PasswordInput
                      required
                      label="Hasło"
                      placeholder="Minimum 8 znaków"
                      icon={<IconLock size={16} />}
                      {...form.getInputProps('password')}
                      className={classes.input}
                    />
                    <PasswordInput
                      required
                      label="Potwierdź hasło"
                      placeholder="Powtórz hasło"
                      icon={<IconLock size={16} />}
                      {...form.getInputProps('confirmPassword')}
                      className={classes.input}
                    />
                  </Stack>
                </Stepper.Step>

                <Stepper.Step
                  label="Profil"
                  description="Dane osobowe"
                  icon={<IconUser size={18} />}
                >
                  <Stack spacing="md" mt="xl">
                    <TextInput
                      required
                      label="Imię"
                      placeholder="Twoje imię"
                      icon={<IconUser size={16} />}
                      {...form.getInputProps('firstName')}
                      className={classes.input}
                    />
                    <TextInput
                      required
                      label="Nazwisko"
                      placeholder="Twoje nazwisko"
                      icon={<IconUser size={16} />}
                      {...form.getInputProps('lastName')}
                      className={classes.input}
                    />
                    <TextInput
                      label="Numer telefonu"
                      placeholder="+48 123 456 789"
                      icon={<IconPhone size={16} />}
                      {...form.getInputProps('phoneNumber')}
                      className={classes.input}
                    />
                  </Stack>
                </Stepper.Step>

                <Stepper.Completed>
                  <Stack spacing="md" mt="xl" align="center">
                    <ThemeIcon size={60} radius="xl" color="green">
                      <IconCheck size={30} />
                    </ThemeIcon>
                    <Text size="lg" weight={500} align="center">
                      Wszystko gotowe!
                    </Text>
                    <Text color="dimmed" size="sm" align="center">
                      Sprawdź poprawność danych i kliknij "Zarejestruj się"
                    </Text>
                    <Box className={classes.summary}>
                      <Text size="sm">Email: {form.values.email}</Text>
                      <Text size="sm">Imię: {form.values.firstName}</Text>
                      <Text size="sm">Nazwisko: {form.values.lastName}</Text>
                      <Text size="sm">Telefon: {form.values.phoneNumber || 'Nie podano'}</Text>
                    </Box>
                  </Stack>
                </Stepper.Completed>
              </Stepper>

              <Group position="apart" mt="xl">
                {active !== 0 && (
                  <Button
                    variant="default"
                    onClick={prevStep}
                    className={classes.button}
                  >
                    Wstecz
                  </Button>
                )}
                {active !== 2 ? (
                  <Button
                    onClick={nextStep}
                    rightIcon={<IconArrowRight size={16} />}
                    className={classes.button}
                  >
                    Dalej
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={classes.button}
                  >
                    Zarejestruj się
                  </Button>
                )}
              </Group>

              <Divider label="lub kontynuuj przez" labelPosition="center" />

              <Group grow>
                <Button
                  leftIcon={<IconBrandGoogle size={16} />}
                  variant="default"
                  className={classes.socialButton}
                >
                  Google
                </Button>
                <Button
                  leftIcon={<IconBrandFacebook size={16} />}
                  variant="default"
                  className={classes.socialButton}
                >
                  Facebook
                </Button>
              </Group>
            </Stack>
          </form>
        </MotionPaper>
      </Stack>
    </Container>
  );
};
