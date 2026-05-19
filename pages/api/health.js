const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');

export default async function handler(req, res) {
  if (allowCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
}
