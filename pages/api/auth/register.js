const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const rateLimiter = require('middleware/rateLimiter');
const { register } = require('controllers/authController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();
  await runMiddleware(req, res, rateLimiter);
  return register(req, res);
}
