const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const { createAppointment, getAppointments } = require('controllers/appointmentController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  await dbConnect();

  if (req.method === 'GET') {
    await runMiddleware(req, res, authMiddleware);
    return getAppointments(req, res);
  }

  if (req.method === 'POST') {
    await runMiddleware(req, res, authMiddleware);
    return createAppointment(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
