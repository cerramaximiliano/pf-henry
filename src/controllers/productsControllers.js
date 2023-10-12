const Products = require('../models/products');

const addProduct = async (product) => {
  try {
    const newProduct = new Products(product);
    const createdProduct = await newProduct.save();
    return createdProduct;
  } catch (err) {
    throw new Error(err);
  }
};

const desactivateProduct = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    throw error;
  }
};

const activateProduct = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { isActive: true },
      { new: true }
    );

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = { addProduct, desactivateProduct, activateProduct };
