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
  Modal,
  Textarea,
  FileInput,
  Image,
  Divider
} from '@mantine/core';
import { IconCheck, IconX, IconFileUpload, IconBuildingStore } from '@tabler/icons-react';
import { useState } from 'react';

export const CompanyVerification = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerifyCompany = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <Card withBorder radius="md" p="md">
      <Group position="apart" mb="md">
        <Title order={3}>Weryfikacja firm</Title>
        <Group>
          <Button variant="light" color="blue" size="sm">
            Filtruj
          </Button>
          <Button variant="light" color="green" size="sm">
            Eksportuj
          </Button>
        </Group>
      </Group>

      <Stack spacing="md">
        <Card withBorder radius="md" p="md">
          <Title order={4} mb="md">Oczekujące weryfikacje</Title>
          <ScrollArea h={400}>
            <Table>
              <thead>
                <tr>
                  <th>Nazwa firmy</th>
                  <th>NIP</th>
                  <th>Data zgłoszenia</th>
                  <th>Status</th>
                  <th>Dokumenty</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Firma ABC</td>
                  <td>1234567890</td>
                  <td>2024-03-20</td>
                  <td>
                    <Badge color="yellow" variant="light">Oczekuje</Badge>
                  </td>
                  <td>
                    <Button variant="light" color="blue" size="xs">
                      <IconFileUpload size={14} />
                    </Button>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <Button 
                        variant="light" 
                        color="green" 
                        size="xs"
                        onClick={() => handleVerifyCompany({ id: 1, name: 'Firma ABC' })}
                      >
                        <IconCheck size={14} />
                      </Button>
                      <Button variant="light" color="red" size="xs">
                        <IconX size={14} />
                      </Button>
                    </Group>
                  </td>
                </tr>
                <tr>
                  <td>Firma XYZ</td>
                  <td>0987654321</td>
                  <td>2024-03-19</td>
                  <td>
                    <Badge color="yellow" variant="light">Oczekuje</Badge>
                  </td>
                  <td>
                    <Button variant="light" color="blue" size="xs">
                      <IconFileUpload size={14} />
                    </Button>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <Button 
                        variant="light" 
                        color="green" 
                        size="xs"
                        onClick={() => handleVerifyCompany({ id: 2, name: 'Firma XYZ' })}
                      >
                        <IconCheck size={14} />
                      </Button>
                      <Button variant="light" color="red" size="xs">
                        <IconX size={14} />
                      </Button>
                    </Group>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Card withBorder radius="md" p="md">
          <Title order={4} mb="md">Statystyki weryfikacji</Title>
          <Group position="apart">
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">Oczekujące</Text>
              <Text size="xl" weight={700}>8</Text>
            </Stack>
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">Zweryfikowane</Text>
              <Text size="xl" weight={700}>45</Text>
            </Stack>
            <Stack spacing="xs">
              <Text size="sm" color="dimmed">Odrzucone</Text>
              <Text size="xl" weight={700}>3</Text>
            </Stack>
          </Group>
        </Card>
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Weryfikacja firmy"
        size="lg"
      >
        <Stack spacing="md">
          <Text size="sm" color="dimmed">
            Firma: {selectedCompany?.name}
          </Text>
          
          <Card withBorder radius="md" p="md">
            <Title order={5} mb="md">Dokumenty do weryfikacji</Title>
            <Stack spacing="md">
              <FileInput
                label="Dokumenty rejestrowe"
                placeholder="Prześlij dokumenty"
                icon={<IconFileUpload size={14} />}
                accept="image/*,.pdf"
              />
              <FileInput
                label="Dokumenty dodatkowe"
                placeholder="Prześlij dodatkowe dokumenty"
                icon={<IconFileUpload size={14} />}
                accept="image/*,.pdf"
              />
            </Stack>
          </Card>

          <Textarea
            label="Komentarz"
            placeholder="Dodaj komentarz dotyczący weryfikacji..."
            minRows={3}
          />

          <Group position="right" mt="md">
            <Button variant="light" color="gray" onClick={() => setIsModalOpen(false)}>
              Anuluj
            </Button>
            <Button color="green">
              Zweryfikuj firmę
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}; 