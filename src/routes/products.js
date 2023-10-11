const express = require('express');
const router = express.Router();
const { nameHandler } = require('../handlers/productNameHandler');
const {idHandler} = require('../handlers/productIdHandler')

router.get('/', nameHandler)
router.get('/:id', idHandler)

module.exports = router;



