import { createStyles, rem } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  wrapper: {
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

  button: {
    transition: 'transform 200ms ease',
    
    '&:hover': {
      transform: 'scale(1.02)',
    },

    '&:active': {
      transform: 'scale(0.98)',
    },
  }
}));
