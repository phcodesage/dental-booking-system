const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const { deleteAppointment, updateAppointment } = require('controllers/appointmentController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method === 'DELETE') {
    req.params = req.query;
    await dbConnect();
    await runMiddleware(req, res, authMiddleware);
    return deleteAppointment(req, res);
  }

  if (req.method === 'PUT') {
    req.params = req.query;
    await dbConnect();
    await runMiddleware(req, res, authMiddleware);
    return updateAppointment(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
