import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.replace('/dashboard');
    }
  }, [router]);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      setSuccess('Logged in successfully. Redirecting...');
      router.push('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 76px)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 4,
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                position: 'relative',
                minHeight: { xs: 360, md: '100%' },
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'primary.dark',
              }}
            >
              <Box
                component="img"
                src="/images/dental-login.jpeg"
                alt="Patient preparing a toothbrush"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: { xs: 'center 62%', md: 'center center' },
                }}
              />
              <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8, 31, 28, 0.42)' }} />
              <Stack
                spacing={1.5}
                sx={{
                  position: 'relative',
                  minHeight: { xs: 360, md: 610 },
                  justifyContent: 'flex-end',
                  p: { xs: 3, md: 4 },
                  color: 'white',
                }}
              >
                <Typography variant="overline" sx={{ color: '#bde7dd', fontWeight: 900 }}>
                  Welcome back
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 44 } }}>
                  Keep your dental care moving.
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 470, lineHeight: 1.7 }}>
                  Sign in to see upcoming visits, reschedule appointments, and continue booking with less friction.
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: { xs: 'calc(100vw - 32px)', md: 'none' },
                minWidth: 0,
                boxSizing: 'border-box',
                height: '100%',
                minHeight: { md: 610 },
                p: { xs: 3, sm: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '1px solid rgba(15, 118, 110, 0.14)',
                boxShadow: '0 24px 70px rgba(16, 33, 31, 0.1)',
              }}
            >
              <Box sx={{ maxWidth: 460, width: '100%' }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900 }}>
                  Patient login
                </Typography>
                <Typography variant="h3" component="h1" sx={{ mt: 1, fontSize: { xs: 34, md: 44 } }}>
                  Access your dashboard
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
                  Use your registered email and password to continue.
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2.25, mt: 3 }}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email ? 'Email is required' : ''}
                    {...register('email', { required: true })}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    error={!!errors.password}
                    helperText={errors.password ? 'Password is required' : ''}
                    {...register('password', { required: true })}
                  />
                  <Button type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
