const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const formatImage = (req, res, next) => {
    upload.single('file')(req,res, (err) => {
      if(err) {
        if(req.path !== "/add"){
          res.status(400).json({ok: false, error: `File not found`})
        }else{
          next()
        }
      }else{
        if (req.file && req.file.mimetype.startsWith('image/')) {
          req.image = true;
          next();
        } else {
          if(req.path !== "/add") return res.status(400).json({ ok: false, error: 'File must be valid image format' });
          req.image = false;
          next();
        }
      }
    })
  };


module.exports = {formatImage}