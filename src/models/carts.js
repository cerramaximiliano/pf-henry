const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   products: [
    {
      title: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);