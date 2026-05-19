const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const rateLimiter = require('middleware/rateLimiter');
const { getDentists } = require('controllers/dentistController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();
  await runMiddleware(req, res, authMiddleware);
  await runMiddleware(req, res, rateLimiter);
  return getDentists(req, res);
}
