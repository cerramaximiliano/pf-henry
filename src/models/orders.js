const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  products: [
    {
      id: String,
      title: String,
      price: Number,
      image: String,
      quantity: Number,
      status: String
    },
  ],
  status: {type: String, default: 'pending'},
  userId: {type: String},
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);