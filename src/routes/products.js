const express = require('express');
const router = express.Router();
const {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
  getProducts,
} = require('../handlers/productsHandlers');
const {formatImage} = require('../middlewares/imageFormat');

router.post('/add', formatImage, addProductHandler);
router.put('/desactivate/:id', desactivateProductHandler);
router.put('/activate/:id', activateProductHandler);
router.get('/', getProducts)


module.exports = router;
