import { createStyles as mantineCreateStyles } from '@mantine/styles';

const PASTEL_COLORS = {
  primary: '#E3F2FD',    // Bardzo jasny niebieski
  secondary: '#BBDEFB',  // Jasny niebieski
  accent: '#90CAF9',     // Akcent niebieski
  highlight: '#E1F5FE',  // Podświetlenie
  background: '#F5FBFF', // Tło
};

export const useStyles = mantineCreateStyles((theme) => ({
  '@keyframes floatingElements': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-15px)' },
    '100%': { transform: 'translateY(0px)' },
  },

  '@keyframes ripple': {
    '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(187, 222, 251, 0.3)' },
    '70%': { transform: 'scale(1)', boxShadow: '0 0 0 15px rgba(187, 222, 251, 0)' },
    '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(187, 222, 251, 0)' },
  },

  heroSection: {
    position: 'relative',
    padding: '4rem 0',
    zIndex: 1,
  },

  title: {
    fontSize: 'calc(2.5rem + 1vw)',
    fontWeight: 800,
    background: `linear-gradient(135deg, 
      ${PASTEL_COLORS.accent}, 
      ${PASTEL_COLORS.secondary})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '3px',
      background: PASTEL_COLORS.accent,
      borderRadius: '2px',
    },
  },

  description: {
    fontSize: '1.2rem',
    color: theme.colors.gray[7],
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    lineHeight: 1.6,
  },

  actionButton: {
    background: `linear-gradient(135deg, ${PASTEL_COLORS.accent}, ${PASTEL_COLORS.secondary})`,
    border: 'none',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: theme.radius.md,
    color: 'white',
    transition: 'all 0.3s ease',
    animation: 'ripple 2s infinite',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 20px ${PASTEL_COLORS.secondary}50`,
    },
  },

  featureCard: {
    background: 'white',
    borderRadius: theme.radius.lg,
    padding: '2rem',
    transition: 'all 0.3s ease',
    border: `1px solid ${PASTEL_COLORS.primary}`,
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 15px 30px ${PASTEL_COLORS.secondary}30`,
      '&::after': {
        transform: 'rotate(30deg) translateX(0)',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '200%',
      height: '100%',
      background: `linear-gradient(60deg, transparent 0%, ${PASTEL_COLORS.highlight}50 100%)`,
      transform: 'rotate(30deg) translateX(-100%)',
      transition: 'transform 0.5s ease',
    },
  },

  featureIcon: {
    background: `linear-gradient(135deg, ${PASTEL_COLORS.accent}, ${PASTEL_COLORS.secondary})`,
    borderRadius: '50%',
    padding: '1rem',
    marginBottom: '1rem',
    color: 'white',
    animation: 'floatingElements 3s ease infinite',
  },

  featureTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: theme.colors.gray[8],
    marginBottom: '1rem',
  },

  featureDescription: {
    color: theme.colors.gray[6],
    lineHeight: 1.6,
  },
}));
