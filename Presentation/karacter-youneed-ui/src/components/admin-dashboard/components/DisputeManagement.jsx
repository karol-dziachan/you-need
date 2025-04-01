import {
  Card,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Badge,
  Table,
  ScrollArea,
  Select,
  Textarea,
  Modal,
  Divider
} from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconX, IconMessage } from '@tabler/icons-react';
import { useState } from 'react';

export const DisputeManagement = () => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResolveDispute = (dispute) => {
    setSelectedDispute(dispute);
    setIsModalOpen(true);
  };

  return (
    <Card withBorder radius="md" p="md">
      <Group position="apart" mb="md">
        <Title order={3}>Zarządzanie sporami</Title>
        <Group>
          <Button variant="light" color="blue" size="sm">
            Filtruj
          </Button>
          <Button variant="light" color="red" size="sm">
            Eksportuj
          </Button>
        </Group>
      </Group>

      <Stack spacing="md">
        <Card withBorder radius="md" p="md">
          <Title order={4} mb="md">Aktywne spory</Title>
          <ScrollArea h={400}>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Typ sporu</th>
                  <th>Firma</th>
                  <th>Użytkownik</th>
                  <th>Data</th>
                  <th>Priorytet</th>
                  <th>Status</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#123</td>
                  <td>Płatność</td>
                  <td>Firma ABC</td>
                  <td>Jan Kowalski</td>
                  <td>2024-03-20</td>
                  <td>
                    <Badge color="red" variant="light">Wysoki</Badge>
                  </td>
                  <td>
                    <Badge color="yellow" variant="light">W trakcie</Badge>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <Button 
                        variant="light" 
                        color="blue" 
                        size="xs"
                        onClick={() => handleResolveDispute({ id: 123 })}
                      >
                        Rozwiąż
                      </Button>
                      <Button variant="light" color="gray" size="xs">
                        <IconMessage size={14} />
                      </Button>
                    </Group>
                  </td>
                </tr>
                <tr>
                  <td>#124</td>
                  <td>Jakość usługi</td>
                  <td>Firma XYZ</td>
                  <td>Anna Nowak</td>
                  <td>2024-03-19</td>
                  <td>
                    <Badge color="yellow" variant="light">Średni</Badge>
                  </td>
                  <td>
                    <Badge color="green" variant="light">Nowy</Badge>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <Button 
                        variant="light" 
                        color="blue" 
                        size="xs"
                        onClick={() => handleResolveDispute({ id: 124 })}
                      >
                        Rozwiąż
                      </Button>
                      <Button variant="light" color="gray" size="xs">
                        <IconMessage size={14} />
                      </Button>
                    </Group>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Card withBorder radius="md" p="md">
          <Title order={4} mb="md">Statystyki sporów</Title>
          <Group position="apart">
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">Otwarte spory</Text>
              <Text size="xl" weight={700}>12</Text>
            </Stack>
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">W trakcie</Text>
              <Text size="xl" weight={700}>5</Text>
            </Stack>
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">Rozwiązane</Text>
              <Text size="xl" weight={700}>8</Text>
            </Stack>
          </Group>
        </Card>
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Rozwiąż spór"
        size="lg"
      >
        <Stack spacing="md">
          <Text size="sm" color="dimmed">
            Spór #{selectedDispute?.id}
          </Text>
          
          <Select
            label="Status rozwiązania"
            placeholder="Wybierz status"
            data={[
              { value: 'resolved', label: 'Rozwiązany' },
              { value: 'rejected', label: 'Odrzucony' },
              { value: 'compensated', label: 'Wyrównany' }
            ]}
          />

          <Textarea
            label="Komentarz"
            placeholder="Dodaj komentarz dotyczący rozwiązania sporu..."
            minRows={3}
          />

          <Group position="right" mt="md">
            <Button variant="light" color="gray" onClick={() => setIsModalOpen(false)}>
              Anuluj
            </Button>
            <Button color="blue">
              Zapisz rozwiązanie
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}; 