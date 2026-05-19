import Link from 'next/link';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';

const careHighlights = [
  {
    title: 'Live availability',
    description: 'See open chair times before you commit, then reserve a visit without calling the front desk.',
  },
  {
    title: 'Prepared visits',
    description: 'Your dentist, date, and time stay organized in one patient dashboard from booking to follow-up.',
  },
  {
    title: 'Flexible changes',
    description: 'Reschedule or cancel when plans move, with the same secure account used to book.',
  },
];

const processSteps = [
  'Choose your dentist',
  'Pick an open slot',
  'Manage visits anytime',
];

export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 560, md: 'min(700px, calc(100vh - 96px))' },
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/images/dental-signup.jpeg"
          alt="Patient brushing teeth"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '68% center', md: 'center 45%' },
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(8, 31, 28, 0.68)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 7, md: 9 } }}>
          <Box sx={{ maxWidth: 690 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#bde7dd',
                fontWeight: 900,
                letterSpacing: 1,
              }}
            >
              Patient-first scheduling
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mt: 1.5,
                fontSize: { xs: 42, sm: 58, md: 72 },
                lineHeight: { xs: 1.05, md: 0.98 },
                maxWidth: 660,
              }}
            >
              Cyvera Dental Booking
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2.5,
                maxWidth: 590,
                color: 'rgba(255,255,255,0.86)',
                fontWeight: 500,
                lineHeight: 1.55,
              }}
            >
              A calmer way to find dental care, reserve appointments, and keep every visit organized from a secure dashboard.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                component={Link}
                href="/booking"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ minHeight: 48, px: 3 }}
              >
                Book Appointment
              </Button>
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                size="large"
                sx={{
                  minHeight: 48,
                  px: 3,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.72)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Patient Login
              </Button>
            </Stack>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 0, sm: 2 }}
              sx={{
                mt: { xs: 5, md: 6 },
                pt: 3,
                borderTop: '1px solid rgba(255,255,255,0.24)',
                maxWidth: 720,
              }}
            >
              {[
                ['3 steps', 'to a confirmed visit'],
                ['24/7', 'dashboard access'],
                ['Secure', 'account-based booking'],
              ].map(([value, label]) => (
                <Grid item xs={4} key={label}>
                  <Typography variant="h5" sx={{ fontWeight: 900, fontSize: { xs: 22, md: 28 } }}>
                    {value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.74)' }}>
                    {label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Grid container rowSpacing={4} columnSpacing={{ xs: 0, md: 4 }} alignItems="end">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900 }}>
                Less friction
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, fontSize: { xs: 32, md: 46 } }}>
                Dental booking that feels organized before you arrive.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ ml: { md: 'auto' } }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.7 }}>
                Patients can move from intent to confirmed care quickly, while the appointment history stays easy to scan later.
              </Typography>
            </Grid>
          </Grid>

          <Grid container rowSpacing={2.5} columnSpacing={{ xs: 0, md: 2.5 }} sx={{ mt: 4 }}>
            {careHighlights.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(15, 118, 110, 0.14)',
                    backgroundColor: '#fbfefd',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, backgroundColor: '#eef7f4' }}>
        <Container maxWidth="lg">
          <Grid container rowSpacing={4} columnSpacing={{ xs: 0, md: 4 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 44 } }}>
                From search to scheduled in one clean flow.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontSize: 18, lineHeight: 1.7 }}>
                The booking path keeps the clinical details visible and the decisions simple, so patients can focus on care.
              </Typography>
              <Button component={Link} href="/signup" variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
                Create Account
              </Button>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                {processSteps.map((step, index) => (
                  <Box
                    key={step}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr',
                      gap: 2,
                      alignItems: 'center',
                      p: 2.5,
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(15, 118, 110, 0.14)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '8px',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.dark',
                        fontWeight: 900,
                        backgroundColor: '#dff3ee',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography variant="h6">{step}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {index === 0 && 'Review available providers and select the right care match.'}
                        {index === 1 && 'Reserve a date and time from the current appointment openings.'}
                        {index === 2 && 'Return to the dashboard for updates, changes, and appointment history.'}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
