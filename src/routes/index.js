const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const productsRoutes = require('./products');
const imagesRoutes = require('./images');
const paymentRoutes = require('./payment.js');

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/upload', imagesRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;




