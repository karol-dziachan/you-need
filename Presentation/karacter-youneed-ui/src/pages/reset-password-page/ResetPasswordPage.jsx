import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Box,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconMail,
  IconUserCircle,
  IconArrowRight,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { useStyles } from './ResetPasswordPage.styles';

const MotionStack = motion(Stack);

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Nieprawidłowy adres email'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      notifications.show({
        title: 'Wysyłanie...',
        message: 'Trwa wysyłanie żądania resetowania hasła',
        loading: true,
        autoClose: true,
        withCloseButton: true,
      });

      const response = await api.post('/auth/reset-password', {
        email: values.email,
      });

      // Zawsze pokazujemy tę samą wiadomość, niezależnie od tego czy email istnieje
      // Jest to zabezpieczenie przed sprawdzaniem, które konta istnieją
      notifications.show({
        title: 'Wysłano!',
        message: 'Jeśli konto o podanym adresie email istnieje, otrzymasz wiadomość z instrukcjami resetowania hasła.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 5000,
      });

      // Przekieruj na stronę logowania po krótkim opóźnieniu
      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas wysyłania żądania resetowania hasła. Spróbuj ponownie później.',
        color: 'red',
        icon: <IconX size={16} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Container size={420} className={classes.container}>
        <MotionStack
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box mb="xl" ta="center">
            <ThemeIcon size={80} radius={40} variant="light" color="blue">
              <IconUserCircle size={40} />
            </ThemeIcon>
          </Box>

          <Title className={classes.title}>Zapomniałeś hasła?</Title>
          <Text color="dimmed" size="sm" ta="center" mt={5}>
            Podaj swój adres email, a wyślemy Ci link do zresetowania hasła
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.form}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                required
                label="Email"
                placeholder="twoj@email.com"
                icon={<IconMail size={16} />}
                radius="md"
                {...form.getInputProps('email')}
              />

              <Button
                fullWidth
                mt="xl"
                size="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                rightIcon={<IconArrowRight size={20} />}
                type="submit"
                loading={isLoading}
              >
                Wyślij link resetujący
              </Button>
            </form>
          </Paper>

          <Text color="dimmed" size="sm" ta="center" mt={20}>
            Pamiętasz hasło?{' '}
            <Button variant="subtle" compact onClick={() => navigate('/login')}>
              Wróć do logowania
            </Button>
          </Text>
        </MotionStack>
      </Container>
    </div>
  );
};
