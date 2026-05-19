import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Book' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(15, 118, 110, 0.12)',
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                aria-hidden="true"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'white',
                  fontWeight: 900,
                  backgroundColor: 'primary.main',
                }}
              >
                C
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Cyvera Dental
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Modern appointment booking for everyday dental care.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {footerLinks.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  color="inherit"
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              Care coordination, simplified.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
