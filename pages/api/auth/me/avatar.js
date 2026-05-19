export const config = {
  api: {
    bodyParser: false,
  },
};

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const dbConnect = require('lib/dbConnect');
const allowCors = require('lib/allowCors');
const runMiddleware = require('lib/runMiddleware');
const authMiddleware = require('middleware/authMiddleware');
const User = require('models/User');

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();
  await runMiddleware(req, res, authMiddleware);

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let files;
  try {
    ({ files } = await parseForm(req));
  } catch (error) {
    console.error('File parsing failed:', error);
    return res.status(500).json({ message: 'File upload failed' });
  }

  const file = files.avatar;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!file.mimetype?.startsWith('image') && !file.type?.startsWith('image')) {
    return res.status(400).json({ message: 'Please upload an image file' });
  }

  const maxUpload = Number(process.env.MAX_FILE_UPLOAD || 5000000);
  const size = file.size || file.size || 0;
  if (size > maxUpload) {
    return res.status(400).json({ message: `Please upload an image less than ${maxUpload / 1024 / 1024}MB` });
  }

  const originalName = file.originalFilename || file.newFilename || path.basename(file.filepath || '');
  const extension = path.extname(originalName) || '.png';
  const fileName = `avatar_${user._id}${extension}`;
  const uploadPath = path.join(process.cwd(), 'public/uploads');

  await fs.promises.mkdir(uploadPath, { recursive: true });
  const destination = path.join(uploadPath, fileName);
  const tempPath = file.filepath || file.path || null;

  if (!tempPath) {
    return res.status(500).json({ message: 'Uploaded file path is unavailable' });
  }

  try {
    await fs.promises.rename(tempPath, destination);
  } catch (renameErr) {
    await fs.promises.copyFile(tempPath, destination);
  }

  user.avatarUrl = `/uploads/${fileName}`;
  await user.save();

  return res.status(200).json({ avatarUrl: user.avatarUrl });
}
