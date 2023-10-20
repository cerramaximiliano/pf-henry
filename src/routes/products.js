const express = require('express');
const router = express.Router();

const { nameHandler } = require('../handlers/productNameHandler');
const {idHandler} = require('../handlers/productIdHandler')
const {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
  getProducts,
  getPropiertyValuesHandler,
  updateProducts
} = require('../handlers/productsHandlers');
const {formatImage} = require('../middlewares/imageFormat');

// Cambie esta ruta de '/' a '/name' => revisar la ruta
router.get('/name', nameHandler);
router.get('/:id', idHandler);
router.post('/add', formatImage, addProductHandler);
router.put('/desactivate/:id', desactivateProductHandler);
router.put('/activate/:id', activateProductHandler);
router.get('/props/:value', getPropiertyValuesHandler);
router.post('/update/:id', updateProducts)
router.get('/', getProducts);


module.exports = router;

