import { createStyles } from '@mantine/styles';
import { keyframes } from '@emotion/react';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

const pulse = keyframes({
  '0%': { opacity: 0.6 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.6 }
});

const float = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-10px)' },
  '100%': { transform: 'translateY(0px)' }
});

const scale = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.1)' },
  '100%': { transform: 'scale(1)' }
});

export const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    gap: theme.spacing.md,
  },

  loaderContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    animation: `${float} 3s ease-in-out infinite`,
  },

  outerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: `4px solid ${theme.colors.blue[2]}`,
    borderTopColor: theme.colors.blue[6],
    borderRadius: '50%',
    animation: `${spin} 2s linear infinite`,
  },

  innerRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    border: `4px solid ${theme.colors.blue[4]}`,
    borderTopColor: theme.colors.blue[8],
    borderRadius: '50%',
    animation: `${spin} 1.5s linear infinite reverse`,
  },

  core: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '40%',
    background: theme.colors.blue[6],
    borderRadius: '50%',
    animation: `${scale} 1s ease-in-out infinite`,
  },

  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  particle: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: theme.colors.blue[4],
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: `${spin} 3s linear infinite`,
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'inherit',
      borderRadius: 'inherit',
      transform: `rotate(${({ '--i': i }) => i * 45}deg) translateY(-60px)`,
    },
  },

  text: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray[7],
    animation: `${pulse} 1.5s ease-in-out infinite`,
    textAlign: 'center',
  },
}));
