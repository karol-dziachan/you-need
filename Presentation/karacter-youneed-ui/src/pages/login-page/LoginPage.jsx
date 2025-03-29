import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  Stack,
  Anchor,
  Center,
  Box,
  rem,
  Transition,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconLock,
  IconMail,
  IconUserCircle,
  IconArrowRight,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionStack = motion(Stack);

export const LoginPage = () => {
  const [visible, { toggle }] = useDisclosure(true);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Nieprawidłowy adres email'),
      password: (val) => (val.length < 6 ? 'Hasło musi mieć co najmniej 6 znaków' : null),
    },
  });

  const handleSubmit = (values) => {
    // Tutaj będzie logika logowania
    console.log(values);
    notifications.show({
      title: 'Logowanie...',
      message: 'Trwa proces logowania',
      loading: true,
    });
  };

  return (
    <Container size={420} my={40}>
      <Transition mounted={visible} transition="pop" duration={400} timingFunction="ease">
        {(styles) => (
          <MotionStack
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={styles}
          >
            <Center mb="xl">
              <ThemeIcon size={80} radius={40} variant="light" color="blue">
                <IconUserCircle size={40} />
              </ThemeIcon>
            </Center>

            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, \${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Witaj z powrotem!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Nie masz jeszcze konta?{' '}
              <Anchor 
                size="sm" 
                to="/register"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Zarejestruj się
              </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  <TextInput
                    required
                    label="Email"
                    placeholder="twoj@email.com"
                    icon={<IconMail size={16} />}
                    radius="md"
                    {...form.getInputProps('email')}
                  />

                  <PasswordInput
                    required
                    label="Hasło"
                    placeholder="Twoje hasło"
                    icon={<IconLock size={16} />}
                    radius="md"
                    {...form.getInputProps('password')}
                  />

                  <Group position="apart" mt="sm">
                    <Checkbox
                      label="Zapamiętaj mnie"
                      {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                    />
                    <Anchor
                      onClick={(event) => event.preventDefault()}
                      href="#"
                      size="sm"
                    >
                      Zapomniałeś hasła?
                    </Anchor>
                  </Group>
                </Stack>

                <Button
                  fullWidth
                  mt="xl"
                  size="md"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  rightIcon={<IconArrowRight size={20} />}
                  type="submit"
                >
                  Zaloguj się
                </Button>

                <Divider
                  label="Lub kontynuuj z"
                  labelPosition="center"
                  my="lg"
                />

                <Group grow mb="md" mt="md">
                  <Button
                    radius="xl"
                    variant="default"
                    leftIcon={<IconBrandGoogle size={20} />}
                  >
                    Google
                  </Button>
                  <Button
                    radius="xl"
                    variant="default"
                    leftIcon={<IconBrandFacebook size={20} />}
                  >
                    Facebook
                  </Button>
                </Group>
              </form>
            </Paper>

            <Text color="dimmed" size="xs" align="center" mt={5}>
              Logując się akceptujesz{' '}
              <Anchor size="xs" onClick={() => navigate('/terms-of-service')}>
                regulamin serwisu
              </Anchor>
              {' '}oraz{' '}
              <Anchor size="xs" onClick={() => navigate('/privacy-policy')}>
                politykę prywatności
              </Anchor>
            </Text>
          </MotionStack>
        )}
      </Transition>
    </Container>
  );
};
