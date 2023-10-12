const Product = require('../models/products');

async function getById(id) {
  try {
    const resultados = await Product.find({ _id: id });
    if (resultados.length > 0) {
      return resultados;
    } else {
      return 'No se encontraron coincidencias';
    }
  } catch (err) {
    console.error('Error al buscar en la base de datos:', err);
    throw new Error(err)
  }
}

module.exports = getById;
