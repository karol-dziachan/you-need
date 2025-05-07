import {
    Paper,
    Title,
    Text,
    Container,
    Button,
    Stack,
    Center,
    ThemeIcon,
    Transition,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconUserCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { useStyles } from './ActivateServiceProviderPage.styles';
import { useState } from 'react';
import { useClasses } from '../../hooks/useClasses';

const MotionStack = motion(Stack);

export const ActivateServiceProviderPage = () => {
    const { classes: localClasses } = useStyles();
    const { classes } = useClasses();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isActivating, setIsActivating] = useState(false);
    const { put } = useApi();

    const handleActivation = async () => {
        try {
            setIsActivating(true);
            const response = await put(`/service-provider/activate/${id}`);
            
            if (response.isSuccess) {
                notifications.show({
                    title: 'Sukces!',
                    message: 'Konto zostało aktywowane. Za chwilę zostaniesz przekierowany do strony logowania.',
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
                    navigate('/login');
                }, 3000);
            } else {
                notifications.show({
                    title: 'Błąd!',
                    message: response.message || 'Nie udało się aktywować konta. Spróbuj ponownie później.',
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
            notifications.show({
                title: 'Błąd!',
                message: error?.response?.data?.message || 'Wystąpił nieoczekiwany błąd podczas aktywacji konta.',
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
        } finally {
            setIsActivating(false);
        }
    };

    return (
        <div className={localClasses.wrapper} style={{ backgroundColor: 'transparent' }}>
            <Container size={420} my={40}>
                <Transition mounted={true} transition="pop" duration={400} timingFunction="ease">
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
                                className={classes.title}
                            >
                                Aktywacja konta
                            </Title>
                            <Text color="dimmed" size="sm" align="center" mt={5}>
                                Kliknij przycisk poniżej, aby aktywować swoje konto usługodawcy
                            </Text>

                            <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paper}>
                                <Stack>
                                    <Text size="sm" align="center">
                                        Po aktywacji konta będziesz mógł zalogować się i rozpocząć świadczenie usług w systemie YouNeed.
                                    </Text>

                                    <Button
                                        fullWidth
                                        mt="xl"
                                        size="md"
                                        variant="gradient"
                                        gradient={{ from: 'blue', to: 'cyan' }}
                                        onClick={handleActivation}
                                        loading={isActivating}
                                        className={classes.button}
                                    >
                                        Aktywuj konto
                                    </Button>
                                </Stack>
                            </Paper>

                            <Text color="dimmed" size="xs" align="center" mt={5}>
                                Link aktywacyjny jest ważny przez 24 godziny od momentu rejestracji
                            </Text>
                        </MotionStack>
                    )}
                </Transition>
            </Container>
        </div>
    );
};

export default ActivateServiceProviderPage;
