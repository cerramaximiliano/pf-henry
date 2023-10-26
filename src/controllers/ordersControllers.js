const Order = require('../models/orders');
const nodemailer = require('nodemailer')
const config = require('../config/nodemailer');
const User = require('../models/users')
const transport = require('../config/nodemailer')

const createOrder = async (result) => {
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

const getOrdersByUserId = async (req, res) => {
    const {id} = req.params;
    try {
        const orders = await Order.find({userId: id});
        if (orders) {
            res.status(200).json({ok: true, orders, total : orders.length})
        }else {
            res.status(401).json({ok: false, message: `Orders not found`, orders})
        }
    }catch(err){
        res.status(500).json({ok: false, message: err.message})
    }
};

const updateOrderStatus = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findOneAndUpdate({_id: id}, {status: 'complete'}, {new: true});
        if( order ) {
            if(order.notification === 'pending'){
                const user = await User.findById(order.userId)
                let products = [];
                order.products.forEach((ele) => {
                  products.push(`<li><h4>${ele.title}</h4><p>Price: ${ele.price}</p></li>`)
                });
                
                const sender = await transport.sendMail({
                    from: 'jenshygym@gmail.com',
                    to: user.email,
                    subject: 'Order Complete',
                    html: 
                        `<html><head></head><body><h2>Order Details</h2><div><h3>Order Status: Complete</h3><h3>User: ${user.email}</h3><h3>Total: ${order.total.toFixed(2)}</h3><h3>Created At: ${order.createdAt}</h3><h3>Products:</h3>
                          <ul>${products}</ul></div></body></html>`
                 });
                if(sender[0].complete) {
                  const updateOrder = await Order.findOneAndUpdate({_id: id}, {notification: 'complete'});
                  return res.status(201).json({ok: true, order, message: 'Order updated',  email: true })
                } else return res.status(201).json({ok: true, order, message: 'Order updated',  email: false })
                
            }else{
                return res.status(201).json({ok: true, order, message: 'Order updated', email: false })
            };
        }
        res.status(401).json({ok: false, message: `Order couldn't update`})
    }catch(err){
        res.status(500).json({ok: false, error: err.message})
    }
};


module.exports = {getOrderById, getOrdersByUserId, updateOrderStatus, createOrder};
