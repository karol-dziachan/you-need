import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    minHeight: '100vh',
    display: 'flex',
    marginTop: '100px',
    alignItems: 'top',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 420,
    width: '100%',
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  description: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  form: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
  },
}));
