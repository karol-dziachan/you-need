import { Box, Text } from '@mantine/core';
import { keyframes } from '@emotion/react';
import { useStyles } from './Loader.styles';

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

export const Loader = ({ text = 'Ładowanie...' }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.loaderContainer}>
        <Box className={classes.outerRing}>
          <Box className={classes.innerRing}>
            <Box className={classes.core} />
          </Box>
        </Box>
        <Box className={classes.particles}>
          {[...Array(8)].map((_, i) => (
            <Box key={i} className={classes.particle} style={{ '--i': i }} />
          ))}
        </Box>
      </Box>
      <Text className={classes.text}>{text}</Text>
    </Box>
  );
};
