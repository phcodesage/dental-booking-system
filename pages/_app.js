import { useEffect } from 'react';
import Head from 'next/head';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { setupAxiosInterceptor } from '../services/axiosConfig';

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: '#0f766e',
      dark: '#0b4f49',
      light: '#6bbeb6',
    },
    secondary: {
      main: '#e8754e',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3577b8',
    },
    success: {
      main: '#2f8f66',
    },
    warning: {
      main: '#d68a22',
    },
    background: {
      default: '#f6faf8',
      paper: '#ffffff',
    },
    text: {
      primary: '#10211f',
      secondary: '#5b6f6a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h4: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f6faf8',
        },
        a: {
          color: '#0f766e',
          textDecorationColor: 'rgba(15, 118, 110, 0.35)',
          textUnderlineOffset: '3px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 18px 45px rgba(16, 33, 31, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#344b47',
          fontWeight: 800,
          backgroundColor: '#eef7f4',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

  return (
    <>
      <Head>
        <title>Dental Booking System</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box component="main">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
