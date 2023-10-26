const express = require('express');
const router = express.Router();
const {getOrderById, getOrdersByUserId, updateOrderStatus} = require('../controllers/ordersControllers')

router.get('/userid/:id', getOrdersByUserId)
router.get('/update/:id', updateOrderStatus);
router.get('/:id', getOrderById);



module.exports = router;