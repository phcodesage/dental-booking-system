const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const { getProfile, updateProfile, deleteAccount } = require('controllers/authController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  await dbConnect();

  if (req.method === 'GET') {
    await runMiddleware(req, res, authMiddleware);
    return getProfile(req, res);
  }

  if (req.method === 'PUT') {
    await runMiddleware(req, res, authMiddleware);
    return updateProfile(req, res);
  }

  if (req.method === 'DELETE') {
    await runMiddleware(req, res, authMiddleware);
    return deleteAccount(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
