const Order = require('../models/orders');
const nodemailer = require('nodemailer')
const config = require('../config/nodemailer');
const User = require('../models/users')


const {sendEmail} = require('./emailController')


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
        const order = await Order.findOneAndUpdate({_id: id}, {status: 'complete'}, {new: false});
        console.log(order)
        if( order ) {
            if(order.status === 'pending'){
                const user = await User.findById(order.userId)
                const subject = 'orden de compra exitosa'
                const text = 'su orden se ralizo con exito'
                const send = await sendEmail(user.email, subject ,text);
                console.log(send)
                return res.status(201).json({ok: true, order, message: `Order updated email:true`})
            }else{
                console.log(order)
                return res.status(201).json({ok: true, order, message: `Order updated email:false`})

            };
        }
        res.status(401).json({ok: false, message: `Order couldn't update`})
    }catch(err){
        res.status(500).json({ok: false, error: err.message})
    }
};


module.exports = {getOrderById, updateOrderStatus};
