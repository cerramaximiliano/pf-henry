const express = require('express');
const router = express.Router();
const {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
  getProducts,
} = require('../handlers/productsHandlers');

router.post('/add', addProductHandler);
router.put('/desactivate/:id', desactivateProductHandler);
router.put('/activate/:id', activateProductHandler);
router.get('/', getProducts)


module.exports = router;
