import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Box,
  ThemeIcon,
  Group,
  PasswordInputProps,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconLock,
  IconUserCircle,
  IconArrowRight,
  IconCheck,
  IconX,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { useClasses } from '../../hooks/useClasses';
import { useStyles } from './ChangePasswordPage.styles';

const MotionStack = motion(Stack);

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { classes } = useClasses();
  const { classes: styles } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (val) => {
        if (val.length < 6) return 'Hasło musi mieć co najmniej 6 znaków';
        if (!/[A-Z]/.test(val)) return 'Hasło musi zawierać co najmniej jedną wielką literę';
        if (!/[a-z]/.test(val)) return 'Hasło musi zawierać co najmniej jedną małą literę';
        if (!/[0-9]/.test(val)) return 'Hasło musi zawierać co najmniej jedną cyfrę';
        if (!/[!@#$%^&*]/.test(val)) return 'Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)';
        return null;
      },
      confirmPassword: (val, values) =>
        val !== values.newPassword ? 'Hasła nie są identyczne' : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      notifications.show({
        title: 'Zmiana hasła...',
        message: 'Trwa proces zmiany hasła',
        loading: true,
        autoClose: true,
        withCloseButton: true,
      });

      const response = await api.post('/auth/change-password', {
        Password: values.newPassword,
      });

      if (response.isSuccess) {
        notifications.show({
          title: 'Sukces!',
          message: 'Hasło zostało zmienione pomyślnie',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 2000,
          classNames: {
            root: classes.notification,
            title: classes.notificationTitle,
            description: classes.notificationDescription,
          },
        });

        // Przekieruj na stronę główną po krótkim opóźnieniu
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error(response.message || 'Wystąpił błąd podczas zmiany hasła');
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd zmiany hasła',
        message: error?.response?.data?.message || 'Nie udało się zmienić hasła',
        color: 'red',
        icon: <IconX size={16} />,
        classNames: {
          root: classes.notification,
          title: classes.notificationTitle,
          description: classes.notificationDescription,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Container size={420} className={styles.container}>
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

          <Title className={styles.title}>Zmiana hasła</Title>
          <Text color="dimmed" size="sm" ta="center" mt={5}>
            Wprowadź swoje obecne hasło oraz nowe hasło
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={styles.form}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
               

                <PasswordInput
                  required
                  label="Nowe hasło"
                  placeholder="Wprowadź nowe hasło"
                  icon={<IconLock size={16} />}
                  radius="md"
                  {...form.getInputProps('newPassword')}
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />
                  }
                />

                <PasswordInput
                  required
                  label="Potwierdź nowe hasło"
                  placeholder="Wprowadź ponownie nowe hasło"
                  icon={<IconLock size={16} />}
                  radius="md"
                  {...form.getInputProps('confirmPassword')}
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />
                  }
                />
              </Stack>

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
                Zmień hasło
              </Button>
            </form>
          </Paper>
        </MotionStack>
      </Container>
    </div>
  );
};
