import { createStyles, rem } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[8] 
      : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    fontSize: rem(32),
    marginBottom: theme.spacing.md,
    background: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  cardGrid: {
    marginTop: theme.spacing.xl,
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[7] 
      : theme.white,
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows.md,
    },
  },

  cardHeader: {
    padding: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  paper: {
    backgroundColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[7] 
      : theme.white,
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows.md,
    },
  },

  accordionControl: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' 
        ? theme.colors.dark[6] 
        : theme.colors.gray[0],
    },
  },

  accordionItem: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    
    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.white,
      boxShadow: theme.shadows.sm,
    },
  },

  accordionIcon: {
    color: theme.colors.blue[5],
  },

  listItem: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' 
        ? theme.colors.dark[6] 
        : theme.colors.gray[0],
      borderRadius: theme.radius.sm,
      transition: 'background-color 150ms ease',
    },
  },

  timeline: {
    '.mantine-Timeline-item::before': {
      backgroundColor: theme.colors.blue[5],
    },
  },

  badge: {
    background: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 150ms ease',
    
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  button: {
    transition: 'transform 200ms ease',
    
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  alert: {
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${theme.colors.blue[5]}`,
    background: theme.fn.linearGradient(
      45,
      theme.colors.blue[5],
      theme.colors.cyan[5]
    ),
    color: theme.white,
  },

  divider: {
    borderColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[4] 
      : theme.colors.gray[3],
    opacity: 0.5,
  },
})); 