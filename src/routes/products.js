const express = require('express');
const router = express.Router();
const {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
} = require('../handlers/productsHandlers');

router.post('/add', addProductHandler);
router.put('/desactivate/:id', desactivateProductHandler);
router.put('/activate/:id', activateProductHandler);

module.exports = router;
