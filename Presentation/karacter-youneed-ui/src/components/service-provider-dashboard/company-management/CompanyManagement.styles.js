import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: theme.shadows.md,
    },
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  tab: {
    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colors.blue[6],
      color: theme.colors.blue[6],
    },
  },

  listItem: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },
})); 