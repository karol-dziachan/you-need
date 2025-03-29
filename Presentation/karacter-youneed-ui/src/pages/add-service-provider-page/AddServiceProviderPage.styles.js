import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  container: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  paper: {
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
  },
}));
