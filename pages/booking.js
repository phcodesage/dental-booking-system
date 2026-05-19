import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';

const supportNotes = [
  {
    title: 'Current openings',
    description: 'Slots update when a dentist is selected, so you can choose from available chair time.',
  },
  {
    title: 'Secure booking',
    description: 'Appointments are attached to your patient account and visible from the dashboard.',
  },
  {
    title: 'Easy follow-up',
    description: 'Need a different time later? Reschedule from your appointment list.',
  },
];

function BookingPage() {
  const [dentists, setDentists] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    async function loadDentists() {
      try {
        const response = await axios.get('/api/dentists');
        setDentists(response.data.dentists || response.data);
      } catch (error) {
        setStatus({ type: 'error', message: 'Failed to load dentists.' });
      }
    }
    loadDentists();
  }, []);

  useEffect(() => {
    if (!selectedDentist) {
      setAvailableSlots([]);
      setSelectedSlot('');
      return;
    }

    async function loadSlots() {
      try {
        const response = await axios.get(`/api/dentists/${selectedDentist}/slots`);
        setAvailableSlots(response.data.availableSlots || response.data);
      } catch (error) {
        setAvailableSlots([]);
        setStatus({ type: 'error', message: 'Unable to load available slots.' });
      }
    }
    loadSlots();
    setSelectedSlot('');
  }, [selectedDentist]);

  const selectedDentistName = useMemo(() => {
    return dentists.find((dentist) => dentist._id === selectedDentist)?.name || 'Choose a dentist';
  }, [dentists, selectedDentist]);

  const selectedSlotLabel = useMemo(() => {
    if (!selectedSlot) {
      return 'Choose an available time';
    }

    try {
      const slot = JSON.parse(selectedSlot);
      return `${slot.date} at ${slot.time}`;
    } catch (error) {
      return 'Choose an available time';
    }
  }, [selectedSlot]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!selectedDentist || !selectedSlot) {
      setStatus({ type: 'error', message: 'Please choose a dentist and a slot.' });
      return;
    }

    try {
      const slot = JSON.parse(selectedSlot);
      await axios.post('/api/appointments', {
        dentistId: selectedDentist,
        date: slot.date,
        time: slot.time,
      });
      setStatus({ type: 'success', message: 'Appointment booked successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.response?.data?.message || 'Failed to book appointment.' });
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 76px)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 0, md: 4 }} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Box>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900 }}>
                  Appointment booking
                </Typography>
                <Typography variant="h3" component="h1" sx={{ mt: 1, fontSize: { xs: 34, md: 48 } }}>
                  Reserve the dental visit that fits your day.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontSize: 18, lineHeight: 1.7 }}>
                  Select a provider, pick an open slot, and keep the visit ready inside your patient dashboard.
                </Typography>
              </Box>

              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2 }}>
                {supportNotes.map((note) => (
                  <Grid item xs={12} key={note.title}>
                    <Card
                      elevation={0}
                      sx={{
                        border: '1px solid rgba(15, 118, 110, 0.14)',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {note.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                          {note.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                border: '1px solid rgba(15, 118, 110, 0.14)',
                boxShadow: '0 24px 70px rgba(16, 33, 31, 0.1)',
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h4" component="h2">
                  Appointment details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your selected visit will appear on the dashboard after confirmation.
                </Typography>
              </Stack>

              {status.message && (
                <Alert severity={status.type === 'error' ? 'error' : 'success'} sx={{ mt: 3 }}>
                  {status.message}
                </Alert>
              )}

              <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 3, mt: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="dentist-label">Select Dentist</InputLabel>
                  <Select
                    labelId="dentist-label"
                    label="Select Dentist"
                    value={selectedDentist}
                    onChange={(event) => setSelectedDentist(event.target.value)}
                  >
                    <MenuItem value="">Select a dentist</MenuItem>
                    {dentists.map((dentist) => (
                      <MenuItem key={dentist._id} value={dentist._id}>
                        {dentist.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={!availableSlots.length}>
                  <InputLabel id="slot-label">Select Slot</InputLabel>
                  <Select
                    labelId="slot-label"
                    label="Select Slot"
                    value={selectedSlot}
                    onChange={(event) => setSelectedSlot(event.target.value)}
                  >
                    <MenuItem value="">Select a time</MenuItem>
                    {availableSlots.map((slot, index) => (
                      <MenuItem key={`${slot.date}-${slot.time}-${index}`} value={JSON.stringify(slot)}>
                        {`${slot.date} - ${slot.time}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: '#eef7f4',
                    border: '1px solid rgba(15, 118, 110, 0.12)',
                  }}
                >
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                        Dentist
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 800 }}>
                        {selectedDentistName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                        Time
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 800 }}>
                        {selectedSlotLabel}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Button type="submit" variant="contained" size="large" disabled={!availableSlots.length || !selectedSlot}>
                  Confirm Appointment
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function BookingPageWrapper() {
  return (
    <ProtectedRoute>
      <BookingPage />
    </ProtectedRoute>
  );
}
