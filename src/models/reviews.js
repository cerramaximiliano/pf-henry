const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al producto
    ref: 'Product', // Referencia al modelo de productos
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Reviews', reviewsSchema);
