const express = require('express');
const router = express.Router();
const createCart = require('../controllers/cart')

router.get('/create-cart', createCart);

module.exports = router;