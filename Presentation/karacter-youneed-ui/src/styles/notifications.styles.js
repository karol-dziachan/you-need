import { createStyles, keyframes } from '@mantine/styles';

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(100%) translateY(-50%)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0) translateY(0)',
  },
});

export const useNotificationStyles = createStyles((theme) => ({
  notification: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(4px)',
    border: `1px solid ${theme.colors.gray[2]}`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    animation: `${slideIn} 0.3s ease-out`,
    
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
})); 