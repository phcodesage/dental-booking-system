const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const { getOfficeInfo, updateOfficeInfo } = require('controllers/officeInfoController');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  await dbConnect();

  if (req.method === 'GET') {
    return getOfficeInfo(req, res);
  }

  if (req.method === 'PUT') {
    await runMiddleware(req, res, authMiddleware);
    return updateOfficeInfo(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
