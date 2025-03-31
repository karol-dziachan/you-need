import { useState, useMemo } from 'react';
import { Card, Stack, Group, Title, Text, Button, ActionIcon, Tooltip, ThemeIcon, Modal, Select, Switch, Textarea, Grid, Badge, Box, UnstyledButton } from '@mantine/core';
import { IconCalendarTime, IconEdit, IconTrash, IconPlus, IconClock, IconUser, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useStyles } from './CompanyManagement.styles';
import { TimeInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useApi } from '../../../hooks/useApi';

export const CompanySchedules = ({ schedules, companyId, users, fetchDashboardData }) => {
  const { classes } = useStyles();
  const { post, put, del } = useApi();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    dayOfWeek: new Date().getDay(),
    startTime: '09:00',
    endTime: '17:00',
    isBreakTime: false,
    breakStartTime: '12:00',
    breakEndTime: '13:00',
    notes: ''
  });

  const convertTimeToTimeSpan = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`; // Format "HH:mm:ss"
  };

  const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  // Funkcja generująca dni w miesiącu
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Dodaj dni z poprzedniego miesiąca
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }
    
    // Dodaj dni bieżącego miesiąca
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Dodaj dni następnego miesiąca
    const remainingDays = 42 - days.length; // 6 tygodni
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  // Grupowanie grafików według dat
  const schedulesByDate = useMemo(() => {
    const grouped = new Map();
    schedules?.forEach(schedule => {
      const key = schedule.dayOfWeek;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(schedule);
    });
    return grouped;
  }, [schedules]);

  const CustomCalendar = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <Stack spacing="xs">
        <Group position="apart" mb="md">
          <Group spacing="xl">
            <ActionIcon 
              variant="light" 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={4}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Title>
            <ActionIcon 
              variant="light" 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              <IconChevronRight size={20} />
            </ActionIcon>
          </Group>
          <Button 
            variant="subtle" 
            compact 
            onClick={() => setCurrentDate(new Date())}
          >
            Dzisiaj
          </Button>
        </Group>

        <Grid columns={7} gutter={0}>
          {daysOfWeek.map((day, index) => (
            <Grid.Col span={1} key={day}>
              <Box
                sx={(theme) => ({
                  textAlign: 'center',
                  padding: theme.spacing.xs,
                  fontWeight: 500,
                  color: [0, 6].includes(index) ? theme.colors.red[6] : theme.colors.gray[7],
                  fontSize: theme.fontSizes.sm
                })}
              >
                {day.slice(0, 2)}
              </Box>
            </Grid.Col>
          ))}

          {days.map(({ date, isCurrentMonth }, index) => {
            const daySchedules = schedulesByDate.get(date.getDay()) || [];
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <Grid.Col span={1} key={index}>
                <UnstyledButton
                  sx={(theme) => ({
                    width: '100%',
                    height: '100px',
                    padding: theme.spacing.sm,
                    borderRadius: theme.radius.md,
                    border: `2px solid ${isSelected ? theme.colors.blue[5] : theme.colors.gray[3]}`,
                    backgroundColor: isSelected ? theme.fn.rgba(theme.colors.blue[1], 0.5) : 
                                  isToday ? theme.fn.rgba(theme.colors.yellow[1], 0.5) : 
                                  'transparent',
                    opacity: isCurrentMonth ? 1 : 0.4,
                    '&:hover': {
                      backgroundColor: theme.fn.rgba(theme.colors.gray[1], 0.7),
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease'
                    }
                  })}
                  onClick={() => setSelectedDate(date)}
                >
                  <Stack spacing={4}>
                    <Text 
                      align="center" 
                      weight={isToday ? 700 : 600}
                      size="md"
                      color={isToday ? 'blue' : 'inherit'}
                    >
                      {date.getDate()}
                    </Text>
                    {daySchedules.length > 0 && (
                      <Group spacing={4} position="center">
                        {daySchedules.slice(0, 3).map((schedule, idx) => (
                          <Box
                            key={idx}
                            sx={(theme) => ({
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: schedule.isActive ? 
                                theme.colors.blue[6] : theme.colors.gray[6]
                            })}
                          />
                        ))}
                        {daySchedules.length > 3 && (
                          <Text size="xs" color="dimmed">+{daySchedules.length - 3}</Text>
                        )}
                      </Group>
                    )}
                  </Stack>
                </UnstyledButton>
              </Grid.Col>
            );
          })}
        </Grid>
      </Stack>
    );
  };

  // Funkcja renderująca harmonogram dla wybranego dnia
  const renderDaySchedules = (daySchedules) => {
    if (!daySchedules.length) return null;

    return daySchedules.map((schedule, index) => {
      console.log('Full schedule object:', schedule);
      const userFullName = schedule.userFullName ?? 'Nieznany pracownik';
      
      return (
        <Box
          key={index}
          sx={(theme) => ({
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            backgroundColor: schedule.isActive ? 
              theme.fn.rgba(theme.colors.blue[1], 0.3) : 
              theme.fn.rgba(theme.colors.gray[1], 0.3),
            borderLeft: `4px solid ${schedule.isActive ? theme.colors.blue[6] : theme.colors.gray[6]}`,
            marginBottom: theme.spacing.xs,
            boxShadow: theme.shadows.xs,
            '&:hover': {
              backgroundColor: schedule.isActive ? 
                theme.fn.rgba(theme.colors.blue[2], 0.4) : 
                theme.fn.rgba(theme.colors.gray[2], 0.4),
              transform: 'translateX(4px)',
              transition: 'all 0.2s ease'
            }
          })}
        >
          <Stack spacing={4}>
            <Group position="apart" noWrap>
              <Group spacing="xs">
                <ThemeIcon size="md" radius="md" variant="light" color={schedule.isActive ? "blue" : "gray"}>
                  <IconUser size={16} />
                </ThemeIcon>
                <Text size="md" weight={600}>{userFullName}</Text>
              </Group>
              <Group spacing={4}>
                <Tooltip label="Edytuj">
                  <ActionIcon size="md" color="blue" variant="light" onClick={() => handleOpenEditModal(schedule)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Usuń">
                  <ActionIcon size="md" color="red" variant="light" onClick={() => handleDeleteSchedule(schedule)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <Group spacing="xs" mt={2}>
              <Badge size="sm" radius="sm" variant="dot" color={schedule.isActive ? "blue" : "gray"}>
                {schedule.startTime.slice(0, 5)} - {schedule.endTime.slice(0, 5)}
              </Badge>
              {schedule.isBreakTime && (
                <Badge size="sm" radius="sm" variant="dot" color="orange">
                  Przerwa: {schedule.breakStartTime.slice(0, 5)} - {schedule.breakEndTime.slice(0, 5)}
                </Badge>
              )}
            </Group>
          </Stack>
        </Box>
      );
    });
  };

  const handleAddSchedule = async () => {
    try {
      const response = await post('/service-provider/add-company-work-schedule', {
        companyId,
        userId: formData.userId,
        dayOfWeek: formData.dayOfWeek,
        startTime: convertTimeToTimeSpan(formData.startTime),
        endTime: convertTimeToTimeSpan(formData.endTime),
        isBreakTime: formData.isBreakTime,
        breakStartTime: formData.isBreakTime ? convertTimeToTimeSpan(formData.breakStartTime) : null,
        breakEndTime: formData.isBreakTime ? convertTimeToTimeSpan(formData.breakEndTime) : null,
        notes: formData.notes
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Nie udało się dodać grafiku');
      }

      notifications.show({
        title: 'Sukces!',
        message: 'Grafik został dodany',
        color: 'green'
      });

      setAddModalOpen(false);
      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  const handleEditSchedule = async () => {
    try {
      const response = await put('/service-provider/edit-company-work-schedule', {
        id: selectedSchedule.id,
        companyId,
        userId: formData.userId,
        dayOfWeek: formData.dayOfWeek,
        startTime: convertTimeToTimeSpan(formData.startTime),
        endTime: convertTimeToTimeSpan(formData.endTime),
        isBreakTime: formData.isBreakTime,
        breakStartTime: formData.isBreakTime ? convertTimeToTimeSpan(formData.breakStartTime) : null,
        breakEndTime: formData.isBreakTime ? convertTimeToTimeSpan(formData.breakEndTime) : null,
        notes: formData.notes
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Nie udało się zaktualizować grafiku');
      }

      notifications.show({
        title: 'Sukces!',
        message: 'Grafik został zaktualizowany',
        color: 'green'
      });

      setEditModalOpen(false);
      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  const handleDeleteSchedule = async (schedule) => {
    try {
      const response = await del('/service-provider/delete-company-work-schedule', {
        data: {
          id: schedule.id,
          companyId
        }
      });

      if (!response.isSuccess) {
        throw new Error(response.message || 'Nie udało się usunąć grafiku');
      }

      notifications.show({
        title: 'Sukces!',
        message: 'Grafik został usunięty',
        color: 'green'
      });

      await fetchDashboardData();
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: error.message,
        color: 'red'
      });
    }
  };

  const handleOpenEditModal = (schedule) => {
    console.log('Opening edit modal with schedule:', schedule);
    console.log('Schedule user data:', {
      userId: schedule.userId,
      userFullName: schedule.userFullName,
      user: schedule.user
    });
    
    // Próbujemy znaleźć użytkownika na podstawie userFullName
    const matchingUser = users.find(u => 
      `${u.firstName} ${u.lastName}` === schedule.userFullName
    );
    
    console.log('Matching user:', matchingUser);
    
    const userId = matchingUser ? matchingUser.id.toString() : schedule.userId?.toString() || '';
    console.log('Final userId being set:', userId);
    
    setSelectedSchedule(schedule);
    setFormData({
      userId,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime.slice(0, 5),
      endTime: schedule.endTime.slice(0, 5),
      isBreakTime: schedule.isBreakTime,
      breakStartTime: schedule.breakStartTime ? schedule.breakStartTime.slice(0, 5) : '12:00',
      breakEndTime: schedule.breakEndTime ? schedule.breakEndTime.slice(0, 5) : '13:00',
      notes: schedule.notes || ''
    });
    setEditModalOpen(true);
  };

  const ScheduleForm = ({ onSubmit, submitLabel }) => {
    console.log('Rendering ScheduleForm with formData:', formData);
    console.log('Available users:', users);
    
    const selectOptions = users?.map(user => {
      const option = {
        value: user.id.toString(),
        label: `${user.firstName} ${user.lastName}`
      };
      console.log('Created option:', option);
      return option;
    }) || [];
    
    console.log('Select options:', selectOptions);
    console.log('Current userId in form:', formData.userId);
    console.log('Selected option would be:', selectOptions.find(opt => opt.value === formData.userId));
    
    return (
      <Stack>
        <Select
          label="Pracownik"
          required
          searchable
          nothingFound="Brak wyników"
          value={formData.userId || null}
          onChange={(value) => {
            console.log('Select onChange value:', value);
            setFormData(prev => ({ ...prev, userId: value }));
          }}
          data={selectOptions}
        />
        <Select
          label="Dzień tygodnia"
          required
          value={formData.dayOfWeek.toString()}
          onChange={(value) => setFormData({ ...formData, dayOfWeek: parseInt(value) })}
          data={daysOfWeek.map((day, index) => ({
            value: index.toString(),
            label: day
          }))}
        />
        <Grid>
          <Grid.Col span={6}>
            <TimeInput
              label="Godzina rozpoczęcia"
              required
              value={formData.startTime}
              onChange={(event) => setFormData({ ...formData, startTime: event.currentTarget.value })}
              icon={<IconClock size={16} />}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TimeInput
              label="Godzina zakończenia"
              required
              value={formData.endTime}
              onChange={(event) => setFormData({ ...formData, endTime: event.currentTarget.value })}
              icon={<IconClock size={16} />}
            />
          </Grid.Col>
        </Grid>
        <Switch
          label="Przerwa w pracy"
          checked={formData.isBreakTime}
          onChange={(event) => setFormData({ ...formData, isBreakTime: event.currentTarget.checked })}
        />
        {formData.isBreakTime && (
          <Grid>
            <Grid.Col span={6}>
              <TimeInput
                label="Początek przerwy"
                value={formData.breakStartTime}
                onChange={(event) => setFormData({ ...formData, breakStartTime: event.currentTarget.value })}
                icon={<IconClock size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TimeInput
                label="Koniec przerwy"
                value={formData.breakEndTime}
                onChange={(event) => setFormData({ ...formData, breakEndTime: event.currentTarget.value })}
                icon={<IconClock size={16} />}
              />
            </Grid.Col>
          </Grid>
        )}
        <Textarea
          label="Notatki"
          value={formData.notes}
          onChange={(event) => setFormData({ ...formData, notes: event.currentTarget.value })}
        />
        <Group position="right">
          <Button variant="default" onClick={() => {
            setAddModalOpen(false);
            setEditModalOpen(false);
          }}>
            Anuluj
          </Button>
          <Button onClick={onSubmit}>{submitLabel}</Button>
        </Group>
      </Stack>
    );
  };

  return (
    <Card p="md" radius="md" withBorder className={classes.card}>
      <Stack spacing="xl">
        <Group position="apart">
          <Group spacing="md">
            <ThemeIcon size={48} radius="md" variant="light" color="blue">
              <IconCalendarTime size={28} />
            </ThemeIcon>
            <Stack spacing={2}>
              <Title order={2}>Grafiki pracy</Title>
              <Text size="md" color="dimmed">Zarządzaj harmonogramem pracowników</Text>
            </Stack>
          </Group>
          <Button 
            leftIcon={<IconPlus size={16} />} 
            variant="light"
            onClick={() => {
              setFormData({
                ...formData,
                dayOfWeek: selectedDate.getDay()
              });
              setAddModalOpen(true);
            }}
          >
            Dodaj grafik
          </Button>
        </Group>

        <Grid gutter="md">
          <Grid.Col span={7}>
            <Card withBorder radius="md" p="md" shadow="sm">
              <CustomCalendar />
            </Card>
          </Grid.Col>
          <Grid.Col span={5}>
            <Card withBorder radius="md" p="md" shadow="sm" style={{ height: '100%' }}>
              <Stack spacing="md">
                <Group position="apart">
                  <Title order={4} weight={600}>{daysOfWeek[selectedDate.getDay()]}</Title>
                  <Badge size="md" radius="sm" variant="dot" color="blue">
                    {selectedDate.toLocaleDateString('pl-PL', { 
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Badge>
                </Group>
                <Stack spacing="xs">
                  {schedulesByDate.get(selectedDate.getDay())?.length > 0 ? (
                    renderDaySchedules(schedulesByDate.get(selectedDate.getDay()))
                  ) : (
                    <Text color="dimmed" size="md" weight={500} align="center" py="md">
                      Brak grafików na ten dzień
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>

      {/* Modal dodawania */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Dodaj nowy grafik"
        size="lg"
      >
        <ScheduleForm onSubmit={handleAddSchedule} submitLabel="Dodaj grafik" />
      </Modal>

      {/* Modal edycji */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edytuj grafik"
        size="lg"
      >
        <ScheduleForm onSubmit={handleEditSchedule} submitLabel="Zapisz zmiany" />
      </Modal>
    </Card>
  );
}; 