import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    minHeight: '100vh',
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  emptyCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]}`,
  },

  statCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderLeft: `4px solid ${theme.colors.blue[6]}`,
  },

  quickActionCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  disputeCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderLeft: `4px solid ${theme.colors.red[6]}`,
  },

  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`,
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.xl,
    fontWeight: 900,
    letterSpacing: -1,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    maxWidth: 600,
    margin: 'auto',
  },

  cardTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    lineHeight: 1,
  },

  cardDescription: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  badge: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  divider: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  scrollArea: {
    height: 300,
  },
}));
