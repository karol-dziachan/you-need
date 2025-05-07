import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
  },

  form: {
    '& > *': {
      marginBottom: theme.spacing.md,
    },
  },

  offerCard: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
    borderLeft: `4px solid ${theme.colors.blue[5]}`,
    padding: theme.spacing.md,
  },

  nestedOfferCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderLeft: `3px solid ${theme.colors.blue[3]}`,
    marginLeft: theme.spacing.md,
  },

  offerTreeItem: {
    cursor: 'pointer',
    transition: 'background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      transform: 'translateX(5px)',
      boxShadow: theme.shadows.sm,
    },
  },

  selectedOfferTreeItem: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0],
    borderColor: theme.colors.blue[5],
    borderWidth: '2px',
    transform: 'translateX(5px)',
    boxShadow: theme.shadows.sm,
    fontWeight: 600,
  },

  disabledOfferTreeItem: {
    backgroundColor: 'red',
    opacity: 0.6,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      backgroundColor: 'inherit',
    },
  },

  accordionItem: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },

  accordionControl: {
    padding: theme.spacing.md,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },

  accordionPanel: {
    padding: theme.spacing.md,
  },

  badge: {
    textTransform: 'none',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
  },

  price: {
    color: theme.colors.blue[6],
    fontWeight: 500,
  },

  actionIcon: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },

  selectedOfferCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  rootOfferItem: {
    cursor: 'default',
    opacity: 0.8,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
    '&:hover': {
      transform: 'none',
      boxShadow: theme.shadows.sm,
    },
  },

  emptyStateCard: {
    backgroundColor: theme.colors.gray[0],
    borderColor: theme.colors.gray[3],
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: theme.spacing.xl,
    textAlign: 'center',
  },
}));
