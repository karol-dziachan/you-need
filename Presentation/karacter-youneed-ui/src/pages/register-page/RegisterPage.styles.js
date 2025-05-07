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

  stepper: {
    '.mantine-Stepper-separator': {
      backgroundColor: theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],
    },

    '.mantine-Stepper-separatorActive': {
      backgroundImage: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
    },

    '.mantine-Stepper-stepIcon': {
      borderColor: theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],
      backgroundColor: theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.white,
    },

    '.mantine-Stepper-stepIcon[data-completed]': {
      backgroundImage: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
      borderColor: 'transparent',
    },

    '.mantine-Stepper-stepIcon[data-progress]': {
      borderColor: theme.colors.blue[5],
    },
  },

  input: {
    '.mantine-TextInput-input, .mantine-PasswordInput-input': {
      transition: 'border-color 200ms ease, box-shadow 200ms ease',
      
      '&:focus': {
        borderColor: theme.colors.blue[5],
        boxShadow: `0 0 0 ${rem(2)} ${
          theme.fn.rgba(theme.colors.blue[5], 0.2)
        }`,
      },
    },

    '.mantine-PasswordInput-innerInput': {
      '&:focus': {
        borderColor: 'transparent',
        boxShadow: 'none',
      },
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
  },

  socialButton: {
    transition: 'transform 200ms ease, border-color 200ms ease',
    
    '&:hover': {
      transform: 'scale(1.02)',
      borderColor: theme.colors.blue[5],
    },

    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  summary: {
    backgroundColor: theme.colorScheme === 'dark'
      ? theme.colors.dark[6]
      : theme.colors.gray[0],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    width: '100%',

    '& > *:not(:last-child)': {
      marginBottom: theme.spacing.xs,
    },
  },
}));
