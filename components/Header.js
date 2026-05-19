'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Book' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const syncToken = () => {
      const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      setToken(savedToken);
    };

    syncToken();
    router.events.on('routeChangeComplete', syncToken);

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', syncToken);
    }

    return () => {
      router.events.off('routeChangeComplete', syncToken);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', syncToken);
      }
    };
  }, [router.events]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setToken(null);
      router.push('/login');
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        color: 'text.primary',
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        borderBottom: '1px solid rgba(15, 118, 110, 0.12)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 }, justifyContent: 'space-between', gap: 2 }}>
          <Stack direction="row" spacing={{ xs: 1.25, md: 2.5 }} alignItems="center" sx={{ minWidth: 0 }}>
            <Stack component={Link} href="/" direction="row" spacing={1.25} alignItems="center" sx={{ color: 'inherit', textDecoration: 'none' }}>
              <Box
                aria-hidden="true"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'white',
                  fontWeight: 900,
                  backgroundColor: 'primary.main',
                  boxShadow: '0 10px 24px rgba(15, 118, 110, 0.24)',
                  flex: '0 0 auto',
                }}
              >
                C
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, lineHeight: 1.05 }}>
                  Cyvera Dental
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Booking studio
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    color="inherit"
                    sx={{
                      color: isActive ? 'primary.dark' : 'text.secondary',
                      backgroundColor: isActive ? 'rgba(15, 118, 110, 0.1)' : 'transparent',
                      px: 1.5,
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: '0 0 auto' }}>
            {token ? (
              <>
                <Button
                  component={Link}
                  href="/booking"
                  variant="contained"
                  color="primary"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  Book Appointment
                </Button>
                <Button onClick={handleLogout} color="inherit" sx={{ color: 'text.secondary' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} href="/login" color="inherit" sx={{ color: 'text.secondary' }}>
                  Login
                </Button>
                <Button component={Link} href="/signup" variant="contained" color="primary" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: { xs: 'flex', md: 'none' },
            pb: 1,
            overflowX: 'auto',
          }}
        >
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                size="small"
                color="inherit"
                sx={{
                  color: isActive ? 'primary.dark' : 'text.secondary',
                  backgroundColor: isActive ? 'rgba(15, 118, 110, 0.1)' : 'transparent',
                  flex: '0 0 auto',
                }}
              >
                {link.label}
              </Button>
            );
          })}
          {!token && (
            <Button
              component={Link}
              href="/signup"
              size="small"
              color="inherit"
              sx={{
                color: router.pathname === '/signup' ? 'primary.dark' : 'text.secondary',
                backgroundColor: router.pathname === '/signup' ? 'rgba(15, 118, 110, 0.1)' : 'transparent',
                flex: '0 0 auto',
              }}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
}
