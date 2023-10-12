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

const getAllProducts = async (
  category,
  priceMin,
  priceMax,
  diet,
  flavor,
  weightMin,
  weightMax,
  weightType,
  page,
  limit) => {

    let filter = {}

    if(category) filter.category = { $regex: new RegExp(category, 'i')}
    if(diet) filter.diet = { $regex: new RegExp(diet, 'i')}
    if(flavor) filter.flavor = { $regex: new RegExp(flavor, 'i')}
    if (priceMin && !isNaN(priceMin)) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    if (priceMax && !isNaN(priceMax)) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    if (weightMin && !isNaN(weightMin)) filter = { ...filter, 'weight.value' : {...filter['weight.value'], $gte: parseFloat(weightMin)} };
    if (weightMax && !isNaN(weightMax)) filter = { ...filter, 'weight.value' : {...filter['weight.value'], $lte: parseFloat(weightMin)} };
    if (weightType) filter = {...filter, 'weight.type' : weightType }
    filter.isActive = true

    //const totalCount2 = await Products.countDocuments(filter)

    const skip = (page-1) * limit

    const products = await Products.find(filter)
    .skip(skip)
    .limit(parseInt(limit))

    const totalCount = products.length

    const totalPages = Math.ceil(totalCount / limit)

    result = { products, totalPages, currentPage: parseInt(page), totalResults: totalCount }
    return result



  }

module.exports = { addProduct, desactivateProduct, activateProduct, getAllProducts };
