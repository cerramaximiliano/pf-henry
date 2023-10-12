const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {formatImage} = require('../middlewares/imageFormat');
const imagesController = require('../controllers/uploadFirebaseController');

router.post('/image', formatImage, imagesController.uploadImageById);

module.exports = router;