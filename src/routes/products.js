const express = require('express');
const router = express.Router();
const { nameHandler } = require('../handlers/productNameHandler');
const {idHandler} = require('../handlers/productIdHandler')
const {addProductHandler,desactivateProductHandler,activateProductHandler,} = require('../handlers/productsHandlers');

router.get('/', nameHandler)
router.get('/:id', idHandler)
router.post('/add', addProductHandler );
router.put('/desactivate/:id', desactivateProductHandler);
router.put('/activate/:id', activateProductHandler);

module.exports = router;

