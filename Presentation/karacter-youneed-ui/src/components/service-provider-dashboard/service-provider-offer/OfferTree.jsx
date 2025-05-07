import React, { useState } from 'react';
import { Stack, Text, Group, Button, Modal, TextInput, Textarea, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export const OfferTree = ({ offers, onSelectOffer, selectedOfferId, companyOffers, onAddCustomCategory }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedParentOffer, setSelectedParentOffer] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNode = (offerId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(offerId)) {
        newSet.delete(offerId);
      } else {
        newSet.add(offerId);
      }
      return newSet;
    });
  };

  const handleAddCategoryClick = (parentOffer) => {
    setSelectedParentOffer(parentOffer);
    setNewCategoryName('');
    setNewCategoryDescription('');
    setIsAddCategoryModalOpen(true);
  };

  const handleAddCategorySubmit = async () => {
    if (!newCategoryName.trim()) {
      notifications.show({
        title: 'Błąd',
        message: 'Nazwa kategorii jest wymagana',
        color: 'red'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onAddCustomCategory({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
        parentOfferId: selectedParentOffer?.id
      });

      if (result.isSuccess) {
        setIsAddCategoryModalOpen(false);
        setNewCategoryName('');
        setNewCategoryDescription('');
        setSelectedParentOffer(null);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania kategorii:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderOfferNode = (offer, level = 0) => {
    const isExpanded = expandedNodes.has(offer.id);
    const isSelected = selectedOfferId === offer.id;
    const isCompanyOffer = companyOffers.some(co => co.offerId === offer.id);
    const hasChildren = offer.children && offer.children.length > 0;

    return (
      <Stack key={offer.id} spacing="xs" style={{ marginLeft: `${level * 20}px` }}>
        <Group position="apart" noWrap>
          <Group spacing="xs" noWrap>
            {hasChildren ? (
              <Button
                variant="subtle"
                size="xs"
                p={0}
                onClick={() => toggleNode(offer.id)}
                style={{ minWidth: 'auto' }}
              >
                {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
              </Button>
            ) : (
              <div style={{ width: 16 }} />
            )}
            <Text
              size="sm"
              style={{
                cursor: hasChildren ? 'pointer' : 'default',
                fontWeight: isSelected ? 600 : 400
              }}
              onClick={() => hasChildren ? toggleNode(offer.id) : onSelectOffer(offer)}
            >
              {offer.name}
            </Text>
          </Group>
          <Group spacing="xs" noWrap>
            {isCompanyOffer && (
              <Badge color="blue" variant="light" size="sm">
                Dodana
              </Badge>
            )}
            <Button
              variant="subtle"
              size="xs"
              leftIcon={<IconPlus size={14} />}
              onClick={() => handleAddCategoryClick(offer)}
            >
              Dodaj kategorię
            </Button>
          </Group>
        </Group>
        {isExpanded && hasChildren && (
          <Stack spacing="xs">
            {offer.children.map(child => renderOfferNode(child, level + 1))}
          </Stack>
        )}
      </Stack>
    );
  };

  return (
    <>
      <Stack spacing="md">
        {offers.map(offer => renderOfferNode(offer))}
      </Stack>

      <Modal
        opened={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        title="Dodaj nową kategorię"
        size="md"
      >
        <Stack spacing="md">
          <TextInput
            label="Nazwa kategorii"
            placeholder="Wprowadź nazwę kategorii"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
          <Textarea
            label="Opis kategorii"
            placeholder="Wprowadź opis kategorii (opcjonalnie)"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
          <Text size="sm" color="dimmed">
            Kategoria zostanie dodana jako podkategoria: {selectedParentOffer?.name || 'główna'}
          </Text>
          <Group position="right" spacing="sm">
            <Button variant="subtle" onClick={() => setIsAddCategoryModalOpen(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleAddCategorySubmit}
              loading={isSubmitting}
              disabled={!newCategoryName.trim()}
            >
              Dodaj kategorię
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}; 