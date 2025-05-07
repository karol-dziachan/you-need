import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'translateY(-2px)',
    },
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.sm,
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.gray[7],
  },
  icon: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1) rotate(5deg)',
    }
  },
  button: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.sm,
    }
  }
})); 