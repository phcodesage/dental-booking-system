import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/auth/register', data);
      setSuccess('Registration completed. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
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
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: { xs: 'calc(100vw - 32px)', md: 'none' },
                minWidth: 0,
                boxSizing: 'border-box',
                height: '100%',
                minHeight: { md: 660 },
                p: { xs: 3, sm: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '1px solid rgba(15, 118, 110, 0.14)',
                boxShadow: '0 24px 70px rgba(16, 33, 31, 0.1)',
              }}
            >
              <Box sx={{ maxWidth: 480, width: '100%' }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900 }}>
                  New patient account
                </Typography>
                <Typography variant="h3" component="h1" sx={{ mt: 1, fontSize: { xs: 34, md: 44 } }}>
                  Start with a secure profile
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
                  Create your patient account to book appointments and keep future visits in one place.
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2.25, mt: 3 }}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name ? 'Name is required' : ''}
                    {...register('name', { required: true })}
                  />
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
                    label="Phone"
                    type="tel"
                    fullWidth
                    required
                    error={!!errors.phone}
                    helperText={errors.phone ? 'Phone number is required' : ''}
                    {...register('phone', { required: true })}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    error={!!errors.password}
                    helperText={errors.password ? 'Password must be at least 6 characters' : ''}
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  <Button type="submit" variant="contained" size="large">
                    Sign Up
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                  Already have an account? <Link href="/login">Login</Link>
                </Typography>
              </Box>
            </Paper>
          </Box>

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
                src="/images/dental-signup.jpeg"
                alt="Patient smiling while brushing teeth"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: { xs: '62% center', md: 'center center' },
                }}
              />
              <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8, 31, 28, 0.36)' }} />
              <Stack
                spacing={1.5}
                sx={{
                  position: 'relative',
                  minHeight: { xs: 360, md: 660 },
                  justifyContent: 'flex-end',
                  p: { xs: 3, md: 4 },
                  color: 'white',
                }}
              >
                <Typography variant="overline" sx={{ color: '#bde7dd', fontWeight: 900 }}>
                  Organized care
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 44 } }}>
                  A better starting point for every appointment.
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 470, lineHeight: 1.7 }}>
                  Your account connects booking, visit management, and provider availability in a single patient flow.
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
