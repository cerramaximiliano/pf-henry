const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const productsRoutes = require('./products');
const imagesRoutes = require('./images');
const paymentRoutes = require('./payment.js');
const cartRoutes = require('./cart.js');
// const orderRoutes = require('./order.js');
const reviewsRoutes = require('../controllers/ReviewsController.js');

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/upload', imagesRoutes);
router.use('/payment', paymentRoutes);
router.use('/cart', cartRoutes);
// router.use('/order', orderRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;
