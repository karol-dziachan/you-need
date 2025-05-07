import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  menuItem: {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.blue[1], 0.5),
    },
  },

  menuLabel: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.colors.gray[6],
  },

  menuDivider: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
    margin: `${theme.spacing.xs}px 0`,
  },

  menuIcon: {
    color: theme.colors.blue[6],
  },

  userInfo: {
    padding: theme.spacing.xs,
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    marginBottom: theme.spacing.xs,
  },

  userEmail: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    fontWeight: 500,
  },

  userRole: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray[6],
  },
}));
