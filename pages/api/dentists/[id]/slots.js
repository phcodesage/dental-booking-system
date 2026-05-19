const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const rateLimiter = require('middleware/rateLimiter');
const { getAvailableSlots } = require('controllers/dentistController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  req.params = req.query;
  await dbConnect();
  await runMiddleware(req, res, authMiddleware);
  await runMiddleware(req, res, rateLimiter);
  return getAvailableSlots(req, res);
}
