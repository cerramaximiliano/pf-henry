const express = require('express');
const router = express.Router();
const {getOrderById, updateOrderStatus} = require('../controllers/ordersControllers')

router.get('/update/:id', updateOrderStatus);
router.get('/:id', getOrderById);

module.exports = router;