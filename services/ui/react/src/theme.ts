import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00acc1',
      light: '#5ddef4',
      dark: '#007c91',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    secondary: {
      main: '#fafafa',
      light: '#ffffff',
      dark: '#c7c7c7',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    warning: {
      main: '#f44336',
    },
  },
  typography: {},
});

export default theme;
