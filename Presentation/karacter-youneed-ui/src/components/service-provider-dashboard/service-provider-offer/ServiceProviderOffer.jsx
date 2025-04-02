import { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Accordion,
  TextInput,
  Textarea,
  NumberInput,
  Modal,
  ActionIcon,
  Tooltip,
  Badge,
  ScrollArea,
  Paper,
  Select,
  Switch,
  Divider
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconBuilding,
  IconUser,
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconFile,
  IconList
} from '@tabler/icons-react';
import { useEntityOffers } from '../../../hooks/useEntityOffers';
import { useOffers } from '../../../hooks/useOffers';
import { useStyles } from './ServiceProviderOffer.styles';
import { useJwtData } from '../../../hooks/useJwtData';

// Komponent do wyświetlania drzewka ofert
const OfferTree = ({ offers, onSelectOffer, selectedOfferId, companyOffers = [], onAddCustomCategory }) => {
  const { classes } = useStyles();
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedParentOffer, setSelectedParentOffer] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const toggleNode = (offerId) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(offerId)) {
      newExpandedNodes.delete(offerId);
    } else {
      newExpandedNodes.add(offerId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const isOfferAlreadyAdded = (offerId) => {
    return companyOffers.some(offer => offer.offerId === offerId);
  };

  const handleAddCustomCategory = (parentOffer) => {
    setSelectedParentOffer(parentOffer);
    setIsAddCategoryModalOpen(true);
  };

  const submitNewCategory = async () => {
    if (newCategoryName.trim() && selectedParentOffer) {
      setIsAddingCategory(true);
      try {
        const result = await onAddCustomCategory({
          name: newCategoryName,
          description: newCategoryDescription,
          parentOfferId: selectedParentOffer.id,
          isActive: false,
          isAddedByUser: true
        });
        
        if (result && result.isSuccess) {
          setNewCategoryName('');
          setNewCategoryDescription('');
          setIsAddCategoryModalOpen(false);
          setSelectedParentOffer(null);
        }
      } catch (error) {
        console.error('Błąd podczas dodawania kategorii:', error);
      } finally {
        setIsAddingCategory(false);
      }
    }
  };

  const renderOfferNode = (offer, level = 0) => {
    if (!offer) return null;
    
    const isExpanded = expandedNodes.has(offer.id);
    const hasChildren = offer.children && offer.children.length > 0;
    const isRootOffer = level === 0;
    const isSelected = selectedOfferId === offer.id;
    const isAlreadyAdded = isOfferAlreadyAdded(offer.id);
    const isParentOffer = hasChildren;

    return (
      <div key={offer.id} style={{ marginLeft: `${level * 20}px` }}>
        <Paper 
          withBorder 
          p="xs" 
          mb="xs" 
          className={`
            ${classes.offerTreeItem} 
            ${isRootOffer ? classes.rootOfferItem : ''} 
            ${isSelected ? classes.selectedOfferTreeItem : ''}
            ${isAlreadyAdded ? classes.disabledOfferTreeItem : ''}
          `}
          onClick={() => !isRootOffer && !isAlreadyAdded && onSelectOffer(offer)}
        >
          <Group position="apart">
            <Group spacing="xs">
              {hasChildren && (
                <ActionIcon
                  variant="subtle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNode(offer.id);
                  }}
                  size="sm"
                >
                  {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                </ActionIcon>
              )}
              {isParentOffer ? <IconFolder size={16} /> : <IconFile size={16} />}
              <Text size="sm" weight={isSelected ? 600 : 500}>{offer.name}</Text>
              {isAlreadyAdded && (
                <Badge color="blue" variant="light" size="sm">Już dodana</Badge>
              )}
            </Group>
            <Group spacing="xs">
              <Badge color={offer.isActive ? 'green' : 'red'} variant="light">
                {offer.isActive ? 'Aktywna' : 'Nieaktywna'}
              </Badge>
              {isRootOffer && (
                <Badge 
                  color="blue" 
                  variant="light" 
                  size="sm"
                  leftSection={<IconList size={12} />}
                >
                  Firma oferuje {companyOffers.filter(o => o.parentOfferId === offer.id).length} podrzędnych ofert
                </Badge>
              )}
              <Tooltip label="Dodaj swoją kategorię">
                <ActionIcon
                  variant="light"
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddCustomCategory(offer);
                  }}
                >
                  <IconPlus size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Paper>
        {isExpanded && hasChildren && (
          <div>
            {offer.children.map(child => renderOfferNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ScrollArea h={300}>
        <Stack spacing="xs">
          {offers && offers.length > 0 ? (
            offers.map(offer => renderOfferNode(offer))
          ) : (
            <Text color="dimmed" align="center">Brak ofert do wyświetlenia</Text>
          )}
        </Stack>
      </ScrollArea>

      {/* Modal do dodawania własnej kategorii */}
      <Modal
        opened={isAddCategoryModalOpen}
        onClose={() => {
          setIsAddCategoryModalOpen(false);
          setSelectedParentOffer(null);
          setNewCategoryName('');
          setNewCategoryDescription('');
        }}
        title="Dodaj swoją kategorię"
        size="md"
      >
        <Stack spacing="md">
          <TextInput
            label="Nazwa kategorii"
            placeholder="Wprowadź nazwę kategorii"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.currentTarget.value)}
            required
          />
          <Textarea
            label="Opis kategorii"
            placeholder="Wprowadź opis kategorii (opcjonalnie)"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.currentTarget.value)}
          />
          <Text size="sm" color="dimmed">
            Kategoria zostanie dodana jako nieaktywna i będzie oznaczona jako dodana przez użytkownika.
          </Text>
          <Group position="right">
            <Button variant="subtle" onClick={() => {
              setIsAddCategoryModalOpen(false);
              setSelectedParentOffer(null);
              setNewCategoryName('');
              setNewCategoryDescription('');
            }}>
              Anuluj
            </Button>
            <Button 
              onClick={submitNewCategory} 
              disabled={!newCategoryName.trim() || isAddingCategory}
              loading={isAddingCategory}
            >
              Dodaj kategorię
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

const OfferForm = ({ offer, onSubmit, onCancel, availableOffers, entityType, entityId, selectedOffer }) => {
  const { classes } = useStyles();
  const [formData, setFormData] = useState(offer || {
    offerId: selectedOffer ? selectedOffer.id : '',
    whichEntity: entityType || 'Company',
    entityId: entityId || '',
    timeToCompleteInMinutes: 0,
    price: 0,
    currency: 'PLN',
    unitOfMeasure: 'sztuka',
    isActive: true
  });

  // Aktualizuj formData, gdy zmieni się selectedOffer
  useEffect(() => {
    if (selectedOffer && !offer) {
      setFormData(prev => ({
        ...prev,
        offerId: selectedOffer.id
      }));
    }
  }, [selectedOffer, offer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack spacing="md">
        <Select
          label="Oferta"
          value={formData.offerId}
          onChange={(value) => setFormData({ ...formData, offerId: value })}
          data={availableOffers.filter(offer => offer.parentOfferId !== null).map(offer => ({ value: offer.id, label: offer.name }))}
          required
          disabled={!!selectedOffer}
          searchable
          nothingFound="Brak wyników"
          placeholder="Wybierz ofertę"
        />
        <NumberInput
          label="Czas realizacji (minuty)"
          value={formData.timeToCompleteInMinutes}
          onChange={(value) => setFormData({ ...formData, timeToCompleteInMinutes: value })}
          min={0}
          required
        />
        <NumberInput
          label="Cena"
          value={formData.price}
          onChange={(value) => setFormData({ ...formData, price: value })}
          min={0}
          precision={2}
          required
        />
        <Select
          label="Waluta"
          value={formData.currency}
          onChange={(value) => setFormData({ ...formData, currency: value })}
          data={[
            { value: 'PLN', label: 'PLN' },
            { value: 'EUR', label: 'EUR' },
            { value: 'USD', label: 'USD' }
          ]}
          required
        />
        <Select
          label="Jednostka miary"
          value={formData.unitOfMeasure}
          onChange={(value) => setFormData({ ...formData, unitOfMeasure: value })}
          data={[
            { value: 'sztuka', label: 'Sztuka' },
            { value: 'godzina', label: 'Godzina' },
            { value: 'dzień', label: 'Dzień' },
            { value: 'miesiąc', label: 'Miesiąc' }
          ]}
          required
        />
        <Switch
          label="Aktywna"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.currentTarget.checked })}
        />
        <Group position="right" mt="md">
          <Button variant="subtle" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit">
            {offer ? 'Zapisz zmiany' : 'Dodaj ofertę'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

const WorkerAccordionItem = ({ worker, offers, onAddOffer, onEditOffer, onDeleteOffer, availableOffers }) => {
  const { classes } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const workerOffers = offers.filter(offer => offer.whichEntity === 'Worker' && offer.entityId === worker.id);

  return (
    <Accordion.Item value={worker.id.toString()}>
      <Accordion.Control>
        <Group>
          <IconUser size={20} />
          <Text weight={500}>{worker.name}</Text>
          <Badge color={workerOffers.length > 0 ? 'green' : 'gray'}>
            {workerOffers.length} ofert
          </Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack spacing="md">
          {workerOffers.map((offer) => (
            <Paper key={offer.id} withBorder p="md" className={classes.offerCard}>
              <Group position="apart">
                <Stack spacing="xs">
                  <Text weight={500}>{offer.name}</Text>
                  <Text size="sm" color="dimmed">
                    Czas realizacji: {offer.timeToCompleteInMinutes} min
                  </Text>
                  <Text weight={500} color="blue">
                    {offer.price} {offer.currency} / {offer.unitOfMeasure}
                  </Text>
                </Stack>
                <Group spacing="xs">
                  <Badge color={offer.isActive ? 'green' : 'red'}>
                    {offer.isActive ? 'Aktywna' : 'Nieaktywna'}
                  </Badge>
                  <Tooltip label="Edytuj">
                    <ActionIcon
                      variant="light"
                      color="yellow"
                      onClick={() => {
                        setEditingOffer(offer);
                        setIsModalOpen(true);
                      }}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Usuń">
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => onDeleteOffer(offer.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            </Paper>
          ))}
          <Button
            leftIcon={<IconPlus size={16} />}
            variant="light"
            onClick={() => {
              setEditingOffer(null);
              setIsModalOpen(true);
            }}
          >
            Dodaj ofertę
          </Button>
        </Stack>
      </Accordion.Panel>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOffer(null);
        }}
        title={editingOffer ? 'Edytuj ofertę' : 'Nowa oferta'}
        size="md"
      >
        <OfferForm
          offer={editingOffer}
          availableOffers={availableOffers}
          entityType="Worker"
          entityId={worker.id}
          onSubmit={async (data) => {
            if (editingOffer) {
              await onEditOffer({ ...data, id: editingOffer.id });
            } else {
              await onAddOffer(data);
            }
            setIsModalOpen(false);
            setEditingOffer(null);
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingOffer(null);
          }}
        />
      </Modal>
    </Accordion.Item>
  );
};

export const ServiceProviderOffer = ({ companyId, dashboardData }) => {
  const { classes } = useStyles();
  const userData = useJwtData();

  const { getOffersForProvider, addEntityOffer, editEntityOffer, deleteEntityOffer } = useEntityOffers();
  const { getAllOffers, buildOfferTree, createOffer } = useOffers();
  const [offers, setOffers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [availableOffers, setAvailableOffers] = useState([]);
  const [offerTree, setOfferTree] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersMap, setOffersMap] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [categoryPaths, setCategoryPaths] = useState({});
  const [groupedOffers, setGroupedOffers] = useState({});
  const [companyUsers, setCompanyUsers] = useState([]);
  const [isWorkerOfferModalOpen, setIsWorkerOfferModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isAligningOffers, setIsAligningOffers] = useState(false);
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Aktualizuj companyUsers, gdy zmieni się dashboardData
  useEffect(() => {
    if (dashboardData && dashboardData.companyUsers) {
      setCompanyUsers(dashboardData.companyUsers.filter(x => x.isActive));
    }
  }, [dashboardData]);

  // Funkcja do budowania ścieżki kategorii dla oferty
  const buildCategoryPath = (offerId, tree = offerTree) => {
    if (!offerId || !tree || tree.length === 0) return 'Brak kategorii';
    
    for (const node of tree) {
      if (node.id === offerId) {
        return node.name;
      }
      
      if (node.children && node.children.length > 0) {
        const childPath = buildCategoryPath(offerId, node.children);
        if (childPath !== 'Brak kategorii') {
          return `${node.name} / ${childPath}`;
        }
      }
    }
    
    return 'Brak kategorii';
  };

  // Funkcja do grupowania ofert według kategorii
  const groupOffersByCategory = (offersList) => {
    const grouped = {};
    
    offersList.forEach(offer => {
      const offerData = offersMap[offer.offerId] || {};
      const categoryPath = categoryPaths[offer.offerId] || 'Brak kategorii';
      
      if (!grouped[categoryPath]) {
        grouped[categoryPath] = [];
      }
      
      grouped[categoryPath].push(offer);
    });
    
    return grouped;
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [entityOffersResponse, offersResponse] = await Promise.all([
        getOffersForProvider(companyId),
        getAllOffers()
      ]);
      
      //console.log('entityOffersResponse:', entityOffersResponse);
      //console.log('offersResponse:', offersResponse);
      
      if (entityOffersResponse && entityOffersResponse.isSuccess) {
        setOffers(entityOffersResponse.offersForCompany || []);
        
        // Poprawione mapowanie ofert pracowników
        const workerOffersMap = {};
        if (entityOffersResponse.offersForWorker && Array.isArray(entityOffersResponse.offersForWorker)) {
          entityOffersResponse.offersForWorker.forEach(workerOffer => {
            if (workerOffer.worker && workerOffer.worker.id) {
              if (!workerOffersMap[workerOffer.worker.id]) {
                workerOffersMap[workerOffer.worker.id] = [];
              }
              workerOffersMap[workerOffer.worker.id].push(workerOffer);
            }
          });
        }
        setWorkers(workerOffersMap);
        
        //console.log('Oferty firmy:', entityOffersResponse.offersForCompany);
        //console.log('Oferty pracowników (zmapowane):', workerOffersMap);
      }
      
      if (offersResponse && offersResponse.isSuccess && offersResponse.offers) {
        setAvailableOffers(offersResponse.offers);
        //console.log('offersResponse.offers', offersResponse.offers);
        const tree = buildOfferTree(offersResponse.offers);
        //console.log('Zbudowane drzewko:', tree);
        setOfferTree(tree);
        
        const offersMap = {};
        offersResponse.offers.forEach(offer => {
          offersMap[offer.id] = offer;
        });
        setOffersMap(offersMap);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const companyOffers = offers;

  const handleSelectOffer = (offer) => {
    //console.log('Wybrano ofertę:', offer);
    setSelectedOffer(offer);
    // Automatycznie otwórz modal z formularzem po wybraniu oferty
    setIsModalOpen(true);
  };

  const handleAddCompanyOffer = async (formData) => {
    try {
      if (!selectedOffer) {
        notifications.show({
          title: 'Błąd',
          message: 'Wybierz ofertę z drzewka przed dodaniem',
          color: 'red'
        });
        return;
      }

      const offerData = {
        addEntityOfferDtos: [{
          offerId: selectedOffer.id,
          whichEntity: 'Company',
          entityId: companyId,
          timeToCompleteInMinutes: formData.timeToCompleteInMinutes,
          price: formData.price,
          currency: formData.currency,
          unitOfMeasure: formData.unitOfMeasure,
          isActive: formData.isActive
        }]
      };

      //console.log('Wysyłane dane oferty:', offerData);
      const response = await addEntityOffer(offerData);
      //console.log('Odpowiedź z API po dodaniu:', response);

      if (response && response !== null) {
        //console.log('Oferta dodana pomyślnie');
        loadData(); // Odświeżamy dane po dodaniu
        setIsModalOpen(false);
        setSelectedOffer(null); // Resetuj wybraną ofertę po dodaniu

        setEditingOffer(null);
        setSelectedOffer(null);
      }

    } catch (error) {
      console.error('Error adding company offer:', error);
    }
  };

  const handleEditCompanyOffer = async (formData) => {
    try {
      if (!editingOffer) {
        notifications.show({
          title: 'Błąd',
          message: 'Brak oferty do edycji',
          color: 'red'
        });
        return;
      }

      const offerData = {
        id: editingOffer.id,
        offerId: editingOffer.offerId,
        whichEntity: 'Company',
        entityId: companyId,
        timeToCompleteInMinutes: formData.timeToCompleteInMinutes,
        price: formData.price,
        currency: formData.currency,
        unitOfMeasure: formData.unitOfMeasure,
        isActive: formData.isActive
      };

      //console.log('Wysyłane dane do edycji:', offerData);
      const response = await editEntityOffer(offerData);
      //console.log('Odpowiedź z API po edycji:', response);

      if (response && response !== null) {
        //console.log('Oferta zaktualizowana pomyślnie');
        loadData(); // Odświeżamy dane po edycji
        setIsModalOpen(false);
        setEditingOffer(null);

        setEditingOffer(null);
        setSelectedOffer(null);
      }

    } catch (error) {
      console.error('Error editing company offer:', error);
    }
  };

  const handleAddWorkerOffer = async (formData) => {
    try {
      if (!selectedWorker) {
        notifications.show({
          title: 'Błąd',
          message: 'Nie wybrano pracownika',
          color: 'red'
        });
        return;
      }

      const offerData = {
        addEntityOfferDtos: [{
          offerId: formData.offerId,
          whichEntity: 'Worker',
          entityId: selectedWorker.id,
          timeToCompleteInMinutes: formData.timeToCompleteInMinutes,
          price: formData.price,
          currency: formData.currency,
          unitOfMeasure: formData.unitOfMeasure,
          isActive: formData.isActive
        }]
      };

      console.log('Wysyłane dane oferty pracownika:', offerData);
      const response = await addEntityOffer(offerData);
      //console.log('Odpowiedź z API po dodaniu oferty pracownika:', response);

      if (response && response !== null) {
        //console.log('Oferta pracownika dodana pomyślnie');
        loadData(); // Odświeżamy dane po dodaniu
        setIsWorkerOfferModalOpen(false);
        setSelectedWorker(null);
      }

    } catch (error) {
      console.error('Error adding worker offer:', error);
    }
  };

  const handleAlignWorkerOffers = async (worker) => {
    try {
      setIsAligningOffers(true);
      
      // Pobierz oferty pracownika
      const workerOffers = workers[worker.id] || [];
      
      // Pobierz oferty firmy
      const companyOffers = offers || [];
      
      // Znajdź oferty, których pracownik nie ma
      const missingOffers = companyOffers.filter(companyOffer => {
        // Sprawdź, czy pracownik już ma tę ofertę
        return !workerOffers.some(workerOffer => workerOffer.offerId === companyOffer.offerId);
      });
      
      //console.log('Brakujące oferty dla pracownika:', missingOffers);
      
      if (missingOffers.length === 0) {
        notifications.show({
          title: 'Informacja',
          message: 'Pracownik ma już wszystkie oferty firmy',
          color: 'blue'
        });
        setIsAligningOffers(false);
        return;
      }
      
      // Przygotuj dane do dodania

      const offerDtos = Array.from(missingOffers, offer => ({
        offerId: offer.offerId,
        whichEntity: 'Worker',
        entityId: worker.id,
        timeToCompleteInMinutes: offer.timeToCompleteInMinutes,
        price: offer.price,
        currency: offer.currency,
        unitOfMeasure: offer.unitOfMeasure,
        isActive: offer.isActive
      }));

      const offerData = {
        addEntityOfferDtos: offerDtos
      };
      
      console.log('Wysyłane dane do wyrównania ofert:', offerData);
      
      // Wyślij żądanie do API
      const response = await addEntityOffer(offerData);
      
      if (response && response.isSuccess) {
        notifications.show({
          title: 'Sukces',
          message: `Dodano ${missingOffers.length} ofert do profilu pracownika`,
          color: 'green'
        });
        
        // Odśwież dane
        loadData();
      } else {
        notifications.show({
          title: 'Błąd',
          message: 'Nie udało się wyrównać ofert pracownika',
          color: 'red'
        });
      }
    } catch (error) {
      console.error('Error aligning worker offers:', error);
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas wyrównywania ofert',
        color: 'red'
      });
    } finally {
      setIsAligningOffers(false);
    }
  };

  const handleAddCustomCategory = async (categoryData) => {
    try {
      setIsAddingCustomCategory(true);
      
      // Najpierw tworzymy nową ofertę (kategorię)
      const newOfferData = {
        name: categoryData.name,
        description: categoryData.description,
        parentOfferId: categoryData.parentOfferId,
        isActive: false,
        isAddedByUser: true,
        isParentOffer: true
      };
      
      console.log('Tworzenie nowej kategorii:', newOfferData);
      
      // Wywołujemy API do utworzenia nowej oferty
      const createOfferResponse = await createOffer(newOfferData);
      
      if (createOfferResponse && createOfferResponse.isSuccess && createOfferResponse.id) {
        // Jeśli oferta została utworzona, dodajemy ją do ofert firmy
        const entityOfferData = {
          addEntityOfferDtos: [{
            offerId: createOfferResponse.id,
            whichEntity: 'Company',
            entityId: companyId,
            timeToCompleteInMinutes: 0,
            price: 0,
            currency: 'PLN',
            unitOfMeasure: 'sztuka',
            isActive: false
          }]
        };
        
        console.log('Dodawanie nowej kategorii do ofert firmy:', entityOfferData);
        
        // Wywołujemy API do dodania oferty do firmy
        const addEntityOfferResponse = await addEntityOffer(entityOfferData);
        
        if (addEntityOfferResponse && addEntityOfferResponse.isSuccess) {
          notifications.show({
            title: 'Sukces',
            message: `Dodano nową kategorię: ${categoryData.name}. Poczekaj na zatwierdzenie jej przez administratora.`,
            color: 'green'
          });
          
          // Odświeżamy dane
          loadData();
          
          return { isSuccess: true, id: createOfferResponse.id };
        } else {
          notifications.show({
            title: 'Błąd',
            message: 'Nie udało się dodać kategorii do ofert firmy',
            color: 'red'
          });
          return { isSuccess: false };
        }
      } else {
        notifications.show({
          title: 'Błąd',
          message: 'Nie udało się utworzyć nowej kategorii',
          color: 'red'
        });
        return { isSuccess: false };
      }
    } catch (error) {
      console.error('Błąd podczas dodawania nowej kategorii:', error);
      notifications.show({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas dodawania nowej kategorii',
        color: 'red'
      });
      return { isSuccess: false };
    } finally {
      setIsAddingCustomCategory(false);
    }
  };

  return (
    <Card withBorder radius="md" p="md">
      <Stack spacing="xl">
        
        {/* Sekcja wyboru oferty z drzewka */}
        {userData?.role === 'CompanyAdmin' && (
        <div>
          <Title order={3} mb="md">Wybierz ofertę</Title>
          <Text size="sm" color="dimmed" mb="xs">
            Oferty główne (pierwsze w drzewku) są tylko do rozwinięcia. Wybierz ofertę z niższego poziomu.
          </Text>
          <OfferTree 
            offers={offerTree} 
            onSelectOffer={handleSelectOffer} 
            selectedOfferId={selectedOffer?.id} 
            companyOffers={companyOffers} 
            onAddCustomCategory={handleAddCustomCategory}
          />
          {selectedOffer && (
            <Paper withBorder p="md" mt="md" className={classes.selectedOfferCard}>
              <Group position="apart">
                <Stack spacing="xs">
                  <Text weight={500}>Wybrana oferta: {selectedOffer.name}</Text>
                  <Text size="sm" color="dimmed">
                    {selectedOffer.description}
                  </Text>
                </Stack>
                <Badge color={selectedOffer.isActive ? 'green' : 'red'} variant="light">
                  {selectedOffer.isActive ? 'Aktywna' : 'Nieaktywna'}
                </Badge>
              </Group>
            </Paper>
            )}
          </div>
        )}
        <Divider />

        {/* Sekcja ofert firmy */}
        {userData?.role === 'CompanyAdmin' && (
        <div>
          <Group position="apart" mb="md">
            <Group>
              <IconBuilding size={24} />
              <Title order={3}>Oferty firmy</Title>
            </Group>
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => {
                setEditingOffer(null);
                setIsModalOpen(true);
              }}
              disabled={!selectedOffer}
            >
              Dodaj ofertę firmy
            </Button>
          </Group>

          {companyOffers.length === 0 ? (
            <Paper withBorder p="md" className={classes.emptyStateCard}>
              <Text align="center" color="dimmed">
                Brak ofert firmy. Wybierz ofertę z drzewka i dodaj ją.
              </Text>
            </Paper>
          ) : (
            <Stack spacing="md">
              {companyOffers.map((offer) => {
                const fullOfferData = offersMap[offer.offerId] || {};

                //console.log('fullOfferData:', fullOfferData);
                const categoryName = availableOffers.find(o => o.id === offer.parentOfferId)?.name || 'Brak oferty nadrzędnej';
                
                return (
                  <Paper key={offer.id} withBorder p="md" className={classes.offerCard}>
                    <Group position="apart">
                      <Stack spacing="xs">
                        <Group spacing="xs">
                          <Text weight={700} size="lg">{fullOfferData.name || 'Oferta niezatwierdzona przez administratora'}</Text>
                          <Badge color="blue" variant="light">{categoryName}</Badge>
                        </Group>
                        <Text size="sm" color="dimmed">
                          Czas realizacji: {offer.timeToCompleteInMinutes} min
                        </Text>
                        <Text weight={500} color="blue" size="md">
                          {offer.price} {offer.currency} / {offer.unitOfMeasure}
                        </Text>
                        {fullOfferData.description && (
                          <Text size="sm" color="dimmed" mt="xs">
                            {fullOfferData.description}
                          </Text>
                        )}
                      </Stack>
                      <Group spacing="xs">
                        <Badge color={offer.isActive ? 'green' : 'red'}>
                          {offer.isActive ? 'Aktywna' : 'Nieaktywna'}
                        </Badge>
                        <Tooltip label="Edytuj">
                          <ActionIcon
                            variant="light"
                            color="yellow"
                            onClick={() => {
                              setEditingOffer(offer);
                              setIsModalOpen(true);
                            }}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Usuń">
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => {
                              setOfferToDelete(offer);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </div>
        )}
        {/* Sekcja ofert pracowników */}
        <div>
          <Title order={3} mb="md">{userData?.role === 'CompanyAdmin' ? 'Oferty pracowników' : 'Twoja oferta'}</Title>
          
          {companyUsers.length === 0 ? (
            <Paper withBorder p="md" className={classes.emptyStateCard}>
              <Text align="center" color="dimmed">
                Brak pracowników w firmie.
              </Text>
            </Paper>
          ) : (
            <Stack spacing="md">
              {companyUsers.map((worker) => {
                // Pobieramy oferty dla tego pracownika z mapy
                const workerOffers = workers[worker.id] || [];
                
                // Grupujemy oferty pracownika według kategorii
                const groupedWorkerOffers = groupOffersByCategory(workerOffers);
                
                return (
                  <Paper key={worker.id} withBorder p="md" className={classes.offerCard}>
                    <Group position="apart">
                      <Stack spacing="xs">
                        <Group spacing="xs">
                          <IconUser size={20} />
                          <Text weight={700} size="lg">{worker.firstName} {worker.lastName}</Text>
                        </Group>
                        <Text size="sm" color="dimmed">
                          {worker.email}
                        </Text>
                        
                        {workerOffers.length > 0 ? (
                          <Stack spacing="xs" mt="md">
                          {userData?.role === 'CompanyAdmin' && (
                            
                            <Group position="apart">
                              <Text weight={600}>Oferty pracownika:</Text>
                              <Group spacing="xs">
                                <Button 
                                  variant="light" 
                                  size="xs"
                                  leftIcon={<IconPlus size={14} />}
                                  onClick={() => {
                                    setSelectedWorker(worker);
                                    setIsWorkerOfferModalOpen(true);
                                  }}
                                >
                                  Dodaj ofertę
                                </Button>
                                <Button 
                                  variant="light" 
                                  size="xs"
                                  color="blue"
                                  leftIcon={<IconList size={14} />}
                                  loading={isAligningOffers}
                                  onClick={() => handleAlignWorkerOffers(worker)}
                                >
                                  Wyrównaj oferty
                                </Button>
                              </Group>
                            </Group>
                          )}
                            {Object.entries(groupedWorkerOffers).map(([categoryPath, categoryOffers]) => (
                              <div key={categoryPath}>
                                <Text weight={500} color="blue" size="sm" mt="xs">{categoryPath}</Text>
                                {categoryOffers.map(offer => {
                                  const fullOfferData = offersMap[offer.offerId] || {};
                                  
                                  return (
                                    <Paper key={offer.id} withBorder p="xs" className={classes.nestedOfferCard}>
                                      <Group position="apart">
                                        <Stack spacing="xs">
                                          <Group spacing="xs">
                                            <Text weight={600}>{fullOfferData.name || 'Nieznana oferta'}</Text>
                                          </Group>
                                          <Text size="sm" color="dimmed">
                                            Czas realizacji: {offer.timeToCompleteInMinutes} min
                                          </Text>
                                          <Text weight={500} color="blue" size="sm">
                                            {offer.price} {offer.currency} / {offer.unitOfMeasure}
                                          </Text>
                                        </Stack>
                                        <Group spacing="xs">
                                          <Badge color={offer.isActive ? 'green' : 'red'} size="sm">
                                            {offer.isActive ? 'Aktywna' : 'Nieaktywna'}
                                          </Badge>
                                          <Tooltip label="Edytuj">
                                            <ActionIcon
                                              variant="light"
                                              color="yellow"
                                              size="sm"
                                              onClick={() => {
                                                setEditingOffer(offer);
                                                setIsModalOpen(true);
                                              }}
                                            >
                                              <IconEdit size={14} />
                                            </ActionIcon>
                                          </Tooltip>
                                          <Tooltip label="Usuń">
                                            <ActionIcon
                                              variant="light"
                                              color="red"
                                              size="sm"
                                              onClick={() => {
                                                setOfferToDelete(offer);
                                                setIsDeleteModalOpen(true);
                                              }}
                                            >
                                              <IconTrash size={14} />
                                            </ActionIcon>
                                          </Tooltip>
                                        </Group>
                                      </Group>
                                    </Paper>
                                  );
                                })}
                              </div>
                            ))}
                          </Stack>
                        ) : (
                          <Paper withBorder p="xs" mt="md" className={classes.emptyStateCard}>
                            <Text align="center" color="dimmed">
                              Brak ofert dla tego pracownika.
                            </Text>
                           <Group position="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                             <Button 
                              variant="light" 
                              size="xs" 
                              mt="sm"
                              leftIcon={<IconPlus size={14} />}
                              onClick={() => {
                                setSelectedWorker(worker);
                                setIsWorkerOfferModalOpen(true);
                              }}
                            >
                              Dodaj ofertę
                            </Button>
                              <Button 
                                  variant="light" 
                                  size="xs"
                                  color="blue"
                                  mt="sm"
                                  leftIcon={<IconList size={14} />}
                                  loading={isAligningOffers}
                                  onClick={() => handleAlignWorkerOffers(worker)}
                                >
                                  Wyrównaj oferty
                                </Button>
                          </Group>
                          </Paper>
                        )}
                      </Stack>
                    
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </div>
      </Stack>

      {/* Modal do dodawania/edycji oferty firmy */}
      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOffer(null);
          setSelectedOffer(null); // Resetuj wybraną ofertę przy zamykaniu modalu
        }}
        title={editingOffer ? 'Edytuj ofertę firmy' : 'Nowa oferta firmy'}
        size="md"
      >
        <OfferForm
          offer={editingOffer}
          availableOffers={availableOffers}
          entityType="Company"
          entityId={companyId}
          selectedOffer={selectedOffer}
          onSubmit={async (data) => {
            if (editingOffer) {
              await handleEditCompanyOffer(data);
            } else {
              await handleAddCompanyOffer(data);
            }
           // setIsModalOpen(false);
             // Resetuj wybraną ofertę po dodaniu
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingOffer(null);
            setSelectedOffer(null); // Resetuj wybraną ofertę przy anulowaniu
          }}
        />
      </Modal>

      {/* Modal do dodawania oferty pracownika */}
      <Modal
        opened={isWorkerOfferModalOpen}
        onClose={() => {
          setIsWorkerOfferModalOpen(false);
          setSelectedWorker(null);
        }}
        title="Nowa oferta pracownika"
        size="md"
      >
        <OfferForm
          availableOffers={availableOffers}
          entityType="Worker"
          entityId={selectedWorker?.id}
          onSubmit={async (data) => {
            await handleAddWorkerOffer(data);
          }}
          onCancel={() => {
            setIsWorkerOfferModalOpen(false);
            setSelectedWorker(null);
          }}
        />
      </Modal>

      {/* Modal potwierdzenia usunięcia oferty */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setOfferToDelete(null);
        }}
        title="Potwierdzenie usunięcia"
        size="sm"
      >
        <Stack spacing="md">
          <Text>
            Czy na pewno chcesz usunąć ofertę <strong>{offersMap[offerToDelete?.offerId]?.name || 'Nieznana oferta'}</strong>?
            Ta operacja jest nieodwracalna.
          </Text>
          <Group position="right">
            <Button variant="subtle" onClick={() => {
              setIsDeleteModalOpen(false);
              setOfferToDelete(null);
            }}>
              Anuluj
            </Button>
            <Button 
              color="red" 
              onClick={async () => {
                if (offerToDelete) {
                  try {
                    const response = await deleteEntityOffer(offerToDelete.id);
                    if (response && response.isSuccess) {
                      notifications.show({
                        title: 'Sukces',
                        message: 'Oferta została usunięta',
                        color: 'green'
                      });
                      loadData(); // Odświeżamy dane po usunięciu
                    } else {
                      notifications.show({
                        title: 'Błąd',
                        message: 'Nie udało się usunąć oferty',
                        color: 'red'
                      });
                    }
                  } catch (error) {
                    console.error('Błąd podczas usuwania oferty:', error);
                    notifications.show({
                      title: 'Błąd',
                      message: 'Wystąpił błąd podczas usuwania oferty',
                      color: 'red'
                    });
                  }
                  setIsDeleteModalOpen(false);
                  setOfferToDelete(null);
                }
              }}
            >
              Usuń
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
};
