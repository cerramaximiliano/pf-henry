const express = require('express');
const router = express.Router();
const {getOrderById, getOrdersByUserId, updateOrderStatus, getOrder} = require('../controllers/ordersControllers')

router.get('/userid/:id', getOrdersByUserId)
router.get('/update/:id', updateOrderStatus);
router.get('/order/', getOrder)
router.get('/', getOrderById);



module.exports = router;