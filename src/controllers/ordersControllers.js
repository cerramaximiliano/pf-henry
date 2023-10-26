const Order = require('../models/orders');
const nodemailer = require('nodemailer')
const config = require('../config/nodemailer');
const User = require('../models/users')
const transport = require('../config/nodemailer')

const createOrder = async (result) => {
    console.log('Create Order')
    console.log(result)
      try {
          const newOrder = new Order({
            products:  result.products,
            total: result.totalPrice,
            userId: result.userId,
            status:"pending"
          });
          const orderSaved = await newOrder.save();
          return orderSaved;
      } catch (error) {
        throw new Error(error);
      }
    };
  

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
        console.log(26, order)
        if( order ) {
            if(order.status === 'pending'){
                const user = await User.findById(order.userId)
                console.log(user)
                const subject = 'orden de compra exitosa'
                const text = 'su orden se ralizo con exito'
                const send = 
                transport.sendMail({
                    from: 'jenshygym@gmail.com',
                    to: user.email,
                    subject: 'hello world',
                    html: '<h1>Hello world!</h1>'
                 });
                return res.status(201).json({ok: true, order, message: `Order updated email:true`})
            }else{
                return res.status(201).json({ok: true, order, message: `Order updated email:false`})

            };
        }
        res.status(401).json({ok: false, message: `Order couldn't update`})
    }catch(err){
        console.log(48, err)
        res.status(500).json({ok: false, error: err.message})
    }
};


module.exports = {getOrderById, updateOrderStatus, createOrder};
