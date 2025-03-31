import { Container, Stack, Paper, Grid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { DashboardHeader } from '../../components/service-provider-dashboard/DashboardHeader';
import { Stats } from '../../components/service-provider-dashboard/Stats';
import { QuickActions } from '../../components/service-provider-navbar/QuickActions';
import { CompanyManagement } from '../../components/service-provider-dashboard/CompanyManagement';
import { EmployeesManagement } from '../../components/service-provider-dashboard/EmployeesManagement';
import { WalletManagement } from '../../components/service-provider-dashboard/WalletManagement';

const ServiceProviderDashboardPage = () => {
  const { get } = useApi();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      console.log('fetching dashboard data');
      const response = await get('/service-provider/dashboard-data');
      console.log('response', response);
      setDashboardData(response.dashboardData);
    } catch (err) {
      setError(err.message);
      console.error('Błąd podczas pobierania danych:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [get]);

  const handleActionSelect = (actionId) => {
    navigate(`/service-provider/${actionId}`);
  };

  const renderContent = () => {
    const path = location.pathname.split('/').pop();
    
    switch (path) {
      case 'offers':
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="md">
              <Text size="xl" weight={700}>Moja oferta</Text>
              <Text size="sm" color="dimmed">
                Tu będzie zarządzanie ofertami
              </Text>
            </Stack>
          </Paper>
        );
      case 'dashboard':
        return <CompanyManagement dashboardData={dashboardData} fetchDashboardData={fetchDashboardData} />;
      case 'employees':
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="xl">
              <Stack spacing="xs">
                <Text size="xl" weight={700}>Zarządzanie pracownikami</Text>
                <Text size="sm" color="dimmed">
                  Moduł zarządzania pracownikami - w trakcie rozwoju
                </Text>
              </Stack>

              <Grid>
                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">🎯 Planowane funkcjonalności</Text>
                      <Text size="sm">
                        W tym module będziesz mógł w pełni zarządzać swoim zespołem. Planowane funkcje to:
                      </Text>
                      <Stack spacing="xs" ml="md">
                        <Text size="sm">• Dodawanie i usuwanie pracowników</Text>
                        <Text size="sm">• Zarządzanie uprawnieniami</Text>
                        <Text size="sm">• Przydzielanie zadań i projektów</Text>
                        <Text size="sm">• Monitorowanie czasu pracy</Text>
                        <Text size="sm">• Oceny i feedback</Text>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">⌛ Status wdrożenia</Text>
                      <Text size="sm">
                        Aktualnie pracujemy nad implementacją tego modułu. Spodziewaj się pierwszej wersji w najbliższym czasie.
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        );
      case 'wallet':
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="xl">
              <Stack spacing="xs">
                <Text size="xl" weight={700}>Mój portfel</Text>
                <Text size="sm" color="dimmed">
                  Wersja 2.0 - Nowy system zarządzania portfelem w trakcie rozwoju
                </Text>
              </Stack>

              <Grid>
                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">🚀 Co nowego w systemie portfela?</Text>
                      <Text size="sm">
                        Pracujemy nad kompleksowym systemem zarządzania portfelem, który zrewolucjonizuje sposób, w jaki zarządzasz finansami swojej firmy. Nowa wersja wprowadzi:
                      </Text>
                      <Stack spacing="xs" ml="md">
                        <Text size="sm">• Natychmiastowe wypłaty środków</Text>
                        <Text size="sm">• Szczegółowe zestawienia transakcji</Text>
                        <Text size="sm">• Automatyczne rozliczenia</Text>
                        <Text size="sm">• Wielowalutowe konta</Text>
                        <Text size="sm">• System powiadomień o saldzie</Text>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">⏳ Harmonogram wdrożenia</Text>
                      <Text size="sm">
                        Aktualnie znajdujemy się w fazie intensywnego rozwoju. Planowane uruchomienie nowego systemu nastąpi w ciągu najbliższych tygodni. Będziemy informować o postępach i nowych funkcjonalnościach.
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">💡 Twój wkład jest ważny!</Text>
                      <Text size="sm">
                        Chcemy, aby nowy system portfela idealnie odpowiadał Twoim potrzebom. Jeśli masz sugestie lub pomysły dotyczące funkcjonalności, które chciałbyś zobaczyć w nowej wersji, daj nam znać!
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        );
      case 'payments':
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="xl">
              <Stack spacing="xs">
                <Text size="xl" weight={700}>Moje płatności</Text>
                <Text size="sm" color="dimmed">
                  Wersja 2.0 - Nowy system zarządzania płatnościami w trakcie rozwoju
                </Text>
              </Stack>

              <Grid>
                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">🚀 Co nowego w systemie płatności?</Text>
                      <Text size="sm">
                        Pracujemy nad kompleksowym systemem zarządzania płatnościami, który zrewolucjonizuje sposób, w jaki zarządzasz finansami swojej firmy. Nowa wersja wprowadzi:
                      </Text>
                      <Stack spacing="xs" ml="md">
                        <Text size="sm">• Automatyczne rozliczenia z pracownikami</Text>
                        <Text size="sm">• Zaawansowane raporty finansowe</Text>
                        <Text size="sm">• Integrację z popularnymi systemami księgowymi</Text>
                        <Text size="sm">• Wielowalutowe rozliczenia</Text>
                        <Text size="sm">• System powiadomień o płatnościach</Text>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">⏳ Harmonogram wdrożenia</Text>
                      <Text size="sm">
                        Aktualnie znajdujemy się w fazie intensywnego rozwoju. Planowane uruchomienie nowego systemu nastąpi w ciągu najbliższych tygodni. Będziemy informować o postępach i nowych funkcjonalnościach.
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">💡 Twój wkład jest ważny!</Text>
                      <Text size="sm">
                        Chcemy, aby nowy system płatności idealnie odpowiadał Twoim potrzebom. Jeśli masz sugestie lub pomysły dotyczące funkcjonalności, które chciałbyś zobaczyć w nowej wersji, daj nam znać!
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        );

      case 'bookings':
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="xl">
              <Stack spacing="xs">
                <Text size="xl" weight={700}>Historia zapisów</Text>
                <Text size="sm" color="dimmed">
                  Wersja 2.0 - Nowy system zarządzania rezerwacjami w trakcie rozwoju
                </Text>
              </Stack>

              <Grid>
                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">🚀 Co nowego w systemie rezerwacji?</Text>
                      <Text size="sm">
                        Pracujemy nad kompleksowym systemem zarządzania rezerwacjami, który usprawni sposób obsługi klientów w Twojej firmie. Nowa wersja wprowadzi:
                      </Text>
                      <Stack spacing="xs" ml="md">
                        <Text size="sm">• Zaawansowany kalendarz rezerwacji</Text>
                        <Text size="sm">• Automatyczne powiadomienia dla klientów</Text>
                        <Text size="sm">• System ocen i opinii</Text>
                        <Text size="sm">• Statystyki i raporty wizyt</Text>
                        <Text size="sm">• Integrację z systemem płatności</Text>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">⏳ Harmonogram wdrożenia</Text>
                      <Text size="sm">
                        Aktualnie znajdujemy się w fazie intensywnego rozwoju. Planowane uruchomienie nowego systemu nastąpi w ciągu najbliższych tygodni. Będziemy informować o postępach i nowych funkcjonalnościach.
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Paper p="md" radius="md" withBorder>
                    <Stack spacing="md">
                      <Text weight={600} size="lg">💡 Twój wkład jest ważny!</Text>
                      <Text size="sm">
                        Chcemy, aby nowy system rezerwacji idealnie odpowiadał Twoim potrzebom. Jeśli masz sugestie lub pomysły dotyczące funkcjonalności, które chciałbyś zobaczyć w nowej wersji, daj nam znać!
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        );
      default:
        return (
          <Paper p="xl" radius="md" withBorder>
            <Stack spacing="md">
              <Text size="xl" weight={700}>Dane z API:</Text>
              <Text size="sm" color="dimmed">
                Wybierz sekcję z menu po prawej stronie, aby zobaczyć szczegółowe dane
              </Text>
            </Stack>
          </Paper>
        );
    }
  };

  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        {/* {dashboardData && console.log('dashboardData', dashboardData?.company?.name)} */}
        <DashboardHeader 
            companyName={dashboardData?.company?.name} 
            numberOfEmployees={dashboardData?.companyUsers?.length} 
            lastLoginDate={dashboardData?.user?.lastLoginDate} 
            tasksNumber={0} 
        />

        {error && (
          <Paper p="md" withBorder color="red">
            <Text color="red">Błąd podczas pobierania danych: {error}</Text>
          </Paper>
        )}

        <Stats />

        <Grid>
          <Grid.Col span={8}>
            {renderContent()}
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack spacing="md">
              <QuickActions 
                onActionSelect={handleActionSelect}
                activeAction={location.pathname.split('/').pop()}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ServiceProviderDashboardPage;
