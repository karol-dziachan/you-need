import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      transform: 'translateY(-3px)',
      boxShadow: theme.shadows.lg,
      '&::before': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: theme.shadows.sm,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(45deg, ${theme.colors.blue[6]}20, ${theme.colors.blue[6]}00)`,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: 0,
    },
  },
  icon: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.2) rotate(5deg)',
    }
  },
  text: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    '&:hover': {
      color: theme.colors.blue[6],
      transform: 'translateX(3px)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: 0,
      width: '0%',
      height: 2,
      backgroundColor: theme.colors.blue[6],
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    }
  }
})); 