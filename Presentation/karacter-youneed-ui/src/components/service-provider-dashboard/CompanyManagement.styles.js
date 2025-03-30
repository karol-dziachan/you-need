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

  title: {
    background: theme.fn.linearGradient(45, theme.colors.blue[6], theme.colors.cyan[6]),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
  },

  infoCard: {
    background: theme.fn.linearGradient(45, theme.colors.blue[0], theme.colors.cyan[0]),
    border: 'none',
  },

  contactCard: {
    background: theme.fn.linearGradient(45, theme.colors.violet[0], theme.colors.pink[0]),
    border: 'none',
  },

  usersCard: {
    background: theme.fn.linearGradient(45, theme.colors.teal[0], theme.colors.green[0]),
    border: 'none',
  },

  schedulesCard: {
    background: theme.fn.linearGradient(45, theme.colors.yellow[0], theme.colors.orange[0]),
    border: 'none',
  },

  areasCard: {
    background: theme.fn.linearGradient(45, theme.colors.red[0], theme.colors.pink[0]),
    border: 'none',
  },

  breaksCard: {
    background: theme.fn.linearGradient(45, theme.colors.indigo[0], theme.colors.blue[0]),
    border: 'none',
  },

  iconWrapper: {
    background: theme.fn.linearGradient(45, theme.colors.blue[6], theme.colors.cyan[6]),
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },

  label: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
    fontWeight: 500,
  },

  value: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    fontWeight: 600,
  },
}));
