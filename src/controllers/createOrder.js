const Order = require('../models/orders');

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

  module.exports = createOrder;