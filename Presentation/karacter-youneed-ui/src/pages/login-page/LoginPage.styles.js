import { createStyles, rem } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: rem(120),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  socialButton: {
    transition: 'background-color 150ms ease',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' 
        ? theme.colors.dark[8] 
        : theme.colors.gray[1],
    },
  },

  input: {
    backgroundColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[8] 
      : theme.white,
    borderColor: theme.colorScheme === 'dark' 
      ? theme.colors.dark[5] 
      : theme.colors.gray[3],
    '&:focus': {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  inputLabel: {
    color: theme.colorScheme === 'dark' 
      ? theme.colors.dark[0] 
      : theme.colors.gray[7],
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));
