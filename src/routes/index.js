const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const productsRoutes = require('./products');
const imagesRoutes = require('./images');
const stripeRoutes = require('./checkout');

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/upload', imagesRoutes);
router.use('/checkout', stripeRoutes)

module.exports = router;




