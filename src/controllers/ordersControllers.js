const Order = require('../models/orders');


const getOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findById(id);
        if (order) {
            res.status(200).json({ok: true, order})
        }else {
            res.status(401).json({ok: false, message: `Order not found`, order})
        }
    }catch(err){
        res.status(500).json({ok: false, message: err})
    }
};

const updateOrderStatus = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findOneAndUpdate({_id: id}, {status: 'complete'}, {new: true});
        console.log(order)
        if( order ) return res.status(201).json({ok: true, order, message: `Order updated`})
        res.status(401).json({ok: false, message: `Order couldn't update`})
    }catch(err){
        res.status(500).json({ok: false, error: err})
    }
};


module.exports = {getOrderById, updateOrderStatus};
