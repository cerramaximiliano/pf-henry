module.exports = (req, res, next) => {
    if (req.file && req.file.mimetype.startsWith('image/')) {
      next();
    } else {
      res.status(400).json({ ok: false, error: 'File must be valid image format' });
    }
  };