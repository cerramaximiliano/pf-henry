const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const imageFormat = require('../middlewares/imageFormat');
const imagesController = require('../controllers/uploadFirebaseController');

router.post('/image', upload.single('file'), imageFormat, imagesController.uploadImage);

module.exports = router;