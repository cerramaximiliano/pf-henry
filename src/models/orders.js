const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  products: [
    {
      id: String,
      title: String,
      price: Number,
      image: String,
      quantity: Number,
      status: String,
      productId: String
    },
  ],
  status: {type: String, default: 'pending'},
  notification: {type: String, default: 'pending'},
  userId: {type: String},
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.pre('findOneAndUpdate', function (next) {
  this._original = this.getQuery();
  next();
});

module.exports = mongoose.model('Order', orderSchema);