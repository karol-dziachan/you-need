import { createStyles } from '@mantine/styles';

const useClasses = createStyles((theme) => ({
  notification: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(4px)',
    border: `1px solid ${theme.colors.gray[2]}`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    
    '&[data-type="success"]': {
      backgroundColor: theme.fn.rgba(theme.colors.green[1], 0.95),
      borderColor: theme.colors.green[3],
    },
    
    '&[data-type="error"]': {
      backgroundColor: theme.fn.rgba(theme.colors.red[1], 0.95),
      borderColor: theme.colors.red[3],
    },
  },

  notificationTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '0.25rem',
    color: theme.black,
  },

  notificationDescription: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: theme.colors.gray[7],
  },

  // Dodatkowe style dla komponentów
  button: {
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  paper: {
    backgroundColor: theme.white,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    background: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  wrapper: {
    minHeight: '100vh',
    backgroundColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[8] 
      : theme.colors.gray[0],
  },
}));

export { useClasses }; 