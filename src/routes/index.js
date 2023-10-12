const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const productsRoutes = require('./products');
const imagesRoutes = require('./images');

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/image', imagesRoutes);

module.exports = router;




