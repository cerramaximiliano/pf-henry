const Cart = require('../models/carts');

const addCart = async () => {
    try {
      const newCart = new Cart();
      const createdCart = await newCart.save();
      return createdCart;
    } catch (err) {
      throw new Error(err);
    }
  };
  module.exports = addCart