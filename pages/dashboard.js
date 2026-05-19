import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';

function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [slotsByAppointment, setSlotsByAppointment] = useState({});
  const [selectedSlotByAppointment, setSelectedSlotByAppointment] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.appointments || response.data);
      } catch (error) {
        setStatus({ type: 'error', message: 'Unable to load your appointments.' });
      }
    }
    loadAppointments();
  }, []);

  useEffect(() => {
    const dentistIds = Array.from(new Set(appointments.map((appointment) => appointment.dentist?._id || appointment.dentist)));

    dentistIds.forEach(async (dentistId) => {
      if (!dentistId || slotsByAppointment[dentistId]) {
        return;
      }

      try {
        const response = await axios.get(`/api/dentists/${dentistId}/slots`);
        setSlotsByAppointment((prev) => ({ ...prev, [dentistId]: response.data.availableSlots || response.data }));
      } catch (error) {
        setSlotsByAppointment((prev) => ({ ...prev, [dentistId]: [] }));
      }
    });
  }, [appointments, slotsByAppointment]);

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((first, second) => `${first.date} ${first.time}`.localeCompare(`${second.date} ${second.time}`));
  }, [appointments]);

  const uniqueDentistCount = useMemo(() => {
    return new Set(appointments.map((appointment) => appointment.dentist?._id || appointment.dentist).filter(Boolean)).size;
  }, [appointments]);

  const nextAppointment = sortedAppointments[0];

  const handleSlotChange = (appointmentId, value) => {
    setSelectedSlotByAppointment((prev) => ({ ...prev, [appointmentId]: value }));
  };

  const handleReschedule = async (appointment) => {
    const selectedValue = selectedSlotByAppointment[appointment._id];
    if (!selectedValue) {
      setStatus({ type: 'error', message: 'Please select a new slot before rescheduling.' });
      return;
    }

    try {
      const slot = JSON.parse(selectedValue);
      await axios.put(`/api/appointments/${appointment._id}`, {
        date: slot.date,
        time: slot.time,
      });
      setStatus({ type: 'success', message: 'Your appointment has been rescheduled.' });
      const response = await axios.get('/api/appointments');
      setAppointments(response.data.appointments || response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error?.response?.data?.message || 'Unable to reschedule appointment.' });
    }
  };

  const handleCancel = async (appointmentId) => {
    if (typeof window !== 'undefined' && !window.confirm('Cancel this appointment?')) {
      return;
    }

    try {
      await axios.delete(`/api/appointments/${appointmentId}`);
      setAppointments((prev) => prev.filter((appointment) => appointment._id !== appointmentId));
      setStatus({ type: 'success', message: 'Appointment canceled.' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.response?.data?.message || 'Unable to cancel appointment.' });
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 76px)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, md: 3 }} alignItems="end">
          <Grid item xs={12} md={8}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900 }}>
              Patient dashboard
            </Typography>
            <Typography variant="h3" component="h1" sx={{ mt: 1, fontSize: { xs: 34, md: 48 } }}>
              Your dental visits, ready to review.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, fontSize: 18 }}>
              Track upcoming appointments, select a new slot, or cancel a visit when plans change.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button component={Link} href="/booking" variant="contained" size="large">
              Book Another Visit
            </Button>
          </Grid>
        </Grid>

        {status.message && (
          <Alert severity={status.type === 'error' ? 'error' : 'success'} sx={{ mt: 3 }}>
            {status.message}
          </Alert>
        )}

        <Grid container rowSpacing={2.5} columnSpacing={{ xs: 0, md: 2.5 }} sx={{ mt: 4 }}>
          {[
            { label: 'Scheduled visits', value: appointments.length || 0 },
            { label: 'Dentists seen', value: uniqueDentistCount || 0 },
            { label: 'Next visit', value: nextAppointment ? `${nextAppointment.date}` : 'None' },
          ].map((metric) => (
            <Grid item xs={12} md={4} key={metric.label}>
              <Card elevation={0} sx={{ border: '1px solid rgba(15, 118, 110, 0.14)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800 }}>
                    {metric.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {metric.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            border: '1px solid rgba(15, 118, 110, 0.14)',
            boxShadow: '0 24px 70px rgba(16, 33, 31, 0.1)',
            overflow: 'hidden',
          }}
        >
          {appointments.length === 0 ? (
            <Box sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
              <Typography variant="h5">No appointments yet</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
                Book your first dental visit and it will appear here.
              </Typography>
              <Button component={Link} href="/booking" variant="contained">
                Book Appointment
              </Button>
            </Box>
          ) : (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 920 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Dentist</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell sx={{ minWidth: 260 }}>Reschedule</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAppointments.map((appointment) => {
                    const dentistId = appointment.dentist?._id || appointment.dentist;
                    const slots = slotsByAppointment[dentistId] || [];
                    return (
                      <TableRow key={appointment._id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            {appointment.dentist?.name || 'Unknown'}
                          </Typography>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Chip label="Scheduled" color="success" size="small" sx={{ fontWeight: 800 }} />
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <InputLabel id={`slot-select-${appointment._id}`}>New slot</InputLabel>
                            <Select
                              labelId={`slot-select-${appointment._id}`}
                              label="New slot"
                              value={selectedSlotByAppointment[appointment._id] || ''}
                              onChange={(event) => handleSlotChange(appointment._id, event.target.value)}
                            >
                              {slots.map((slot, index) => (
                                <MenuItem key={`${slot.date}-${slot.time}-${index}`} value={JSON.stringify(slot)}>
                                  {`${slot.date} - ${slot.time}`}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleReschedule(appointment)}
                              disabled={!slots.length}
                            >
                              Reschedule
                            </Button>
                            <Button variant="outlined" color="secondary" size="small" onClick={() => handleCancel(appointment._id)}>
                              Cancel
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default function DashboardPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
