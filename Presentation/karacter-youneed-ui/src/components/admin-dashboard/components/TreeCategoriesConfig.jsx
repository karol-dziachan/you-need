import { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Switch,
  Modal,
  ActionIcon,
  Tooltip,
  Badge,
  ScrollArea,
  Paper,
  Divider
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconFile
} from '@tabler/icons-react';
import { useOffers } from '../../../hooks/useOffers';
import { notifications } from '@mantine/notifications';
import { Loader } from '../../../components/loader/Loader';

const OfferNode = ({ offer, level = 0, onEdit, onDelete, onAddChild }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOffer, setEditedOffer] = useState(offer);

  const handleSave = async () => {
    try {
      await onEdit(offer.id, editedOffer);
      setIsEditing(false);
      notifications.show({
        title: 'Sukces',
        message: 'Oferta została zaktualizowana',
        color: 'green'
      });
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się zaktualizować oferty',
        color: 'red'
      });
    }
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <Paper withBorder p="xs" mb="xs">
        <Group position="apart">
          <Group spacing="xs">
            {offer.isParentOffer && (
              <ActionIcon
                variant="subtle"
                onClick={() => setIsExpanded(!isExpanded)}
                size="sm"
              >
                {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
              </ActionIcon>
            )}
            {offer.isParentOffer ? <IconFolder size={16} /> : <IconFile size={16} />}
            {isEditing ? (
              <Group spacing="xs">
                <TextInput
                  value={editedOffer.name}
                  onChange={(e) => setEditedOffer({ ...editedOffer, name: e.target.value })}
                  size="sm"
                  style={{ width: 200 }}
                />
                <Button size="xs" onClick={handleSave}>Zapisz</Button>
                <Button size="xs" variant="subtle" onClick={() => {
                  setIsEditing(false);
                  setEditedOffer(offer);
                }}>Anuluj</Button>
              </Group>
            ) : (
              <Text size="sm" weight={500}>{offer.name}</Text>
            )}
          </Group>
          {!['sprzątanie', 'remont'].includes(offer.name.toLowerCase()) && (
            <></>
          )}
          <Group spacing="xs">
            <Badge color={offer.isActive ? 'green' : 'red'} variant="light">
              {offer.isActive ? 'Aktywna' : 'Nieaktywna'}
            </Badge>
            <Tooltip label="Dodaj podkategorię">
              <ActionIcon
                variant="light"
                color="blue"
                onClick={() => onAddChild(offer.id)}
                size="sm"
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edytuj">
              <ActionIcon
                variant="light"
                color="yellow"
                onClick={() => setIsEditing(!isEditing)}
                size="sm"
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Usuń">
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => onDelete(offer.id)}
                size="sm"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Paper>
      {isExpanded && offer.children?.map((child) => (
        <OfferNode
          key={child.id}
          offer={child}
          level={level + 1}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
};

export const TreeCategoriesConfig = () => {
  const { getAllOffers, createOffer, updateOffer, deleteOffer } = useOffers();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [newOffer, setNewOffer] = useState({
    name: '',
    description: '',
    isHead: false,
    isParentOffer: false,
    isActive: true
  });

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOffers();
      if (response && response.offers) {
        const offersTree = buildOfferTree(response.offers);
        setOffers(offersTree);
      }
    } catch (error) {
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się załadować ofert',
        color: 'red'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buildOfferTree = (offers) => {
    const offerMap = new Map();
    const roots = [];

    // Najpierw tworzymy mapę wszystkich ofert
    offers.forEach(offer => {
      offerMap.set(offer.id, { ...offer, children: [] });
    });

    // Następnie budujemy drzewo
    offers.forEach(offer => {
      const offerNode = offerMap.get(offer.id);
      if (offer.isHead) {
        roots.push(offerNode);
      } else if (offer.parentOfferId) {
        const parent = offerMap.get(offer.parentOfferId);
        if (parent) {
          parent.children.push(offerNode);
        }
      }
    });

    return roots;
  };

  const handleCreateOffer = async () => {
    const offerData = {
      ...newOffer,
      parentOfferId: selectedParentId
    };
    const result = await createOffer(offerData);
    if (result && result !== null) {
      setIsModalOpen(false);
      setNewOffer({
        name: '',
        description: '',
        isHead: false,
        isParentOffer: false,
        isActive: true
      });
      loadOffers();
    } 
  };
     

  const handleEditOffer = async (id, updatedOffer) => {
    await updateOffer(id, updatedOffer);
    loadOffers();
  };

  const handleDeleteOffer = async (id) => {
    try {
      console.log('in handleDeleteOffer', id);
      await deleteOffer(id);
      loadOffers();
 
    } catch (error) {

    }
  };

  const handleAddChild = (parentId) => {
    setSelectedParentId(parentId);
    setNewOffer({
      name: '',
      description: '',
      isHead: false,
      isParentOffer: true,
      isActive: true
    });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card withBorder radius="md" p="md">
      <Group position="apart" mb="md">
        <Title order={3}>Drzewko ofert</Title>
        <Button
          leftIcon={<IconPlus size={16} />}
          onClick={() => {
            setSelectedParentId(null);
            setNewOffer({
              name: '',
              description: '',
              isHead: true,
              isParentOffer: true,
              isActive: true
            });
            setIsModalOpen(true);
          }}
        >
          Dodaj główną ofertę
        </Button>
      </Group>

      <ScrollArea h={600}>
        <Stack spacing="xs">
          {offers.map((offer) => (
            <OfferNode
              key={offer.id}
              offer={offer}
              onEdit={handleEditOffer}
              onDelete={handleDeleteOffer}
              onAddChild={handleAddChild}
            />
          ))}
        </Stack>
      </ScrollArea>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nowa oferta"
        size="md"
      >
        <Stack spacing="md">
          <TextInput
            label="Nazwa"
            value={newOffer.name}
            onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
          />
          <Textarea
            label="Opis"
            value={newOffer.description}
            onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
          />
          <Switch
            label="Oferta główna"
            checked={newOffer.isHead}
            onChange={(e) => setNewOffer({ ...newOffer, isHead: e.currentTarget.checked })}
          />
          <Switch
            label="Oferta nadrzędna"
            checked={newOffer.isParentOffer}
            onChange={(e) => setNewOffer({ ...newOffer, isParentOffer: e.currentTarget.checked })}
          />
          <Switch
            label="Aktywna"
            checked={newOffer.isActive}
            onChange={(e) => setNewOffer({ ...newOffer, isActive: e.currentTarget.checked })}
          />
          <Group position="right" mt="md">
            <Button variant="subtle" onClick={() => setIsModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleCreateOffer}>
              Zapisz
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}; 