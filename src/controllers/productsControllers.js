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
  name,
  category,
  priceMin,
  priceMax,
  diet,
  flavor,
  weightMin,
  weightMax,
  weightType,
  page,
  limit,
  orderBy,
  active) => {

  // filtering & pagination


  let filter = {}
  if (name) filter.title = { $regex: new RegExp(name, 'i') }
  if (category) filter.category = { $regex: new RegExp(category, 'i') }
  if (diet) filter.diet = { $regex: new RegExp(diet, 'i') }
  if (flavor) filter.flavor = { $regex: new RegExp(flavor, 'i') }
  if (priceMin && !isNaN(priceMin)) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
  if (priceMax && !isNaN(priceMax)) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
  if (weightMin && !isNaN(weightMin)) filter = { ...filter, 'weight.value': { ...filter['weight.value'], $gte: parseFloat(weightMin) } };
  if (weightMax && !isNaN(weightMax)) filter = { ...filter, 'weight.value': { ...filter['weight.value'], $lte: parseFloat(weightMax) } };
  if (weightType) filter = { ...filter, 'weight.type': weightType }
  if(active) filter.isActive = active
  console.log(filter);
  console.log(typeof orderBy);
  const totalCount = await Products.countDocuments(filter);

  const skip = (page - 1) * limit

  const products = await Products.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(orderBy)

  const totalPages = Math.ceil(totalCount / limit)

  result = { products, totalPages, currentPage: parseInt(page), totalResults: totalCount }
  return result



};

const getPropiertyValues = async (value) => {
  try {
    const foundValues = await Products.distinct(value)
    return {foundValues};
  }catch(err){
    throw new Error(err)
  }
};

const findAndUpdateProduct = async (_id, update) => {
  try{
    const updateProduct = await Products.findOneAndUpdate({_id}, {$set: update}, {upsert: false, returnDocument: 'after'});
    return updateProduct;
  }catch(err){
    throw new Error(err)
  }
};

module.exports = { addProduct, desactivateProduct, activateProduct, getAllProducts, getPropiertyValues, findAndUpdateProduct };
