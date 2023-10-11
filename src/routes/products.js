const express = require('express');
const router = express.Router();
const { nameHandler } = require('../handlers/productNameHandler');
const {idHandler} = require('../handlers/productIdHandler')
const {addProductHandler} = require('../handlers/productsHandlers');

router.get('/', nameHandler)
router.get('/:id', idHandler)
router.post('/add', addProductHandler );

module.exports = router;

