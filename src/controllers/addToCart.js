const Cart = require('../models/carts');
const Product = require('../models/products');

const addToCart = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const alreadyExists = await Cart.findOne({ product: productId });

    if (alreadyExists) {
      alreadyExists.quantity += 1;
      alreadyExists.price = product.price * alreadyExists.quantity
      await alreadyExists.save();
      return alreadyExists;
    } else {
      const newCartItem = new Cart({
        product: {
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      });
      await newCartItem.save();
      return newCartItem;
    }
  } catch (error) {
    throw new Error('Error al agregar el producto al carrito:', error);
  }
};

module.exports = addToCart;





