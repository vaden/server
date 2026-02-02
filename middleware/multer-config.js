const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(
      new Error('Format de fichier invalide. Seuls jpg, jpeg et png sont acceptés.'),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return next();
    }

    try {
      const name = req.file.originalname.split(' ').join('_').split('.')[0];
      const filename = `${name}_${Date.now()}.webp`;
      const outputPath = path.join('images', filename);

      if (!fs.existsSync('images')) {
        fs.mkdirSync('images', { recursive: true });
      }

      await sharp(req.file.buffer)
        .resize(800)
        .webp({ quality: 80 })
        .toFile(outputPath);

      req.file.filename = filename;
      req.file.path = outputPath;

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
