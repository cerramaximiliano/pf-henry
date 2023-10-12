const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    require: true,
    default: 0,
  },
  diet: {
    type: String,
  },
  flavor: {
    type: String,
  },
  weigth: {
    value: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
