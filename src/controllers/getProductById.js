const Product = require('../models/products');

async function getById(id) {
  try {
    const resultados = await Product.find({ _id: id });
    if (resultados.length > 0) {
      return resultados[0];
    } else {
      return 'No se encontraron coincidencias';
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = getById;